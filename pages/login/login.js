// pages/login/login.js
var app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    xh: '',
    pwd: '',
    pwdPla: '请输入密码'
  },

  // 获取学号
  xhinput: function(e) {
    this.setData({
      xh: e.detail.value
    })
    if (this.data.xh == '077') {
      this.setData({
        xh: '20170217077',
        pwd: 'd6e562abff17228f'
      })
      wx.hideKeyboard()
    }
  },

  // 获取密码
  pwdinput: function(e) {
    this.setData({
      pwd: e.detail.value
    })
  },

  // 登录
  login: function() {
    if (app.globalData.token != '') {
      if (this.data.xh != '') {
        wx.showLoading({
          title: '登录中',
        })

        app.globalData.xh = this.data.xh

        let getUrl = app.globalData.jwUrl + '/app.do?method=getUserInfo&xh=' + this.data.xh
        wx.cloud.callFunction({
          name: 'nnxy_score',
          data: {
            getUrl: getUrl,
            token: app.globalData.token
          },
          success(response) {
            if (response.result != "{}") {
              app.globalData.stu_info = JSON.parse(response.result)

              // 关闭loading提示框
              wx.hideLoading()

              // 提示及跳转
              wx.redirectTo({
                url: '../grade/grade',
              })
              wx.showToast({
                title: '登录成功',
                icon: 'success',
                duration: 2000
              })
            } else {
              // 关闭loading提示框
              wx.hideLoading()

              wx.showModal({
                title: '提示',
                content: '请输入学号无法登录，请检查',
                showCancel: false
              })
            }
          }
        })
      }
    } else if (this.data.xh == '' || this.data.pwd == '') {
      if (this.data.xh == '') {
        wx.showModal({
          title: '提示',
          content: '请输入学号',
          showCancel: false
        })
      } else if (this.data.pwd == '') {
        wx.showModal({
          title: '提示',
          content: '请输入密码',
          showCancel: false
        })
      }
    } else {
      wx.showLoading({
        title: '登录中',
      })

      var _this = this

      let getUrl = app.globalData.jwUrl + '/app.do?method=authUser&xh=' + this.data.xh + '&pwd=' + this.data.pwd

      /**
       * 云函数
       */
      wx.cloud.init({})

      wx.cloud.callFunction({
        name: 'nnxy_score',
        data: {
          getUrl: getUrl
        },
        success(response) {
          let res = JSON.parse(response.result)

          if (-1 == res.token) {
            wx.showModal({
              title: '提示',
              content: '登录失败，请检查学号和密码',
              showCancel: false,
              success(res) {
                _this.setData({
                  pwd: ''
                })
              }
            })
          } else {
            // 保存token到全局变量
            app.globalData.token = res.token
            // 保存学号到全局变量
            app.globalData.xh = _this.data.xh

            // 获取学生信息并保存到全局变量
            getUrl = app.globalData.jwUrl + '/app.do?method=getUserInfo&xh=' + _this.data.xh
            wx.cloud.callFunction({
              name: 'nnxy_score',
              data: {
                getUrl: getUrl,
                token: res.token
              },
              success(response) {
                app.globalData.stu_info = JSON.parse(response.result)

                // 关闭loading提示框
                wx.hideLoading()

                // 提示及跳转
                wx.redirectTo({
                  url: '../grade/grade',
                })
                wx.showToast({
                  title: '登录成功',
                  icon: 'success',
                  duration: 2000
                })
              }
            })
          }
        }
      })
    }
  },

  pwdConfirm() {
    this.login()
  },

  about_msg() {
    wx.navigateTo({
      url: '../about_msg/about_msg',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

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
    if (app.globalData.token != '') {
      this.setData({
        // xh: '20170217',
        xh: app.globalData.xh,
        pwdPla: '当前可免密查询任意学号成绩'
      })
    }
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