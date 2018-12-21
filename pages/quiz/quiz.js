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
  onShow:function(){
    this.setData({
      quesContent: null
    });
  },
  handleTextareaInput: function (e) {
    if(e == null){
      wx.showToast({
        title: '请填写内容',
        icon: 'success',
        duration: 2000
      })
      return
    }
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
    var that = this
    wx.showModal({
      title: '提示',
      content: '是否提交您的问题',
      cancelColor: "#666",
      confirmColor: '#17b6ed',
      duration: 2000,
      success: function () {
        //提交表单
        var formData = {
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
            console.log("res")
            wx.switchTab({
              url: '../index/index',
            })
          }
        })
      }
    })
  },
});