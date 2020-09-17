// pages/cinema/cinema.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  buy: function (e) {
    wx.navigateTo({
      url: '../order/order?type=movie&id=' + e.currentTarget.dataset.id + '&name=' +
        e.currentTarget.dataset.name + '&price=' + e.currentTarget.dataset.price,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.request({
      url: getApp().globalData.api + 'movie/getCinemaDetail?id=' + options.id,
      success: (res) => {
        console.log(res);
        this.setData({
          cinemaInfo: res.data.cinemaInfo,
          movieInfo: res.data.movieInfo
        })
        wx.setNavigationBarTitle({
          title: res.data.cinemaInfo.name,
        })
      }
    })
  },

  getMap() {
    const latitude = this.data.cinemaInfo.latitude
    const longitude = this.data.cinemaInfo.longitude
    // 定位到指定的经纬度
    wx.openLocation({
      latitude,
      longitude,
      scale: 18
    })
    // console.log('111');
    // 获得当前的位置
    // wx.getLocation({
    //   type: 'gcj02', //返回可以用于wx.openLocation的经纬度 
    //   success (res) {
    //   }
    //  })
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