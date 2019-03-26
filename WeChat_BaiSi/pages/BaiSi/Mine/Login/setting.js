// pages/BaiSi/Mine/Login/loginout.js

var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
  
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
  loginoutClick: function(even) {
    var thisBlock = this

    wx.showToast({
      icon: 'loading',
      title: '正在登出...',
      duration: 3000,
      complete: function (res) {
        app.globalData.islogin = false
        app.globalData.userData = null
        console.log(app.globalData.userData)
        wx.removeStorageSync('kUserData')
        wx.navigateBack({})
      }
    })
  }

})