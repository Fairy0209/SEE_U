// miniprogram/pages/detail/detail.js
const db = wx.cloud.database()
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    detail : {},
    isFriend : false,
    isVisual:true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      let userId =options.userId
      db.collection('users').doc(userId).get().then((res)=>{
        this.setData({
          detail:res.data
        });
        let friendList = res.data.friendList;
        if(friendList.includes(app.userInfo[0]._id)){
          this.setData({
            isFriend:true
          });
        }else{
          if(userId == app.userInfo[0]._id){
            this.setData({
              isFriend:true,
              isVisual:false
            })
          }
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

  },
  handleAddFriend(){
    if(typeof(app.userInfo[0])!='undefined'){
      db.collection('message').where({
        userId:this.data.detail._id
      }).get().then((res)=>{
        if(res.data.length){//更新
          console.log('更新')
          if(res.data[0].list.includes(app.userInfo[0]._id)){
            wx.showToast({
              title: '已申请过',
              icon:'none'
            })
          }else{
            wx.cloud.callFunction({
              name:'update',
              data:{
                collection :'message',
                where:{
                  userId:this.data.detail._id
                },
                data : `{list : _.unshift('${app.userInfo[0]._id}')}`
              }
            }).then((res)=>{
              wx.showToast({
                title: '已提交申请~',
              })
            })
          }
        }else{//添加
          db.collection('message').add({
            data:{
              userId:this.data.detail._id,
              list:[app.userInfo[0]._id]
            }
          }).then((res)=>{
            wx.showToast({
              title: '申请提交成功',
            })
          })
        }
      })

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
  }
})