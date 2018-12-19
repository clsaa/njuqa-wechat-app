//logs.js
var util = require('../../utils/util.js')
var app = getApp()
Page({
  data: {
    answerByAttenUser:{},
    attenUser:null,
    userInfo:null
  },
  onLoad: function () {
    var that = this
    console.log('onLoad')
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function (userInfo) {
      //更新数据
      that.setData({
        userInfo: userInfo
      })
      console.log(userInfo)
    })
    this.getData();
  },
  getData: function () {
    var that = this;
    var userid = that.data.userInfo.id

    wx.request({
      url: 'https://njuqa.clsaa.com/v1/question/answer/attention/',
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: {
        "Content-Type": "application/json"
      }, // 设置请求的 header 默认是application/json
      data: {
        userId: userid
      },
      success: function (res) {
        // 操作json数据
        console.log("request data");
        console.log(res.data);
        var text = res.data;
        that.setData({
          answerByAttenUser: text
        });
      }
    })
  },
  upper: function () {
    wx.showNavigationBarLoading()
    this.refresh();
    console.log("upper");
    setTimeout(function () { wx.hideNavigationBarLoading(); wx.stopPullDownRefresh(); }, 2000);
  },
  lower: function (e) {
    wx.showNavigationBarLoading();
    var that = this;
    setTimeout(function () { wx.hideNavigationBarLoading(); that.nextLoad(); }, 1000);
    console.log("lower")
  },
  nextLoad: function () {
    console.log("nextLoad")
  },
  //网络请求数据, 实现首页刷新
  refresh: function () {
    this.getData()
  }


})
