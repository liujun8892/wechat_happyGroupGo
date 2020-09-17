// pages/order/order.js
var timer = null
const app = getApp()
const util = require('../../utils/util')

Page({
  /**
   * 页面的初始数据
   */
  data: {
    id: '',
    name: '',
    price: 0,
    amount: 1,
    // 商品类型 coupon 优惠券 group 团购 
    type: '',
    countPrice: 0.00,
    // 模拟微信支付的一些控件参数
    payShow: false,
    _id:'',
    _type: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '提交订单',
    })
    this.setData({
      id: options.id,
      name: options.name,
      price: parseFloat(options.price).toFixed(2),
      type: options.type,
      countPrice: parseFloat(options.price).toFixed(2)
    })

  },

  // 数量+1
  addAmount() {
    this.setData({
      amount: this.data.amount + 1
    })
    this.setData({
      countPrice: (this.data.amount * this.data.price).toFixed(2)
    })
  },

  // 数量-1
  subAmount() {
    if (this.data.amount === 1) return
    this.setData({
      amount: this.data.amount - 1
    })
    this.setData({
      countPrice: (this.data.amount * this.data.price).toFixed(2)
    })
  },

  // 处理输入的商品数量
  handleAmountInput(e) {
    let value = e.detail.value
    value = value.replace(/[^\d]/g, '')
    this.setData({
      amount: parseInt(value)
    })
  },

  // 处理输入的商品数量离焦重新计算商品总价
  handleAmountBlur() {
    this.setData({
      countPrice: (this.data.amount * this.data.price).toFixed(2)
    })
  },

  // 模拟提交订单
  addOrder() {
    // this.openWXPay()
    console.log('id'+ this.data.id);
    console.log('id'+ this.data.type);
    this.setData({
      _id: this.data.id
    })
    this.setData({
      _type: this.data.type
    })
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

  // 正式的微信支付
  addOrderOfficial: function (e) {
    var that = this;
    var util = require('../../utils/util.js');
    var total_money = that.data.countPrice + '';
    var openid = getApp().globalData.payInfo.openid;
    wx.request({
      url: getApp().globalData.api + 'pay',
      data: {
        openid: openid,
        total_money: total_money
      },
      success: function (res) {
        var ret = false;
        wx.requestPayment({
          'timeStamp': res.data.timeStamp,
          'nonceStr': res.data.nonceStr,
          'package': res.data.package,
          'signType': 'MD5',
          'paySign': res.data.paySign,
          'success': function (res) {
            wx.showToast({
              title: '支付成功',
              icon: 'success',
              duration: 3000
            });
            that.setData({
              state: 1
            })
          },
          'fail': function (res) {
            console.log('fail')
          },
          'complete': function (res) {
            wx.request({
              url: getApp().globalData.api + 'm_order/add',
              data: {
                goodsType: that.data.goodsType == 'coupon' ? 2 : (that.data.goodsType == 'group' ? 1 : 3), //  类型
                goodsNum: that.data.goodsNum, // 数量
                orderPrice: that.data.countPrice, // 价格
                goodsId: that.data.goodsId, //  商品ID
                createTime: util.formatTime(new Date),
                userId: getApp().globalData.payInfo._id,
                orderState: that.data.state, // 订单状态

              },
              success: function (res) {
                if (res.data.info == 'success') {
                  wx.redirectTo({
                    url: '../myorder/myorder'
                  })
                }
              }
            })
          }
        })
      }
    })
  },

  // 添加订单完成跳转订单列表页面
  redirectOrderList() {
    wx.redirectTo({
      url: '../myorder/myorder',
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
    clearInterval(timer)
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