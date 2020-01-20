// pages/login/login.js
var app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    jwUrl: app.globalData.jwUrl,
    showHSDialog: false,
    showTips: false,
    xh: '',
    pwd: '',
    pwdPla: '请输入密码'
  },

  // 获取学号
  xhinput: function(e) {
    this.setData({
      xh: e.detail.value
    })
  },

  // 获取密码
  pwdinput: function(e) {
    this.setData({
      pwd: e.detail.value
    })
  },

  // 网址改变
  jwUrlInput: function(e) {
    this.setData({
      jwUrl: e.detail.value
    })
  },

  // 网址确定
  changeUrl() {
    app.globalData.jwUrl = this.data.jwUrl

    this.setData({
      showHSDialog: false,
      xh: '',
      pwd: '',
      pwdPla: '请输入密码'
    })

    app.globalData.xh = ''
    app.globalData.token = ''
    app.globalData.stu_info = ''
  },

  // 登录
  login: function() {
    if (app.globalData.token != '') {
      if (this.data.xh != '') {
        wx.showLoading({
          title: '加载中',
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
              wx.navigateTo({
                url: '../grade/grade',
                success() {
                  _this.setData({
                    pwd: '',
                    pwdPla: '当前可免密查询任意学号成绩'
                  })
                }
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
        title: '加载中',
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
            // 关闭loading提示框
            wx.hideLoading()

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
                wx.navigateTo({
                  url: '../grade/grade',
                  success() {
                    _this.setData({
                      pwd: '',
                      pwdPla: '当前可免密查询任意学号成绩'
                    })
                  }
                })

                wx.showToast({
                  title: '登录成功',
                  icon: 'success',
                  duration: 2000
                })
              }
            })
          }
        },
        fail(res) {
          wx.hideLoading()

          wx.showModal({
            title: '提示',
            content: '登录失败，请检查输入的教务系统网址是否正确',
            showCancel: false,
            success(res) {
              _this.setData({
                showHSDialog: true
              })
            }
          })
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

  openHSDialog: function() {
    this.setData({
      showHSDialog: true
    })
  },

  closeHSDialog: function() {
    this.setData({
      showHSDialog: false
    })
  },

  closeTips: function() {
    this.setData({
      showTips: false
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      showTips: true
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
    wx.pageScrollTo({
      scrollTop: 160,
      duration: 500
    })
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