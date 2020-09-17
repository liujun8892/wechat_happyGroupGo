// pages/orderdetails/orderdetails.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    payShow: false
  },
  discuss:function(e)
  {
      var num = this.data.orderInfo.goods_num;
      wx.redirectTo({
        url:'../discuss/discuss?id=' + e.currentTarget.dataset.id + '&type=' + e.currentTarget.dataset.type + '&num=' + num
      })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '订单详情',
    })
       wx.request({
         url:getApp().globalData.api + 'order/getOrderDetail',
         data:{
           type:options.type,
           id:options.id
         },
         success:(res)=>{
           this.setData({
             orderInfo:res.data.order,
             orderDetails:res.data.details
           })
         }
       })
  },

  // 微信支付
  pay() {
    this.setData({
      payShow:true
    })
  },

   // 关闭微信支付
   closeConponet(e){
    this.setData({
      payShow: e.detail
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
  
  }
})