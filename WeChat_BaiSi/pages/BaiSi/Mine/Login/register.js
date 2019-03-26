// pages/BaiSi/Mine/Login/register.js

var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userName:"",
    userPassword:"",
    userPasswordRe:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },


  // 绑定事件
  nameInput: function(even) {
    this.setData({
      userName: even.detail.value
    })
  },

  passwordInput: function (even) {
    this.setData({
      userPassword: even.detail.value
    })
  },

  passwordReInput: function (even) {
    this.setData({
      userPasswordRe: even.detail.value
    })
  },

  registerClick: function (even) {
    if (this.data.userName.length <= 0) {
      wx.showToast({
        icon: "none",
        title: '请输入用户名',
      })
      return;
    }

    if (this.data.userPassword.length <= 0) {
      wx.showToast({
        icon: "none",
        title: '请输入密码',
      })
      return;
    }

    if (this.data.userPasswordRe.length <= 0) {
      wx.showToast({
        icon: "none",
        title: '请再次输入密码',
      })
      return;
    }

    if (this.data.userPassword != this.data.userPasswordRe) {
      wx.showToast({
        icon: "none",
        title: '两次输入密码不相等',
      })
      return;
    }

    var thisBlock = this
    wx.showToast({
      icon: 'loading',
      title: '正在注册...',
      duration: 3000,
      complete: function (res) {
        app.globalData.islogin = true
        app.globalData.userData = { "userName": thisBlock.data.userName, "userImage": "https://ss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=3643687533,272026720&fm=58" }
        console.log(app.globalData.userData)
        wx.navigateBack({
          delta: 2
        })
      }
    })
  }
})