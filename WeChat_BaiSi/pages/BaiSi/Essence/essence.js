// pages/BaiSi/Essence/essence.js

const typeIdAll = 1;
const typeIdVideo = 41;
const typeIdImage = 10;
const typeIdText = 29;
const typeIdAudio = 31;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    titles: [{ "title": "全部", "selected": true, "id": typeIdAll, "index":0},
      { "title": "视频", "selected": false, "id": typeIdVideo, "index": 1},
      { "title": "图片", "selected": false, "id": typeIdImage, "index": 2},
      { "title": "段子", "selected": false, "id": typeIdText, "index": 3},
      { "title": "声音", "selected": false, "id": typeIdAudio, "index": 4}],
    titleIndex:0,

    allValues:[],
    videoValues:[],
    imageValues:[],
    textValues:[],
    audioValues:[],

    allMaxTime: "",
    videoMaxTime: "",
    imageMaxTime: "",
    textMaxTime: "",
    audioMaxTime: "", 

    allPage: 1,
    videoPage: 1,
    imagePage: 1,
    textPage: 1,
    audioPage: 1,     

    swiperHeight:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let id = this.data.titles[0].id;
    this.loadData(id)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    var thisBlock = this;
    wx.getSystemInfo({
      success: function(res) {
        console.log(res)
        thisBlock.setData({
          // swiperHeight: (res.screenHeight - 40.0)
          
          swiperHeight: (res.windowHeight - 40.0)
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
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    console.log("loadMore data 2")
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }, 

  // 绑定事件
  typeClick: function(even) {
    this.stopVideoAndAudio()

    let index = even.currentTarget.dataset.index;
    if (index != this.data.titleIndex) {
      var listTmp = this.data.titles;
      listTmp[index].selected = true;
      listTmp[this.data.titleIndex].selected = false;

      this.setData({
        titleIndex: index,
        titles:listTmp
      })

      let id = even.currentTarget.dataset.id;
      this.loadData(id)
    }    
  },

  changeClick: function(even) {
    this.stopVideoAndAudio()

    let index = even.detail.current;
    if (index != this.data.titleIndex) {
      var listTmp = this.data.titles;
      listTmp[index].selected = true;
      listTmp[this.data.titleIndex].selected = false;

      this.setData({
        titleIndex: index,
        titles: listTmp
      })

      let id = this.data.titles[index].id;
      this.loadData(id)
    }
  },

  detailClick: function (even) {
    console.log(even)
    this.stopVideoAndAudio()
    wx.navigateTo({
      url: '../Essence/Detail/detail?title=' + even.currentTarget.dataset.title + "&id=" + even.currentTarget.dataset.id,
    })
  },

  moreClick: function (even) {
    wx.showToast({
      icon: "none",
      title: '查看更多',
    })
  },

  praiseClick: function (even) {
    wx.showToast({
      icon: "none",
      title: '点赞',
    })
  },

  criticizeClick: function (even) {
    wx.showToast({
      icon: "none",
      title: '踩',
    })
  },

  shareClick: function (even) {
    wx.showToast({
      icon: "none",
      title: '转发',
    })
  },

  commentClick: function (even) {
    wx.showToast({
      icon: "none",
      title: '评论',
    })
  },

  stopVideoAndAudio: function () {
    // 停止上一个音频的播放
    if (this.audioContext) {
      this.audioContext.pause()
    }

    // 停止上一个视频的播放
    if (this.videoContext) {
      this.videoContext.pause()
    }
  },

  videoPlay: function (even) {
    this.stopVideoAndAudio()
    this.videoContext = wx.createVideoContext(even.currentTarget.id, this)
  },

  audioPlay: function (even) {
    this.stopVideoAndAudio()
    this.audioContext = wx.createAudioContext(even.currentTarget.id, this)
  },

  // 网络请求
  request: function (url, callback) {
    // 没有数据时，请求数据
    wx.showLoading({
      title: '请稍后',
    })

    wx.request({
      url: url,
      success: function (res) {
        console.log(res)
        // wx.hideLoading()
        setTimeout(function(){
          wx.hideLoading()          
        }, 1000)
        callback(true, res)
      },
      fail: function (res) {
        // wx.hideLoading()
        setTimeout(function () {
          wx.hideLoading()
        }, 1000)
        callback(false, null)
      }
    })
  },

  loadData: function(typeId) {
    // 已经有数据时，则不再请求数据
    if (typeId == typeIdAll) {
      if (0 < this.data.allValues.length) {
        return ;
      }
    } else if (typeId == typeIdVideo) {
      if (0 < this.data.videoValues.length) {
        return;
      }
    } else if (typeId == typeIdImage) {
      if (0 < this.data.imageValues.length) {
        return;
      }
    } else if (typeId == typeIdText) {
      if (0 < this.data.textValues.length) {
        return;
      }
    } else if (typeId == typeIdAudio) {
      if (0 < this.data.audioValues.length) {
        return;
      }
    }

    // 没有数据时，请求数据
    var thisBlock = this
    let url = "http://api.budejie.com/api/api_open.php?a=list&c=data&type=" + typeId;
    this.request(url, function(isSuccess, res){
      if (isSuccess) {
        if (typeId == typeIdAll) {
          thisBlock.data.allMaxTime = res.data.info.maxtime
          thisBlock.setData({
            allValues: res.data.list
          })
        } else if (typeId == typeIdVideo) {
          thisBlock.data.videoMaxTime = res.data.info.maxtime
          thisBlock.setData({
            videoValues: res.data.list
          })
        } else if (typeId == typeIdImage) {
          thisBlock.data.imageMaxTime = res.data.info.maxtime
          thisBlock.setData({
            imageValues: res.data.list
          })
        } else if (typeId == typeIdText) {
          thisBlock.data.textMaxTime = res.data.info.maxtime
          thisBlock.setData({
            textValues: res.data.list
          })
        } else if (typeId == typeIdAudio) {
          thisBlock.data.audioMaxTime = res.data.info.maxtime
          thisBlock.setData({
            audioValues: res.data.list
          })
        }
      }
    })
  },

  loadDataMore: function(typeId) {
    var page = 0
    var maxtime = ""
    if (typeId == typeIdAll) {
      page = (this.data.allPage++)
      maxtime = this.data.allMaxTime
    } else if (typeId == typeIdVideo) {
      page = (this.data.videoPage++)
      maxtime = this.data.videoMaxTime
    } else if (typeId == typeIdImage) {
      page = (this.data.imagePage++)
      maxtime = this.data.imageMaxTime
    } else if (typeId == typeIdText) {
      page = (this.data.textPage++)
      maxtime = this.data.textMaxTime
    } else if (typeId == typeIdAudio) {
      page = (this.data.audioPage++)
      maxtime = this.data.audioMaxTime
    }

    var thisBlock = this
    let url = "http://api.budejie.com/api/api_open.php?a=list&c=data&type=" + typeId + "&page=" + page + "&maxtime=" + maxtime;
    this.request(url, function(isSuccess, res){
      if (isSuccess) {
        if (typeId == typeIdAll) {
          thisBlock.data.allMaxTime = res.data.info.maxtime
          thisBlock.setData({
            allValues: thisBlock.data.allValues.concat(res.data.list)
          })
        } else if (typeId == typeIdVideo) {
          thisBlock.data.videoMaxTime = res.data.info.maxtime
          thisBlock.setData({
            videoValues: thisBlock.data.videoValues.concat(res.data.list)
          })
        } else if (typeId == typeIdImage) {
          thisBlock.data.imageMaxTime = res.data.info.maxtime
          thisBlock.setData({
            imageValues: thisBlock.data.imageValues.concat(res.data.list)
          })
        } else if (typeId == typeIdText) {
          thisBlock.data.textMaxTime = res.data.info.maxtime
          thisBlock.setData({
            textValues: thisBlock.data.textValues.concat(res.data.list)
          })
        } else if (typeId == typeIdAudio) {
          thisBlock.data.audioMaxTime = res.data.info.maxtime
          thisBlock.setData({
            audioValues: thisBlock.data.audioValues.concat(res.data.list)
          })
        }
      }
    })
  },

  // 加载更多
  // onReachBottom: function () {
  //   console.log("loadMore data 2")
  // },

  loadMoreData: function () {
    console.log("loadMore data 1");

    let id = this.data.titles[this.data.titleIndex].id;
    this.loadDataMore(id)
  }
})