// pages/grade/grade.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    getUrl: '', // 请求URL
    token: '', // 请求令牌
    xh: '', // 请求学号
    stu_info: '',// 学生信息
    resArray: [], // 请求到的成绩信息

    semester: ['2019-2020-1', '2018-2019-2', '2018-2019-1', '2017-2018-2', '2017-2018-1'],  // 学期信息
    index: 0
  },

  // 选择学期
  sectionSemester: function(e) {
    this.setData({
      index: e.detail.value
    })

    // 改变请求URL中的学期
    this.setData({
      getUrl: 'http://jw.nnxy.cn/app.do?method=getCjcx&xh=' + this.data.xh + '&xnxqid=' + this.data.semester[this.data.index]
    })

    var _this = this
    // 重新请求
    wx.request({
      url: _this.data.getUrl, // 获取成绩请求
      method: 'get',
      header: {
        'token': _this.data.token // 登录令牌
      },
      success(res) {
        _this.setData({
          resArray: res.data.result
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var _this = this

    // 获取登录令牌
    _this.setData({
      token: wx.getStorageSync('token')
    })

    // 获取登录学号
    _this.setData({
      xh: wx.getStorageSync('xh')
    })

    // 获取学生信息
    _this.setData({
      stu_info: wx.getStorageSync('stu_info')
    })

    _this.setData({
      getUrl: 'http://jw.nnxy.cn/app.do?method=getCjcx&xh=' + _this.data.xh + '&xnxqid=' + _this.data.semester[_this.data.index]
    })

    // 网络请求
    wx.request({
      url: _this.data.getUrl, // 获取成绩请求
      header: {
        'token': _this.data.token // 登录令牌
      },
      success(res) {
        _this.setData({
          resArray: res.data.result
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    wx.showToast({
      title: '正在加载',
      icon: 'loading',
      duration: 300
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})