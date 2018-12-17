//index.js

var util = require('../../utils/util.js')
var app = getApp()
Page({
  data: {
    feed: [],
    feed_length: 0,
    userInfo: {},
    openid: 0,
    nickName: ""
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
      url: '../displayAnswer/displayAnswer?item=' +
        JSON.stringify(item)
    })
  },
  bindQueTap: function (e) {
    var idx = e.currentTarget.id
    var item = this.data.feed[idx]
    //console.log(idx)
    //console.log(item['id'])
    //console.log(item['userId'])
    wx.navigateTo({
      url: '../question/question?item=' +
        JSON.stringify(item)
    })
  },
  //获取用户id等信息，用于请求用户的问题的数据，方便展示
  onLoad: function () {
    console.log('onLoad')
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
  nextLoad: function () {
    console.log("nextLoad")
  },
  // 绑定关注问题按钮，需要获取问题id和用户id
  // 目前设置的都是静态值。
  QuestionAttention: function () {
    var that = this;
    var userId = "d12079a2f9464fea96f414612c5ac9ab"

    wx.request({
      url: 'https://njuqa.clsaa.com/v1/question/attention',
      data: {
        userId: userId,
        questionId: "2"
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
  },
  // 响应评论的函数，需要获取当前用户id和问题id，问题
  // 问题id可以使用e.currentTarget.id方法获取到
  // 用户id 可以使用userinfo获取到
  AttensionQuestion: function (e) {
    // console.log(e.currentTarget.id)
    var uId = e.currentTarget.id
    //var qId = e.currentTarget.qid
    console.log(uId.userId)
    //console.log(qId)
    console.log("CommentTest")
    app.getUserInfo(function (userInfo) {
      console.log(userInfo)
    })
    /*
    wx.navigateTo({
      url: "userinfo/userinfo?u_id=" + uId,
    })
    */
  },
  // 知识为了测试获取相应的问题id而设置的测试函数，后期可移除
  CommentQuestion: function (e) {
    // console.log(e.currentTarget.id)
    var idx = e.currentTarget.id
    console.log(idx)
    console.log(this.data.feed[idx])
    console.log("comment question")
    var item = this.data.feed[idx]

    wx.navigateTo({
      url: "../comment/comment?item=" +
        JSON.stringify(item),
    })


  },
  // 用于测试获取用户Userinfo，因为请求是异步的，
  // 所以很多时候可能请求不到数据。
  // getUserinfoFunction: function () {
  //   // console.log(e.currentTarget.id)
  //   console.log("getUserinfoFunction")
  //   app.getUserInfo(function (userInfo) {
  //     console.log(userInfo)
  //   })
  //   console.log("getUserinfoFunction")
  //   /*
  // wx.navigateTo({
  //   url: "userinfo/userinfo?u_id=" + uId,
  // })



  //使用数据实现刷新效果
  getData: function () {
    var that = this
    app.getUserInfo(function (userInfo) {
      //更新数据
      that.setData({
        userInfo: userInfo
      })
      console.log(userInfo)
    })

    //var feed = [];
    var that = this;
    var userid = that.data.userInfo.id
    // var url1 = "https://njuqa.clsaa.com/v1/user/"
    // var url2 = userid
    // var url3 = "/question/all/"
    wx.request({
      url: 'https://njuqa.clsaa.com/v1/question/' + userid + '/',
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
          feed: text,
          feed_length: text.length,
          openid: app.globalData.openId,
          nickName: app.globalData.nickname
        });
      }
    })
  }
})