//logs.js
var util = require('../../utils/util.js')
var app = getApp()
Page({
  data: {
    motto: 'Hello',
    userInfo: {}
  },
  //跳转到我的回答
  jumpmy_ans:function(options){
    wx.navigateTo({
      url: '../my_answer/my_answer',
    })
  },
  //跳转到我的关注
  jumpmy_att: function (options) {
    wx.navigateTo({
      url: '../my_attention/my_attention',
    })
  },
  //跳转到我的提问
  jumpmy_que: function (options) {
    wx.navigateTo({
      url: '../my_question/my_question',
    })
  },
  //事件处理函数

  onLoad: function () {
    console.log('onLoad')
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo){
      //更新数据
      that.setData({
        userInfo:userInfo
      })
    })
  }
})