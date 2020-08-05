// pages/grade/grade.js
var app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    stu_info: app.globalData.stu_info, // 学生信息
    gradeArray: [], // 请求到的成绩信息

    semesterData: ['2019-2020学年 第1学期', '2018-2019学年 第2学期', '2018-2019学年 第1学期', '2017-2018学年 第2学期', '2017-2018学年 第1学期'], // 学期信息
    index: 0,

    total: 0,
    fail: 0,

    showDialog: false,
    showSemester: false
  },

  sectionSemester(e) {
    let index = e.currentTarget.dataset.index;

    if (index === this.data.index) {
      this.setData({
        showSemester: false
      })
      return;
    }

    this.setData({
      index: index,
      showSemester: false,
      gradeArray: []
    })

    wx.showLoading({
      title: '查询中',
      mask: true
    })

    // 格式化学期
    let semester = this.data.semesterData[index].substring(0, 9) + '-' + this.data.semesterData[index].substring(13, 14);

    // 改变请求URL中的学期
    let url = app.globalData.jwUrl + '/app.do?method=getCjcx&xh=' + app.globalData.xh + '&xnxqid=' + semester

    var _this = this
    // 网络请求
    wx.cloud.callFunction({
      name: 'nnxy_grade',
      data: {
        url: url,
        token: app.globalData.token
      },
      success(response) {
        _this.setData({
          gradeArray: JSON.parse(response.result).result
        })
      },
      complete() {
        wx.hideLoading()
      }
    })
  },

  showStuInfo() {
    var total = 0
    var fail = 0

    for (var item of this.data.gradeArray) {
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

  changeSemester: function () {
    this.setData({
      showSemester: true
    })
  },

  closeSemester: function () {
    this.setData({
      showSemester: false
    })
  },

  closeDialog: function () {
    this.setData({
      showDialog: false
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this

    // 获取学生信息
    _this.setData({
      stu_info: app.globalData.stu_info
    })
    wx.showLoading({
      title: '查询中',
      mask: true
    })

    // 学期数据
    let semesterData = [
      '2026-2027学年 第2学期',
      '2026-2027学年 第1学期',
      '2025-2026学年 第2学期',
      '2025-2026学年 第1学期',
      '2024-2025学年 第2学期',
      '2024-2025学年 第1学期',
      '2023-2024学年 第2学期',
      '2023-2024学年 第1学期',
      '2022-2023学年 第2学期',
      '2022-2023学年 第1学期',
      '2021-2022学年 第2学期',
      '2021-2022学年 第1学期',
      '2020-2021学年 第2学期',
      '2020-2021学年 第1学期',
      '2019-2020学年 第2学期',
      '2019-2020学年 第1学期',
      '2018-2019学年 第2学期',
      '2018-2019学年 第1学期',
      '2017-2018学年 第2学期',
      '2017-2018学年 第1学期'
    ];

    let list = new Array();
    let nowDate = new Date();

    let stuYear = app.globalData.stu_info.nj;
    // let stuYear = 2018;
    let nowYear = nowDate.getFullYear();
    // let nowYear = 2024;
    let nowMonth = nowDate.getMonth() + 1;
    // let nowMonth = 7;
    let i = 0;

    // 获取学生可以查询的学期
    for (let arr of semesterData) {
      if (nowYear <= arr.substring(0, 4) || stuYear > arr.substring(0, 4) || parseInt(stuYear) + 4 <= arr.substring(0, 4)) {
        continue;
      }
      if (nowYear == arr.substring(5, 9)) {
        if (nowMonth < 7) {
          if (arr.substring(13, 14) == 2) {
            continue;
          }
        }
      }

      list[i++] = arr;
    }

    this.setData({
      index: 0,
      semesterData: list
    })

    this.gradeData = []

    // 格式化学期
    let semester = this.data.semesterData[this.data.index].substring(0, 9) + '-' + this.data.semesterData[this.data.index].substring(13, 14);

    // console.log(semester);

    // 拼接请求URL
    let url = app.globalData.jwUrl + '/app.do?method=getCjcx&xh=' + app.globalData.xh + '&xnxqid=' + semester

    // 网络请求
    wx.cloud.callFunction({
      name: 'nnxy_grade',
      data: {
        url: url,
        token: app.globalData.token
      },
      success(response) {
        _this.setData({
          gradeArray: JSON.parse(response.result).result
        })
      },
      complete() {
        wx.hideLoading()
      }
    })
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

  }
})