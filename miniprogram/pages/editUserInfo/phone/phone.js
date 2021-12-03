const db = wx.cloud.database()
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    phoneNumber:"",
    errormessage :"未更换手机号"
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
      phoneNumber:app.userInfo[0].phoneNumber
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
    let value = ev.detail;
    this.setData({
      phoneNumber:value,
      errormessage:""
    })
    console.log(ev.detail);
    console.log(this.data.phoneNumber)
  },
  upDatePhoneNumber:function(){
    wx.showLoading({
      title: '更新中',
    })
    if(app.userInfo){
      db.collection("users").doc(app.userInfo[0]._id).update({
        data:{
          phoneNumber:this.data.phoneNumber,
        }
      }).then((res)=>{
          wx.hideLoading({
            complete: (res) => {
              wx.showToast({
                title: '更新信息成功',
              })
            },
          });
          app.userInfo[0].phoneNumber = this.data.phoneNumber;
      })
    }
    
  },
  handleBtn:function(){
    console.log("点击了按钮");
    this.upDatePhoneNumber();
  },
})