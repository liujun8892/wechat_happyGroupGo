// pages/discuss/discuss.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    starNum:0,
    starClicked:[0,0,0,0,0]
  
  },
  changeStar:function(e)
  {
    var num = e.currentTarget.dataset.num;
    var starClicked = this.data.starClicked;
    for(var i = 0; i < starClicked.length; i++)
    {
      starClicked[i] = i + 1 <= num?1:0;
    }
    this.setData({
      starClicked:starClicked,
      starNum:num
    })
  },
  submit:function(e)
  {
    var that = this;
    var util = require('../../utils/util.js');
    if(e.detail.value.content.length == 0)
    {
      this.setData({
        error:1
      })
      return false;
    }
    wx.request({
      url:getApp().globalData.api + 'discuss/addDiscuss',
      data:{
        star:that.data.starNum,
        type:that.data.options.type,
        orderId:that.data.options.id,
        client:that.data.options.num,
        content:e.detail.value.content,
        uid:getApp().globalData.payInfo._id,
        createTime:util.formatTime(new Date),
      }
      ,success:function(res)
      {
        if(res.data.code==200)
        {
          wx.redirectTo({
            url:'../myorder/myorder'
          })
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      options:options
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