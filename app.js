//app.js
App({
  globalData: {
    userInfos: null,
    avatarUrl: null,
    nickname: null,
    openId: 0,
    isAdmin: false,
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
        that.globalData.userInfos = res.userInfo
        if (res.userInfo.identity == "ADMIN"){
          that.globalData.isAdmin = true
        }
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
              console.log("login....")
              console.log(e.data)
              console.log(e.data['identity'])
              that.globalData.userInfos = e.data
              if(e.data['identity'] == "ADMIN"){
                that.globalData.isAdmin = true
                console.log("right")
              }
              console.log(that.globalData.userInfos)
              if(e.data['id'] == null){
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
                  },
                  success:function(e){
                    console.log("after register")
                    console.log(e.data)
                    console.log(e.data['identity'])
                    that.globalData.userInfos = e.data
                    if (e.data['identity'] == "ADMIN") {
                      that.globalData.isAdmin = true
                      console.log("right")
                    }
                  }
                })
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
     /*
     if(this.globalData.userInfo){
       typeof cb == "function" && cb(this.globalData.userInfo)
     }else{
       wx.getUserInfo({
         success: function (res) {
             that.globalData.userInfo = res.userInfo
             typeof cb == "function" && cb(that.globalData.userInfo)
         }
       })
    }
    */
    /*
    var that = this
    if (this.globalData.userInfo) {
      typeof cb == "function" && cb(this.globalData.userInfo)
    } else {
      wx.getUserInfo({
        success: function (res) {
          console.log('用户信息', res.userInfo)
          that.globalData.userInfo = res.userInfo
          typeof cb == "function" && cb(that.globalData.userInfo)
        }
      })
    }
    */
  }
})