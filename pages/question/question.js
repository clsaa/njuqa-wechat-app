//answer.js
var util = require('../../utils/util.js')

var app = getApp()
Page({
  data: {
    motto: '社区问答',
    userinfo: {},
    questionItem:[]
  },
  //事件处理函数
  bindItemTap: function() {
    wx.navigateTo({
      url: '../answer/answer'
    })
  },
  bindAnswerItemTap: function () {
    wx.navigateTo({
      url: '../answer/answer'
    })
  },
  // 新增options参数，options存储的是Index.js中
  // 传入的问题内容，使用item存储
  onLoad: function (options) {
    console.log('onLoad')
    var that = this
    // options用于存储上一个页面传入的数据
    //that.data.questionItem = JSON.parse(options.item)
    that.setData({
      questionItem:JSON.parse(options.item)
    })
    console.log(that.data.questionItem)
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo){
      //更新数据
      that.setData({
        userinfo:userInfo
      })
      console.log("userinfo")
      console.log(userInfo)
    })
    console.log(that.data.userinfo)
  },
  tapName: function(event){
    console.log(event)
  },
  // 可以关注当前问题，需要获取问题id和用户id
  CommFunction: function(){
    var that = this;
    var userId = that.data.userinfo['id']
    wx.request({
      url: 'https://njuqa.clsaa.com/v1/user/attention',
      data: {
        sourceUser:that.data.userinfo.id,
        targetUser:that.data.questionItem.userId
      },
      method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: {
        "Content-Type": "application/json"
      }, // 设置请求的 header 默认是application/json
      success: function (res) {
        // 操作json数据
        //var userInfo = [];
        console.log("user attension successful")
        //console.log(userInfo);
        
      },
      fail: function () {
        // fail
      },
      complete: function () {
        // complete
      }
    })
  }
})
