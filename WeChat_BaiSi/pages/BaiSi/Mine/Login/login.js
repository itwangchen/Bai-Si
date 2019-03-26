// pages/BaiSi/Mine/Login/login.js

var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userName: '',
    userPassword: ''
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
    this.setData({userName:even.detail.value})
  },

  passwordInput: function (even) {
    this.setData({ userPassword: even.detail.value})
  },

  loginClick: function (even) {
    if (0 >= this.data.userName.length) {
      wx.showToast({
        icon: 'none',
        title: '请输入用户名',
        duration: 2000
      });
      return;
    }

    if (0 >= this.data.userPassword.length) {
      wx.showToast({
        icon: "none",
        title: '请输入密码',
        duration: 2000
      });
      return;
    }

    var thisBlock = this

    wx.showToast({
      icon: 'loading',
      title: '正在登录...',
      duration: 3000,
      complete: function(res) {
        app.globalData.islogin = true
        app.globalData.userData = { "userName": thisBlock.data.userName, "userImage": "https://ss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=3643687533,272026720&fm=58" }
        console.log(app.globalData.userData)
        wx.setStorageSync('kUserData', app.globalData.userData)
        wx.navigateBack({})
      }
    })
    
  },

  // 绑定事件
  registerClick: function (even) {
    wx.navigateTo({
      url: '../Login/register',
    })
  },

  forgetPasswordClick: function (even) {
    wx.navigateTo({
      url: '../Login/forgetPassword',
    })
  }
})