//app.js
App({
  globalData: {
    userInfos: null,
    avatarUrl: null,
    nickname: null,
    openId: 0,
  },
  onLaunch: function () {
    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    var that = this
    wx.getUserInfo({
      success: function (res) {
        that.globalData.avatarUrl = res.userInfo.avatarUrl
        that.globalData.nickname = res.userInfo.nickName
        that.globalData.userInfo = res.userInfo
        //console.log(res.userInfo)
      }
    })
    //调用登录接口
    wx.login({
      success: function (res) {
        if (res.code) {
          // 发起网络请求
          wx.request({
            url: 'https://njuqa.clsaa.com/v1/user/byCode',
            method: "GET",
            header: {
              "Content-Type": "application/json"
            },
            data: {
              code: res.code
            },
            success(e) {
              console.log(e.data)
              that.globalData.userInfos = e.data
              if(e.data['nickname'] == null){
                wx.request({
                  url: 'https://njuqa.clsaa.com/v1/user',
                  method: "POST",
                  header: {
                    "Content-Type": "application/json"
                  },
                  data: {
                    avatarUrl: that.globalData.avatarUrl,
                    nickname: that.globalData.nickname,
                    openId:e.data['openId']
                  }
                })
                //console.log(that.globalData.avatarUrl)
                //console.log(that.globalData.nickname)
              }
            }
          })
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
      })
  },
  getUserInfo:function(cb){
    //var that = this
    typeof cb == "function" && cb(this.globalData.userInfos)
    // if(this.globalData.userInfo){
    //   typeof cb == "function" && cb(this.globalData.userInfo)
    // }else{
    //   wx.getUserInfo({
    //     success: function (res) {
    //         that.globalData.userInfo = res.userInfo
    //         typeof cb == "function" && cb(that.globalData.userInfo)
    //     }
    //   })
    // }
  }
})