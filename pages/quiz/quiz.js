var app = getApp()
Page({
  data: {
    restNum: 200,
    quesContent:"",
    userinfo: null
  },
  onLoad: function () {
    console.log('onLoad')
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function (userInfo) {
      //更新数据
      that.setData({
        userinfo: userInfo
      })
    })
    console.log(that.data.userinfo)
  },
  handleTextareaInput: function (e) {
    this.setData({
      restNum: 200 - e.detail.value.length,
      quesContent:e.detail.value
    });
  },
  handleFormSubmit: function () {
    var that = this
    console.log("userinfo")
    console.log(that.data.userinfo['id'])
    if (this.data.restNum == 200) {
      wx.showToast({
        title: '请填写内容',
        icon: 'success',
        duration: 2000
      })
      return
    }
    wx.request({
      url: 'https://njuqa.clsaa.com/v1/question',
      method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: {
          "Content-Type": "application/json"
      }, // 设置请求的 header 默认是application/json
      data: {
          content: that.data.quesContent,
          userId: that.data.userinfo["id"]
      },
      success: function () {
        wx.navigateTo({
          url: '../index/index'
        })
      }
    })
  },
});