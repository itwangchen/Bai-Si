const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

module.exports = {
  formatTime: formatTime,
  request: request,
  requestWithUrl: requestWithUrl
}

// 请求方法
function request(url, header, params, callBack) {

  wx.showLoading({
    title: '请稍后',
  })

  wx.request({
    url: url,
    header: header,
    success: function (res) {
      wx.hideLoading();
      callBack(res);
    },
    fail: function (res) {
      wx.hideLoading();
      callBack(res);
    }
  })
}

// 请求方法
function requestWithUrl(url, callback) {
  // 没有数据时，请求数据
  wx.showLoading({
    title: '请稍后',
  })

  wx.request({
    url: url,
    success: function (res) {
      console.log(res)
      // wx.hideLoading()
      setTimeout(function () {
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
}