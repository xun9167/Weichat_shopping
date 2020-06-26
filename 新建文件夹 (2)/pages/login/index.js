// pages/login/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  handleGetuserinfo(e){
    //console.log(e);
    const {userInfo}=e.detail;
    wx-wx.setStorageSync('userinfo', userInfo);
    wx.navigateBack({
      delta:1
    })
  }
  
})