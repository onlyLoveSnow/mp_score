// pages/login/login.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    xh: '',
    pwd: '',
    getUrl: ''
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

  // 登录
  login: function() {
    console.log("学号:" + this.data.xh)
    console.log("密码:" + this.data.pwd)
    var _this = this
    this.setData({
      getUrl: 'http://jw.nnxy.cn/app.do?method=authUser&xh=' + this.data.xh + '&pwd=' + this.data.pwd
    })

    // 网络请求
    wx.request({
      url: this.data.getUrl, // 向南宁学院教务系统请求token
      success(res) {
        if (-1 == res.data.token) {
          wx.showModal({
            title: '提示',
            content: '登录失败，请检查学号和密码',
            showCancel: false,
            success(res) {
              _this.setData({
                xh: '',
                pwd: ''
              })
            }
          })
          return;
        } else {
          // 获取token和保存本地缓存
          wx.setStorage({
            key: "token",
            data: res.data.token
          })
          // 保存学号到本地缓存
          wx.setStorage({
            key: "xh",
            data: _this.data.xh
          })
          // 保存学生信息到本地缓存
          wx.setStorage({
            key: 'stu_info',
            data: res.data.user.userdwmc + ' ' + res.data.user.username,
          })

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
      }
    })
  },

  linkShow() {
    wx.showModal({
      title: '提示',
      content: '并没有这些功能，先别乱点',
      showCancel: false
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