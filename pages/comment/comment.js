//comment.js
var util = require('../../utils/util.js')
var answContent = ""
var app = getApp()
Page({
  data: {
    motto: '社区问答',
    userInfo: {},
    answerItem: {},
    //answerUser: {}
  },
  handleTextareaInput: function (e) {
    this.setData({
      restNum: 200 - e.detail.value.length,
      //quesContent:e.detail.value
    });
    answContent = e.detail.value;
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
        console.log(formData)
       
        console.log(answContent)
        //var that = this
        wx.request({
          url:'https://njuqa.clsaa.com/comment/getAllByUserId',
          method:'GET',
          header:{
            "Content-Type":"application/json"
          },
          data: {
            userId: that.data.userInfo.id
          },
          success: function (res) {
            // 操作json数据
            //var userInfo = [];
            console.log("answer attension")
            //console.log(userInfo);
            var flag = 1
            var commentId = that.data.answerItem.id
            for (var item in res.data) {
              if (res.data[item] != null) {
                if (res.data[item].id == commentId) {
                  console.log("commented")
                  flag = 0
                }
                //console.log(res.data[item])
              }
              console.log("for loop")
              console.log(that.data.answerItem.id)
              console.log(that.data.userInfo.id)
            }
            if (flag == 1) {
              var aId = that.data.answerItem.id
              var uId = that.data.userInfo.id
              wx.request({
                url: 'https://njuqa.clsaa.com/comment/addComment?answerId='+aId+'&content='+answContent+'&userId='+uId,
              
                method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
                header: {
                  "Content-Type": "application/json"
                }, // 设置请求的 header 默认是application/json
                success: function (res) {
                  console.log(res)
                  
                  console.log("comment answer successful")
                  //console.log(userInfo);
                  var pages = getCurrentPages()
                  var num = pages.length
                  wx.navigateBack({
                    delta:num
                  })

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

        console.log(answContent)
      }
    });
  },
  //事件处理函数
  toQuestion: function () {
    wx.navigateTo({
      url: '../question/question'
    })
  },
  onLoad: function (options) {
    console.log('onLoad')
    var that = this
    // 获取上一个页面传递的问题内容
    // questionItem 是index页面用户点击的那个问题的所有内容
    that.setData({
      answerItem:JSON.parse(options.item)
    })
    console.log(that.data.answerItem)
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function (userInfo) {
      //更新数据
      that.setData({
        userInfo: userInfo
      })
    })
    console.log("comment.js")
    console.log(that.data.userInfo)
    //that.getQuestionUser()
  },
  // 获取当前问题的提出者的信息
  tapName: function (event) {
    console.log(event)
  }
})
