//index.js

var util = require('../../utils/util.js')
var app = getApp()
Page({
  data: {
    feed: [],
    feed_length: 0
  },
  openId: app.globalData.openId,
  userInfo: {},
  nickName: "",
  textData: 'before',
  //事件处理函数
  bindItemTap: function () {
    wx.navigateTo({
      url: '../answer/answer'
    })
  },
  bindQueTap: function () {
    wx.navigateTo({
      url: '../question/question'
    })
  },
  onLoad: function () {
    console.log('onLoad')
    var that = this
    //调用应用实例的方法获取全局数据
    this.getData();
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

  RequestData: function () {
    var that = this;
    wx.request({
      url: 'https://njuqa.clsaa.com/v1/user/1/answer/question/all/',
      //data: {},
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: {}, // 设置请求的 header 默认是application/json
      success: function (res) {
        // 操作json数据
        //var userInfo = [];
        app.getUserInfo(function (userInfo) {
          //更新数据
          that.setData({
            userInfo: userInfo
          })
        })
        //console.log(userInfo);
        console.log("request data");
        console.log(res.data);
        var d = res.data;

        var text = res.data;
        that.setData({
          feed: text,
          feed_length: text.length
        });
      },
      fail: function () {
        // fail
      },
      complete: function () {
        // complete
      }
    })
  },
  //网络请求数据, 实现首页刷新
  refresh: function () {
    var index_api = 'https://njuqa.clsaa.com/v1/user/1/answer/question/all/';
    consol.log("index/refresh_function");
    util.getData(index_api)
      .then(function (data) {
        this.setData({

        });
        console.log(data);
      });
  },

  //使用数据实现刷新效果
  getData: function () {
    //var feed = [];
    var that = this;
    console.log(app.globalData.openId);
    console.log("dsfadfas")
    wx.request({
      url: 'https://njuqa.clsaa.com/v1/user/1/answer/question/all/',
      //data: {},
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: {}, // 设置请求的 header 默认是application/json
      success: function (res) {
        // 操作json数据

        console.log("request data");
        console.log(res.data);
        var d = res.data;
        var text = res.data;
        that.setData({
          feed: text,
          feed_length: text.length,
          openId: app.globalData.openId,
          nickName: app.globalData.nickname
        });
      },
      fail: function () {
        // fail
      },
      complete: function () {
        // complete
      }
    })

    console.log("loaddata");
    //var feed_data = feed.data;
    /*
    this.setData({
      feed:feed,
      feed_length: feed.length
    });*/
  }

})
