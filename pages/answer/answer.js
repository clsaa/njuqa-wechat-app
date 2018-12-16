//answer.js
var util = require('../../utils/util.js')
var answContent=""
var app = getApp()
Page({
  data: {
    motto: '社区问答',
    userInfo: {},
    questionItem:{},
    answerItem:{}
  },
  handleTextareaInput: function (e) {
    this.setData({
      restNum: 200 - e.detail.value.length,
      //quesContent:e.detail.value
    });
    answContent = e.detail.value;
  },
  uploadFile: function () {
    var _this = this;
    wx.showActionSheet({
      itemList: ['从相册中选择', '拍照'],
      itemColor: "#18b7ee",
      success: function (res) {
        if (!res.cancel) {
          if (res.tapIndex == 0) {
            _this.chooseWxImage('album')
          } else if (res.tapIndex == 1) {
            _this.chooseWxImage('camera')
          }
        }
      }
    })
  },
  chooseWxImage: function (type) {
    var _this = this;
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'],
      sourceType: [type],
      success: function (res) {
        var imgsArr = _this.data.imgs;
        imgsArr.push(res.tempFilePaths[0]);

        _this.setData({
          imgs: imgsArr
        })
      }
    })
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
    wx.showModal({
      title: '提示',
      content: '是否提交您的问题',
      cancelColor: "#666",
      confirmColor: '#17b6ed',
      duration: 2000,
      success: function () {
        //提交表单
        var formData = {
          uid: "d12079a2f9464fea96f414612c5ac9ab",
          //user_name: "",
          //baby_sex: e.detail.value.baby_sex,
          //baby_age: e.detail.value.baby_age
        }
        console.log(formData)
        /*
        app.apiFunc.upload_file(app.apiUrl.modify_user, this.data.logo, 'photos', formData,
          function (res) {
            console.log(res);
          },
          function () { })
        */

        wx.request({
          url: 'https://njuqa.clsaa.com/v1/question/answer',
          //data: {},
          method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
          header: {
            "Content-Type": "application/json"
          }, // 设置请求的 header 默认是application/json
          data: {
            content: answContent,
            questionId:"1",
            type:"SHOW",
            userId: "d12079a2f9464fea96f414612c5ac9ab"
          }
        })

        console.log(answContent)
      }
    });
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
