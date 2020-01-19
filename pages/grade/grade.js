// pages/grade/grade.js
var app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    stu_info: app.globalData.stu_info, // 学生信息
    resArray: [], // 请求到的成绩信息

    semester: ['2019-2020-1', '2018-2019-2', '2018-2019-1', '2017-2018-2', '2017-2018-1'], // 学期信息
    index: 0,

    total: 0,
    fail: 0,
    showDialog: false
  },

  // 选择学期
  sectionSemester: function(e) {
    this.setData({
      index: e.detail.value
    })

    // 改变请求URL中的学期
    let getUrl = 'http://jw.nnxy.cn/app.do?method=getCjcx&xh=' + app.globalData.xh + '&xnxqid=' + this.data.semester[this.data.index]

    var _this = this
    // 网络请求
    wx.cloud.callFunction({
      name: 'nnxy_score',
      data: {
        getUrl: getUrl,
        token: app.globalData.token
      },
      success(response) {
        _this.setData({
          resArray: JSON.parse(response.result).result
        })
      }
    })
  },

  showStuInfo() {
    var total = 0
    var fail = 0

    for (var item of this.data.resArray) {
      total++
      if (item.zcj < 60) {
        fail++
      }
    }

    this.setData({
      total: total,
      fail: fail
    })

    this.setData({
      showDialog: true
    })
  },

  closeDialog: function() {
    this.setData({
      showDialog: false
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var _this = this

    // 获取学生信息
    _this.setData({
      stu_info: app.globalData.stu_info
    })

    // 拼接请求URL
    let getUrl = 'http://jw.nnxy.cn/app.do?method=getCjcx&xh=' + app.globalData.xh + '&xnxqid=' + _this.data.semester[_this.data.index]

    // 网络请求
    wx.cloud.callFunction({
      name: 'nnxy_score',
      data: {
        getUrl: getUrl,
        token: app.globalData.token
      },
      success(response) {
        _this.setData({
          resArray: JSON.parse(response.result).result
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

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