// miniprogram/pages/editUserInfo/location/location.js
const db = wx.cloud.database()
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isLocation: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.setData({
      isLocation: app.userInfo[0].isLocation
    });
    console.log('读取到的选项' + app.userInfo[0].isLocation);
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

  },

  onChange({
    detail
  }) {
    console.log("按钮状态" + detail);
    wx.showModal({
      title: '提示',
      content: '开启位置共享',
      success: res => {
        if (res.confirm) {
          if (this.data.isLocation == false) {
            this.setData({
              isLocation: true
            });
            this.handleBtn();
          }

        } else {
          if (this.data.isLocation == true) {
            this.setData({
              isLocation: false
            });
            this.handleBtn();
          }
        }
       
      }
    });
  },
  upDateisLocation: function () {
    wx.showLoading({
      title: '更新中',
    })
    if (app.userInfo) {
      db.collection("users").doc(app.userInfo[0]._id).update({
        data: {
          isLocation: this.data.isLocation,
        }
      }).then((res) => {
        wx.hideLoading({
          complete: (res) => {
            wx.showToast({
              title: '更新信息成功',
            })
          },
        });
        app.userInfo[0].isLocation = this.data.isLocation;
      })
    }

  },
  handleBtn: function () {
    console.log("点击了按钮");
    this.upDateisLocation();
  },
})