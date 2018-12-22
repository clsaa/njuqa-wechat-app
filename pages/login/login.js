// pages/login/login.js
Page({
  data: {
    //判断小程序的API，回调，参数，组件等是否在当前版本可用。
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  onLoad: function () {
    var that = this;
    // 查看是否授权
    wx.getSetting({
      success: function (res) {
        if (res.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success: function (res) {
              //从数据库获取用户信息
              that.queryUsreInfo();
              //用户已经授权过
              wx.switchTab({
                url: '../index/index'
              })
            }
          });
        }
      }
    })
  },
  bindGetUserInfo: function (e) {
    if (e.detail.userInfo) {
      //用户按了允许授权按钮
      var that = this;
      //插入登录的用户的相关信息到数据库
      wx.request({
        url: 'https://njuqa.clsaa.com/v1/user',
        method: "POST",
        header: {
          "Content-Type": "application/json"
        },
        data: {
          avatarUrl: e.detail.userInfo.avatarUrl,
          nickname: e.detail.userInfo.nickname,
          openId: e.detail.userInfo.openId
        },
        success: function (res) {
          //从数据库获取用户信息
          console.log("login success")
          console.log(res)
          that.queryUsreInfo();
          getApp().globalData.avatarUrl = e.detail.userInfo.avatarUrl
          getApp().globalData.nickname = e.detail.userInfo.nickName
         
          console.log("插入小程序登录用户信息成功！");
        }
      });
      //授权成功后，跳转进入小程序首页
      wx.switchTab({
        url: '../index/index'
      })
    } else {
      //用户按了拒绝按钮
      wx.showModal({
        title: '警告',
        content: '您点击了拒绝授权，将无法进入小程序，请授权之后再进入!!!',
        showCancel: false,
        confirmText: '返回授权',
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击了“返回授权”')
          }
        }
      })
    }
  },
  //获取用户信息接口
  queryUsreInfo: function () {
    wx.request({
      url: 'https://njuqa.clsaa.com/v1/user/byCode',
      method: "GET",
      header: {
        "Content-Type": "application/json"
      },
      data: {
        code: getApp().globalData.code
      },
      success: function (res) {
        console.log(res.data);
        getApp().globalData.userInfos = res.data;
        getApp().globalData.avatarUrl = res.data.avatarUrl
        getApp().globalData.nickname = res.data.nickname
        if (res.data['identity'] == "ADMIN") {
          getApp().globalData.isAdmin = true
          console.log("right")
        }
      }
    })
  },

})
