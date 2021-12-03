// miniprogram/pages/editUserInfo/signature/signature.js
const db = wx.cloud.database()
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    signature:""

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
      signature:app.userInfo[0].signature
    });
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
  handleText:function(ev){
    let value = ev.detail.value;
    this.setData({
      signature:value
    })
    console.log(this.data.signature);
  },
  upDateSignature:function(){
    wx.showLoading({
      title: '更新中',
    })
    if(app.userInfo){
      db.collection("users").doc(app.userInfo[0]._id).update({
        data:{
          signature:this.data.signature
        }
      }).then((res)=>{
          wx.hideLoading({
            complete: (res) => {
              wx.showToast({
                title: '更新信息成功',
              })
            },
          });
          app.userInfo[0].signature = this.data.signature;
      })
    }
    
  },
  handleBtn:function(){
    console.log("点击了按钮");
    this.upDateSignature();
  },
})