//dispalyAnswer.js
var util = require('../../utils/util.js')

var app = getApp()
Page({
  data: {
    motto: '评论',
    questionItem: [],
    answers: [],
    isattenUser: false
  },
  onLoad: function (options) {
    console.log('onLoad')
    var that = this
    // 获取上一个页面传递的问题内容
    // questionItem 是index页面用户点击的那个问题的所有内容
    that.setData({
      answerItem: JSON.parse(options.item)
    })
    console.log(that.data.answerItem)
    //调用应用实例的方法获取全局数据
    console.log("displaycomment.js")
    console.log(that.data.userInfo)
    //that.getQuestionUser()
    that.getAnswers()

  },
  tapName: function (event) {
    console.log(event)
  },
  //查看是否已关注用户

  // 获取所有评论
  getAnswers: function () {
    var that = this
    var answerid = that.data.answerItem.id
    wx.request({
      url: "https://njuqa.clsaa.com/comment/getAllByAnswerId",
      method: 'GET',
      header: {
        "Content-Type": "application/json"
      },
      data:{
        answerId: answerid
      },
      success: function (res) {
        console.log("request comment");
        console.log(res.data);
        var text = res.data;
        that.setData({
          answers: text
        });
        console.log(that.data.answers)
      }
    })
  },

})
