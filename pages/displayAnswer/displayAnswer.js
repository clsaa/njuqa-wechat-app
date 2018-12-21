//dispalyAnswer.js
var util = require('../../utils/util.js')

var app = getApp()
Page({
  data: {
    motto: '社区问答',
    userinfo: {},
    questionItem: [],
    answers:[]
  },
  //事件处理函数
  bindAnswerItemTap: function () {
    var that = this
    wx.navigateTo({
      url: '../answer/answer?item='+
        JSON.stringify(that.data.questionItem)
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
      questionItem: JSON.parse(options.item)
    })
    console.log(that.data.questionItem)
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function (userInfo) {
      //更新数据
      that.setData({
        userinfo: userInfo
      })
      console.log("userinfo")
      console.log(userInfo)
    })
    console.log(that.data.userinfo)
    that.getAnswers()
  },
  tapName: function (event) {
    console.log(event)
  },
  // 获取当前问题的所有答案，用于前端页面显示
  getAnswers: function(){
    var that = this
    var url1 = "https://njuqa.clsaa.com/v1/question/"
    var url2 = that.data.questionItem.id
    var url3 = "/answer/all/"
    wx.request({
      url:url1 + url2 + url3,
      method: 'GET',
      header: {
        "Content-Type": "application/json"
      },
      success: function (res) {
        console.log("request answer");
        console.log(res.data);
        var text = res.data;
        that.setData({
          answers:text
        });
        console.log(that.data.answers)
      }
    })
  },
  // 可以关注当前用户，需要获取用户id
  AttentionFunction: function () {
    var that = this;
    wx.request({
      url: 'https://njuqa.clsaa.com/v1/user/attention',
      data: {
        sourceUser: that.data.userinfo.id,
        targetUser: that.data.questionItem.userId
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
        wx.showToast({
          title: '关注成功',
          icon: 'success',
          duration: 2000
        })
      }
    })
  },
  // 只是为了测试获取相应的问题id而设置的测试函数，后期可移除
  CommentAnswer: function (e) {
    // console.log(e.currentTarget.id)
    var idx = e.currentTarget.id
    console.log(idx)
    console.log(this.data.answers[idx])
    console.log("comment answer")
    var item = this.data.answers[idx]

    wx.navigateTo({
      url: "../comment/comment?item=" +
        JSON.stringify(item),
    })
  },
})
