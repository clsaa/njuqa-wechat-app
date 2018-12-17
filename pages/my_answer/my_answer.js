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
    wx.request({
      url: 'https://njuqa.clsaa.com/v1/question/' + userId,
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