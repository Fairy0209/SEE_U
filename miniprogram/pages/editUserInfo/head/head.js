// miniprogram/pages/editUserInfo/head/head.js
const db = wx.cloud.database()
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userPhoto:"cloud://cloud1-1ggfer2heb87128b.636c-cloud1-1ggfer2heb87128b-1308518701/userPhoto/_联系人.png",
    disabled:true
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
      userPhoto:app.userInfo[0].userPhoto,
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
  handleUpLoadImage:function(){
    wx.chooseImage({
      count: 1,
      sizeType: [, 'compressed'],
      sourceType: ['album', 'camera'],
      success: (res)=> {
        // tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFilePaths
        console.log(tempFilePaths)
        this.setData({
          userPhoto:tempFilePaths,
          disabled:false
        })
      }
    })
  },
  handleBtn:function(){
    if(this.data.disabled == false){
      wx.showLoading({
        title: '上传头像中',
      })
      let cloudPath = "userPhoto/"+app.userInfo[0]._openid+Date.now()+".jpg";
      wx.cloud.uploadFile({
        cloudPath: cloudPath, // 上传至云端的路径
        filePath: this.data.userPhoto[0], // 小程序临时文件路径
        success: res => {
          // 返回文件 ID
          console.log(res.fileID)
          let fileID = res.fileID
          console.log("fileID为："+fileID);
          if(fileID){
            db.collection('users').doc(app.userInfo[0]._id).update({
              data:{
                userPhoto:fileID
              }
            }).then((res)=>{
              wx.hideLoading({
                complete: (res) => {
                  console.log(res)
                },
              })
              wx.showToast({
                title: '上传成功',
              })
              app.userInfo[0].userPhoto = fileID
              this.setData({
                disabled:true
              })
            })
          }
        },
        fail: console.error
      })
    }else{
      wx.showToast({
        icon:"loading",
        title: '请先更换头像',
      })
    }
  },
  bindGetUserInfo(ev) {
    let userInfo = ev.detail.userInfo;
    if(userInfo){
      this.setData({
        userPhoto : userInfo.avatarUrl
      },()=>{
        wx.showLoading({
          title: '更换微信头像中',
        })
        db.collection('users').doc(app.userInfo[0]._id).update({
          data:{
            userPhoto:userInfo.avatarUrl
          }
        }).then((res)=>{
          wx.hideLoading({
            complete: (res) => {
              console.log(res)
            },
          })
          app.userInfo[0].userPhoto=userInfo.avatarUrl;
          wx.showToast({
            title: '上传成功',
          })
          app.userInfo[0].userPhoto = fileID
          this.setData({
            disabled:true
          })
        })
      
      });
    }
  }
})