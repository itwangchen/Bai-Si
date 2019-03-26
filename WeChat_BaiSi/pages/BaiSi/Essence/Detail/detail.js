// pages/BaiSi/Essence/Detail/detail.js

const util = require("../../../../utils/util.js");

Page({

  /**
   * 页面的初始数据
   */
  data: {    
    isFinished:false,
    typeId:"",
    typePage: 1,
    typeValues:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    wx.setNavigationBarTitle({
      title: options.title,
    })

    this.data.typeId = options.id
    this.loadData()
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
    this.loadDataMore()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  },

  // 网络请求
  /*
  http://api.budejie.com/api/api_open.php?a=dataList&c=comment&data_id=27727122&hot=1

  http://api.budejie.com/api/api_open.php?a=dataList&c=comment&data_id=27745266&hot=1
  http://api.budejie.com/api/api_open.php?a=dataList&c=comment&data_id=27745266&page=2&lastcid=1278925
  */
  loadData:function(){
    var thisBlock = this
    let url = "http://api.budejie.com/api/api_open.php?a=dataList&c=comment&data_id=" + this.data.typeId
    util.requestWithUrl(url, function (isSuccess, res) {
      if (isSuccess) {
        thisBlock.setData({
          typeValues:res.data.data
        })
      }
    })
  },

  loadDataMore:function(){
    if (this.data.isFinished) {
      wx.showToast({
        icon: 'none',
        title: '没有更多数据了',
      })
    } else {
      var thisBlock = this

      this.data.typePage++
      let lastId = this.data.typeValues[this.data.typeValues.length - 1].id
      let url = "http://api.budejie.com/api/api_open.php?a=dataList&c=comment&data_id=" + this.data.typeId + "&page=" + this.data.typePage + "&lastcid=" + lastId
      util.requestWithUrl(url, function (isSuccess, res) {
        if (isSuccess) {
          let listTmp = res.data.data
          if (listTmp) {
            thisBlock.setData({
              typeValues: thisBlock.data.typeValues.concat(listTmp)
            })            
          } else {
            wx.showToast({
              icon: 'none',
              title: '没有更多数据了',
            })
            thisBlock.data.isFinished = true
          }        
        }
      })
    }    
  }
})