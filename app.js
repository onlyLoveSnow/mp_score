//app.js
App({
  onLaunch: function () {
    /**
     * 云函数
     */
    wx.cloud.init({})
  },
  globalData: {
    jwUrl: 'http://jw.nnxy.cn/',
    xh: '',
    token: '',
    stu_info: ''
  }
})