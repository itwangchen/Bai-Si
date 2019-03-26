// pages/BaiSi/Attention/attention.js



Page({

  /**
   * 页面的初始数据
   */
  data: {
    typeNames:[],
    typeLists:[],

    typeIndex:0,
    typePage:1,
    typeFinish: false,

    typeHeight:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.loadData();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    var thisBlock = this;
    wx.getSystemInfo({
      success: function (res) {
        console.log(res)
        thisBlock.setData({
          typeHeight: (res.screenHeight - 50.0)
        })
      },
    })
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
    console.log("reload data")

    this.data.typePage = 1;
    this.loadDataWithType(this.data.typeIndex, this.data.typePage);
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    console.log("loadMore data")

    if (this.data.typeFinish) {
      wx.showToast({
        icon: "none",
        title: '没有更多数据了',
      })
    } else {
      this.data.typePage++;
      this.loadDataWithType(this.data.typeIndex, this.data.typePage);
    }   
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },

  // 网络请求
  loadData: function() {
    wx.showLoading({
      title: '请稍后...',
    })
    
    var thisBlock = this;
    wx.request({
      url: 'http://api.budejie.com/api/api_open.php?a=category&c=subscribe',
      success: function (res) {
        wx.hideLoading();

        var listTmp = res.data.list;
        listTmp[0].index = 0;
        listTmp[0].selected = true;
        for (var i = 1; i < listTmp.length; i++) {
          listTmp[i].index = i;
          listTmp[i].selected = false;
        }

        thisBlock.setData({
          typeNames: listTmp,
          typePage: 1
        })

        thisBlock.data.typeFinish = false
        thisBlock.data.typeIndex = 0;
        thisBlock.loadDataWithType(0, thisBlock.data.typePage);
      },
      fail: function (res) {
        wx.hideLoading();
      }
    })
  },

  loadDataWithType: function(index, page) {
    wx.showLoading({
      title: '请稍后...',
    })

    var categoryId = this.data.typeNames[index].id;
    var categoryUrl = "http://api.budejie.com/api/api_open.php?a=list&c=subscribe&category_id=" + categoryId + "&page=" + page;
    var thisBlock = this;
    wx.request({
      url: categoryUrl,
      success: function (res) {
        wx.hideLoading();
        wx.stopPullDownRefresh()
        var listTmp = res.data.list;
        if (listTmp.length <= 0) {
          wx.showToast({
            icon: "none",
            title: '没有更多数据了',
          })
          thisBlock.data.typeFinish = true
        } else {
          if (page == 1) {
            thisBlock.setData({
              typeLists: listTmp
            })
          } else {
            thisBlock.setData({
              typeLists: thisBlock.data.typeLists.concat(listTmp)
            })
          }          
        }
      },
      fail: function (res) {
        wx.hideLoading();
        wx.stopPullDownRefresh()
      }
    })
  },

  // 绑定事件
  typeClick: function(even) {

    let index = even.currentTarget.dataset.index;
    let obj = this.data.typeNames[index];
    if (!obj.selected) {
      wx.showToast({
        title: '未选择',
      })
      
      var listTmp = this.data.typeNames;
      listTmp[this.data.typeIndex].selected = false;
      listTmp[index].selected = true;
      this.data.typeIndex = index;
      this.data.typeFinish = false
      this.data.typePage = 1

      this.setData({
        typeNames: listTmp
      })

      this.setData({
        typeLists:[],
      })
  
      this.loadDataWithType(index, this.data.typePage);
    }
  }
})