// components/myWxPay/myWxPay.js
var timer = null
const app = getApp()
const util = require('../../utils/util')

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    // 商品id
    _id: {
      type: String,
    },
    // 商品数量
    amount: {
      type: Number,
    },
    // 商品类型
    type: {
      type: String,
    },
    // 商品价格
    countPrice: {
      type: Number,
    },
    // 订单id
    orderId: {
      type: String
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    // 模拟微信支付的一些控件参数
    passwordArr: [0, 0, 0, 0, 0, 0],
    wxPayState: 1,
    dotArr: ['dot-item-color1', 'dot-item-color2', 'dot-item-color3'],
    dotIndex: 0
  },

  // 开始模拟微信支付
  ready: () => {
    wx.setNavigationBarTitle({
      title: 'wx-pay',
    })
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 开启微信支付
    openWXPay() {
      this.setData({
        wxPayState: 1
      })
    },

    // 微信支付等待
    wxPayLoad() {
      this.setData({
        wxPayState: 2
      })
      timer = setInterval(() => {
        if (this.data.dotIndex === 3) {
          this.setData({
            dotIndex: 0
          })
        }
        this.setData({
          dotIndex: this.data.dotIndex + 1
        })
      }, 300);
      setTimeout(() => {
        this.setData({
          wxPayState: 3
        })
      }, 2000);
    },

    // 处理微信支付密码输入
    handlePasswordIpt(e) {
      let length = e.detail.value.length
      let pasArr = this.data.passwordArr
      pasArr.forEach((item, index) => {
        pasArr[index] = index < length ? 1 : 0
      })
      this.setData({
        passwordArr: pasArr
      })
      if (length === 6) {
        this.wxPayLoad()
        if (this.data.orderId.length > 0) {
          // 支付成功,更改订单状态为已支付
          this.updateOrderStatus(this.data.orderId,1)
        } else {
          // 支付成功,添加订单
          this.addOrderRequest(1)
        }
      }
    },

    // 关闭微信支付
    closePay() {
      wx.showModal({
        title: '关闭支付',
        content: '确认关闭支付，去我的订单查看吗？',
        success: res => {
          if (res.confirm) {
            this.setData({
              wxPayState: 0
            })
            if (this.data.orderId.length > 0) {
              // 支付成功,更改订单状态为已支付
             this.redirectOrderList()
            } else {
              // 添加未支付的订单
              this.addOrderRequest(0, {
                callback: this.redirectOrderList
              })
            }
          } else if (res.cancel) {
            this.triggerEvent('closeWxpayComponent',false)
            this.setData({
              wxPayState: 1
            })
          }
        }
      })
    },

    // 请求添加订单
    addOrderRequest(state = 0, cb) {
      console.log(this.data.type); 
      wx.request({
        url: app.globalData.api + 'order/addOrder',
        data: {
          goods_id: this.data._id,
          user_id: app.globalData.payInfo._id,
          goods_num: this.data.amount,
          create_time: util.formatTime(new Date()),
          order_number: new Date().getTime() + '' + Math.random().toFixed(4).toString().split('\.')[1],
          state: state,
          type: this.data.type === 'group' ? 1 : this.data.type === 'coupon' ? 2 : 3,
          order_price: this.data.countPrice
        },
        success: res => {
          console.log(res);
          if (cb && cb.callback) {
            // 跳转订单列表
            cb.callback()
          }
        }
      })
    },

    // 请求更改订单状态为已支付
    updateOrderStatus(orderId, status, cb) {
      wx.request({
        url: app.globalData.api + 'order/updateOrderStatus',
        data: {
          orderId: orderId,
          state: status,
        },
        success: res => {
          console.log(res);
          if (cb && cb.callback) {
            // 跳转订单列表
            cb.callback()
          }
        }
      })
    },

    // 添加订单完成跳转订单列表页面
    redirectOrderList() {
      wx.redirectTo({
        url: '../myorder/myorder',
      })
    },
  },

  // 清除定时器
  detached: () => {
    clearInterval(timer)
  }

})