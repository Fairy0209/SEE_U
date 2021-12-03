// miniprogram/pages/messagepage/messagepage.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userMessage:[],
    logged :false
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

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    if(typeof(app.userInfo[0])!='undefined'){
      this.setData({
        logged:true,
        userMessage:app.userMessage
      })
      console.log(app.userMessage)
    }else{
      wx.showToast({
        title: '未登录',
        icon:'none',
        duration:2000,
        success:()=>{
          setTimeout(()=>{
            wx.switchTab({
              url: '../user/user',
            })
          },2000)
        }
      })
    }
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
  onMyEvent(ev){
    this.setData({
      userMessage : []
    },()=>{
        this.setData({
          userMessage: ev.detail
        });
    });
  }
})