//index.js

var util = require('../../utils/util.js')
var app = getApp()
var refreshAgain = true
Page({
  data: {
    feed: [],
    feed_length: 0,
    userInfo:{},
    openid:0,
    nickName: "",
    isAdmin:false,
  },
  textData: 'before',
  //事件处理函数
  bindItemTap: function (e) {
    // 参数e用于获取index.wxml中查看答案对应的选项的下标
    var idx = e.currentTarget.id
    // 使用feed[idx]获取问题的属性
    //console.log(this.data.feed[idx])
    var item = this.data.feed[idx]
    console.log(item)
    // 传递问题属性
    wx.navigateTo({
      url: '../displayAnswer/displayAnswer?item='+
      JSON.stringify(item)
    })
  },
  bindQueTap: function (e) {
    var idx = e.currentTarget.id
    var item = this.data.feed[idx]
    wx.navigateTo({
      url: '../question/question?item='+
      JSON.stringify(item)
    })
  },
  //获取用户id等信息，用于请求用户的问题的数据，方便展示
  onLoad: function () {
    console.log('onLoad')
    //调用应用实例的方法获取全局数据
    this.getData();
  },
  onShow: function() {
    this.getData()
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
  nextLoad: function(){
    console.log("nextLoad")
  },
  
  // 响应评论的函数，需要获取当前用户id和问题id，问题
  // 问题id可以使用e.currentTarget.id方法获取到
  // 用户id 可以使用userinfo获取到
  AttentionQuestion: function (e) {
    // console.log(e.currentTarget.id)
    var qId = e.currentTarget.id
    var that = this
    console.log(qId)
    //console.log(qId)
    console.log("CommentTest")
    app.getUserInfo(function (userInfo) {
      console.log(userInfo)
      that.setData({
        userInfo:userInfo
      })
    })
    var userId = that.data.userInfo.id
    console.log(userId)
    var url1 = "https://njuqa.clsaa.com/v1/user/"
    var url2 = "/question/all/"
    wx.request({
      url: url1+userId+url2,
      //data: {},
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: {
        "Content-Type": "application/json"
      }, // 设置请求的 header 默认是application/json
      success: function (res) {
        // 操作json数据
        //var userInfo = [];
        console.log(res.data)
        //console.log(userInfo);
        var flag = 1
        for (var item in res.data){
          if (res.data[item] != null){
            if (res.data[item].id == qId){
              console.log("attensioned")
              flag = 0
            }
            //console.log(res.data[item])
          }
          console.log("for loop")
        }
        if (flag == 1){
          wx.request({
            url: 'https://njuqa.clsaa.com/v1/question/attention',
            data: {
              userId: userId,
              questionId: qId
            },
            method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
            header: {
              "Content-Type": "application/json"
            }, // 设置请求的 header 默认是application/json
            success: function (res) {
              // 操作json数据
              //var userInfo = [];
              console.log("question attension successful")
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
      },
      fail: function () {
        // fail
      },
      complete: function () {
        // complete
      }
    })

  },
  // 关闭问题的函数
  CloseQuestion: function (e) {
        // console.log(e.currentTarget.id)
    var idx = e.currentTarget.id
   
    var item = this.data.feed[idx]
    
    wx.request({
      url:'https://njuqa.clsaa.com/v1/question/'+item.id+'/close/statue/1',
      method: 'PUT',
      header: {
        'Content-Type':'application/json'
      },
      success: function (res) {
        console.log(res)
        console.log("close question")
        
      },
      fail: function () {
        // fail
      },
      complete: function () {
        // complete
      }
    })
    
  },
  // 删除问题
  DeleteQuestion: function (e) {
    // console.log(e.currentTarget.id)
    var idx = e.currentTarget.id
    var item = this.data.feed[idx]
    console.log(item)

    wx.request({
      url: 'https://njuqa.clsaa.com/v1/question/' + item.id + '/delete/statue/1',
      method: 'PUT',
      header: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        console.log(res)
        
        console.log("delete question")
       
      },
      fail: function () {
        // fail
      },
      complete: function () {
        // complete
      }
    })

  },
  // 用于测试获取用户Userinfo，因为请求是异步的，
  // 所以很多时候可能请求不到数据。
  getUserinfoFunction: function () {
    // console.log(e.currentTarget.id)
    console.log("getUserinfoFunction")
    app.getUserInfo(function (userInfo) {
      console.log(userInfo)
    })
    console.log("getUserinfoFunction")
  
  },
  //网络请求数据, 实现首页刷新
  refresh: function () {
    var that = this
    var index_api = 'https://njuqa.clsaa.com/v1/all/question/';
    console.log("index/refresh_function");
    util.getData(index_api)
      .then(function (data) {
        that.setData({
          feed:data.data,
          feed_length:data.data.length
        });
        console.log(data.data);
      });
  },
  testFunction: function(){
    console.log(app.globalData.isAdmin)
  },
  //使用数据实现刷新效果
  getData: function () {
    //var feed = [];
    var that = this;
    that.setData({
      isAdmin:app.globalData.isAdmin
    })
    console.log(app.globalData.nickname)
    console.log(that.data.isAdmin)
    wx.request({
      url: "https://njuqa.clsaa.com/v1/all/question/",
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: {
        "Content-Type": "application/json"
      }, // 设置请求的 header 默认是application/json
      success: function (res) {
        // 操作json数据
        console.log("request data");
        console.log(res.data);
        //console.log(that.data.userInfo)
        var text = res.data;
        that.setData({
          feed: text,
          feed_length: text.length,
          openid: app.globalData.openId,
          nickName: app.globalData.nickname
        });
      }
    })
    if (refreshAgain == true){
      refreshAgain = false
      that.testFunction();
    }
  }
})