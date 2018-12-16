//answer.js
var util = require('../../utils/util.js')
var answContent=""
var app = getApp()
Page({
  data: {
    motto: '社区问答',
    userInfo: {},
    questionItem:{},
    answerContent:null
  },
  handleTextareaInput: function (e) {
    var that = this
    this.setData({
      restNum: 200 - e.detail.value.length,
      answerContent:e.detail.value
    });
    //console.log(that.data.answerContent)
  },
  handleFormSubmit: function () {
    if (this.data.restNum == 200) {
      wx.showToast({
        title: '请填写内容',
        icon: 'success',
        duration: 2000
      })
      return
    }
    var that = this
    console.log(that.data.questionItem)
    //提交表单
    wx.request({
      url: 'https://njuqa.clsaa.com/v1/question/answer',
      method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: {
        "Content-Type": "application/json"
      }, // 设置请求的 header 默认是application/json
      data: {
        content: that.data.answerContent,
        questionId:that.data.questionItem["id"],
        type:"SHOW",
        userId: that.data.userInfo["id"]
      }
    })
    console.log("submit success")
  },
  //事件处理函数
  toQuestion: function() {
    wx.navigateTo({
      url: '../question/question'
    })
  },
  onLoad: function (options) {
    console.log('onLoad')
    var that = this
    // 获取上一个页面传递的问题内容
    that.setData({
      questionItem:JSON.parse(options.item)
    })
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo){
      //更新数据
      that.setData({
        userInfo:userInfo
      })
    })
  },
  tapName: function(event){
    console.log(event)
  }
})
