// pages/BaiSi/Mine/Login/forgetPassword.js

var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userName:"",
    userPhone:"",
    userCode:"",
    userPassword:"",

    codeBtnLoading:false,
    codeBtnTitle:"发送验证码"
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
      userName:even.detail.value
    })
  },

  phoneInput: function (even) {
    this.setData({
      userPhone: even.detail.value
    })
  },

  codeClick: function (even) {
    if (this.data.userName.length <= 0) {
      wx.showToast({
        icon: "none",
        title: '请输入用户名',
      })
      return;
    }

    if (this.data.userPhone.length <= 0) {
      wx.showToast({
        icon: "none",
        title: '请输入手机号码',
      })
      return;
    } else if (this.data.userPhone.length < 11) {
      wx.showToast({
        icon: "none",
        title: '请输入11位手机号码',
      })
      return;
    }

    this.setData({
      codeBtnLoading: true,
      codeBtnTitle: ""
    })

    var thisBlock = this;
    wx.showToast({
      icon: "loading",
      title: '正在获取验证码...',
      duration: 3000,
      complete: function(res) {
        thisBlock.setData({
          codeBtnLoading: false,
          codeBtnTitle: "发送验证码"
        })        
      }
    })
  },

  codeInput: function (even) {
    this.setData({
      userCode: even.detail.value
    })
  },

  passwordInput: function(even) {
    this.setData({
      userPassword: even.detail.value
    })
  },

  forgetPasswordClick: function (even) {
    if (this.data.userName.length <= 0) {
      wx.showToast({
        icon: 'none',
        title: '请输入用户名',
      })
      return;
    }

    if (this.data.userPhone.length <= 0) {
      wx.showToast({
        icon: 'none',
        title: '请输入手机号码',
      })
      return;
    } else if (this.data.userPhone.length < 11) {
      wx.showToast({
        icon: 'none',
        title: '请输入11位手机号码',
      })
      return;
    }

    if (this.data.userCode.length <= 0) {
      wx.showToast({
        icon: 'none',
        title: '请输入验证码',
      })
      return;
    } else if (this.data.userCode.length < 6) {
      wx.showToast({
        icon: 'none',
        title: '请输入6位验证码',
      })
      return;
    }

    if (this.data.userPassword.length <= 0) {
      wx.showToast({
        icon: 'none',
        title: '请输入新的密码',
      })
      return;
    }

    var thisBlock = this
    wx.showToast({
      icon: 'loading',
      title: '正在重置密码...',
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