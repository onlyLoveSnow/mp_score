// pages/login/login.js
var app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    jwUrl: app.globalData.jwUrl,
    jwUrlTemp: '',
    showHSDialog: false,
    showTips: false,
    xh: '',
    pwd: '',
    pwdPla: '请输入密码',
    pwdDisabled: false,
    loginLabel: '登 录'
  },

  // 补全学号
  xhinput: function (e) {
    
  },

  // 网址改变
  jwUrlInput: function (e) {
    this.setData({
      jwUrl: e.detail.value
    })
  },

  // 网址确定
  changeUrl() {
    if (this.data.jwUrlTemp != '') {
      app.globalData.jwUrl = this.data.jwUrlTemp

      this.setData({
        showHSDialog: false,
        xh: '',
        pwd: '',
        pwdPla: '请输入密码'
      })

      app.globalData.xh = ''
      app.globalData.token = ''
      app.globalData.stu_info = ''
    } else {
      this.setData({
        showHSDialog: false
      })
    }
  },

  // 登录
  login: function () {
    if (app.globalData.token != '') {
      if (this.data.xh != '') {
        wx.showLoading({
          title: '登录中',
        })

        app.globalData.xh = this.data.xh

        let url = app.globalData.jwUrl + '/app.do?method=getUserInfo&xh=' + this.data.xh
        wx.cloud.callFunction({
          name: 'nnxy_grade',
          data: {
            url: url,
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
                  // _this.setData({
                  //   pwd: '',
                  //   pwdPla: '当前可免密查询任意学号成绩',
                  //   pwdDisabled: true
                  // })
                }
              })

              // wx.showToast({
              //   title: '登录成功',
              //   icon: 'success',
              //   duration: 2000
              // })
            } else {
              // 关闭loading提示框
              wx.hideLoading()

              wx.showModal({
                title: '提示',
                content: '登录失败，请检查学号',
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
          content: '学号不能为空',
          showCancel: false
        })
      } else if (this.data.pwd == '') {
        wx.showModal({
          title: '提示',
          content: '密码不能为空',
          showCancel: false
        })
      }
    } else {
      wx.showLoading({
        title: '登录中',
      })

      var _this = this

      let url = app.globalData.jwUrl + '/app.do?method=authUser&xh=' + this.data.xh + '&pwd=' + this.data.pwd

      wx.cloud.callFunction({
        name: 'nnxy_grade',
        data: {
          url: url
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
            url = app.globalData.jwUrl + '/app.do?method=getUserInfo&xh=' + _this.data.xh
            wx.cloud.callFunction({
              name: 'nnxy_grade',
              data: {
                url: url,
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
                      pwdPla: '当前可免密查询任意学号成绩',
                      pwdDisabled: true,
                      loginLabel: '查 询'
                    })
                  }
                })

                // wx.showToast({
                //   title: '登录成功',
                //   icon: 'success',
                //   duration: 2000
                // })
              }
            })
          }
        },
        fail(res) {
          wx.hideLoading()

          wx.showModal({
            title: '提示',
            content: '登录失败，请检查教务系统网址是否正确',
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

  toAbout() {
    wx.navigateTo({
      url: '../about/about',
    })
  },

  openHSDialog: function () {
    this.setData({
      showHSDialog: true
    })
  },

  closeHSDialog: function () {
    this.setData({
      showHSDialog: false
    })
  },

  showTips: function () {
    this.setData({
      showTips: true
    })
  },

  closeTips: function () {
    this.setData({
      showTips: false
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var showTipsValue = wx.getStorageSync('showTips');

    if (showTipsValue) {
      this.setData({
        showTips: false
      })
    } else {
      this.setData({
        showTips: true
      })
      wx.setStorage({
        key: "showTips",
        data: "false"
      })
    }
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