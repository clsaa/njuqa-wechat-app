
var util = require('../../utils/util.js')
var app = getApp()
Page({
  data: {
    logs: []
  },
  onLoad: function () {
    this.getdata();

  },
  //使用数据实现刷新效果
  getdata: function () {
    //var feed = [];
    var that = this;
    var userId = that.data.userInfo.id
    app.getUserInfo(function (userInfo) {
      console.log(userInfo)
    })
    var url1 = "https://njuqa.clsaa.com/v1/question/"
    var url2 = userId
    var url3 = "/question/all"
    wx.request({
      url: url1 + url2 + url3,
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: {
        "Content-Type": "application/json"
      }, // 设置请求的 header 默认是application/json
      data: {
        id: userId
      },
      success: function (res) {
        // 操作json数据
        console.log("request data");
        console.log(res.data);
        var text = res.data;
        that.setData({
          logs: res.data.reaults
        });
      }
    })
  }
})