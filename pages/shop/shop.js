// pages/shop/shop.js
//获取应用实例
const app = getApp()

Page({
  /**
   * 页面的初始数据
   */
  data: {
    indicatorDots: true,
    vertical: false,
    autoplay: true,
    interval: 3000,
    duration: 1000,
    // circular: true,
    // 星级列表图片url
    starUrl: ['../../images/m.png', '../../images/b.png', '../../images/q.png']
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      pid: options.id
    })
    // 加载店铺详情数据
    this.getShopDetailById(options.id)
  },

  // 根据店铺id获取店铺详情
  getShopDetailById(id =1,callback) {
    console.log(id);
    wx.request({
      url: app.globalData.api + 'shop/getShopDetail?id='+id,
      success: (res) => {
        console.log(res);
        if(!(res.data&&res.data.info._id)) return
        // 处理用户的总评分星级
        this.handleShopStar(res.data.info)
        // 处理用户每条评论的星级
        this.handleCommentStar(res.data.commentList)
         console.log(res.data);
        wx.setNavigationBarTitle({
          title: res.data.info.name
        })
        this.setData({
          shopInfo: res.data.info,
          groupBuyList: res.data.groupBuy,
          bannerList: res.data.bannerList,
          foodMenuList: res.data.foodMenu,
          commentList: res.data.commentList,
        })
      }
    })
    if(callback){
      callback.success()
    }
  },

  // 处理美食商铺的星级
  handleShopStar(shopInfo) {
    if (!(shopInfo && shopInfo._id)) return
    // 0无星 1半颗星 2满星
    let starArr = [0, 0, 0, 0, 0]
    let scoreNum = shopInfo.star_num / shopInfo.client_num
    let scoreInteger = parseInt(scoreNum)
    let scoreDecimal = scoreNum % 1
    for (let index = 0; index < scoreInteger; index++) {
      starArr[index] = 2;
    }
    if (scoreDecimal >= 0.5) {
      starArr[scoreInteger] = 1
    }
    shopInfo.starArr = starArr
  },

  // 处理用户评论列表星级
  handleCommentStar(commentList) {
    if (!(commentList && Array.isArray(commentList) && commentList.length > 0)) return
    // 0无星 1半颗星 2满星
    commentList.forEach(item => {
      let starArr = [0, 0, 0, 0, 0]
      for (let index = 0; index < item.star; index++) {
        starArr[index] = 2;
      }
      item.starArr = starArr
    })
  },

  // 打电话
  callPhone(e){
    if(!e.currentTarget.dataset.phone) return
    wx.makePhoneCall({
      phoneNumber: e.currentTarget.dataset.phone,
      success:res=>{}
    })
  },

  // 购买去订单页面
  goBuy(e){
    let id = e.currentTarget.dataset.id
    let name = e.currentTarget.dataset.name
    let price = e.currentTarget.dataset.price
    let type = e.currentTarget.dataset.type
    console.log(type);
    
   wx.navigateTo({
     url: `../order/order?id=${id}&name=${name}&price=${price}&type=${type}`,
   })
  },

   // 去团购详情页面
   goGroup(e){
    console.log(e.currentTarget.dataset.id); 
  },

  // 地图功能
  getMap(){
        const latitude = this.data.shopInfo.latitude
        const longitude = this.data.shopInfo.longitude
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
    this.getShopDetailById(this.data.pid,{success:()=>{wx.stopPullDownRefresh()}})
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