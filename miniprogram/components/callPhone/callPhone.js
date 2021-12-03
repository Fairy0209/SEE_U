// components/callPhone/callPhone.js
Component({

  options: {
    styleIsolation: 'apply-shared'
  },
  /**
   * 组件的属性列表
   */
  properties: {
    phoneNumber:String
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    handleCallPhone(ev){
      console.log(ev);
      wx.makePhoneCall({
        phoneNumber: this.data.phoneNumber //仅为示例，并非真实的电话号码
      })
    }
  }
})
