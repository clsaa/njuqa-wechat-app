//logs.js
var util = require('../../utils/util.js')
var app = getApp()
Page({
  data: {
    motto: 'Hello',
    userInfo: {},
    canIUse: wx.canIUse('button.open-type.getUserInfo')
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
  //跳转到index页面，用于刷新用户的身份信息
  jumpmy_index: function (options) {
    console.log(app.globalData.isAdmin)
    wx.switchTab({
      url: '../index/index',
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
  },
  bindGetUserInfo(e) {
    console.log('bindGetUserInfo')
    console.log(e.detail.userInfo)
    console.log(app.globalData.userInfos)
    wx.request({
      url: 'https://njuqa.clsaa.com/v1/user/' + app.globalData.userInfos.id,
      method: 'PUT',
      data: {
        avatarUrl: e.detail.userInfo.avatarUrl,
        nickname: e.detail.userInfo.nickName,
        openId: app.globalData.userInfos.openId
      },
      header: {
        'Content-Type': 'application/json'
      },
      success: function (e) {
        console.log(e)
        console.log("update user question")
        app.globalData.userInfos = e.data
        if (e.data['identity'] == "ADMIN") {
          app.globalData.isAdmin = true
          console.log("right")
        }
        //this.refresh()
      },
      fail: function () {
        // fail
      },
      complete: function () {
        wx.switchTab({
          url: '../index/index',
        })
      }
    })
  }
})