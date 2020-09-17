// pages/movie/movie.js
//获取应用实例
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
   // 头部tab栏选中索引
   tabBarSelectedIndex: 2,
  },

  toggleTabbar: function (e) {
    console.log(e);
    this.setData({
      tabBarSelectedIndex: Number.parseInt(e.currentTarget.dataset.index)
    })
    if (e.currentTarget.dataset.name === '吃美食') {
      wx.redirectTo({
        url:'../index/index',
      })
    }
  },

  movieClick:function(e)
  {
    wx.navigateTo({
      url: '../moviedetails/moviedetails?id=' + e.currentTarget.dataset.id,
    })
  },
  cinemaClick:function(e)
  {
    wx.navigateTo({
      url: '../cinema/cinema?id=' + e.currentTarget.dataset.id,
    })
  },
  // to_Food:function()
  // {
  //   wx.redirectTo({
  //     url: '../index/index',
  //   })
  // },
  myorder: function () {
    wx.navigateTo({
      url: '../myorder/myorder',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      // 获取tabbar数据
      wx.request({
        url: app.globalData.api + 'getType?pid=0',
        success: (res) => {
          console.log(res.data);
          this.setData({
            tabbarList: res.data
          })
        }
      })
      wx.request({
        url:getApp().globalData.api + 'movie/getMovieCinemaList',
        success:(res)=>{
          console.log(res);
          this.setData({
            movie:res.data.movie,
            cinema:res.data.cinema
          })
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
  
  }
})