//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    // 头部tab栏选中索引
    tabBarSelectedIndex: 0,
    // 美食分类选中索引
    foodClassifySelectedIndex: 0,
    // 头部tab栏list
    tabbarList: [],
    // 美食分类list
    foodClaassifyList: [],
    // 美食商铺列表
    foodShopList: [],
    // 星级列表图片url
    starUrl: ['../../images/m.png', '../../images/b.png', '../../images/q.png']
  },

  onLoad: function () {
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
    // 获取美食分类数据
    wx.request({
      url: app.globalData.api + 'getType?pid=1',
      success: (res) => {
        if (!Array.isArray(res.data)) return
        res.data.unshift({
          "_id": 999,
          "name": "推荐",
          "type": 1,
          "pid": 1
        })
        this.setData({
          foodClaassifyList: res.data
        })
      }
    })
    // 获取默认推荐的美食商铺列表
    this.getFoodShopList(0)
  },

  // tabbar切换
  toggleTabbar: function (e) {
    console.log(e);
    this.setData({
      tabBarSelectedIndex: Number.parseInt(e.currentTarget.dataset.index)
    })
    if (e.currentTarget.dataset.name === '看电影') {
      wx.redirectTo({
        url:'../movie/movie',
      })
    }
  },
  // 美食分类切换
  toggleFoodClassify: function (e) {
    this.setData({
      foodClassifySelectedIndex: Number.parseInt(e.currentTarget.dataset.index)
    })
    let id = e.currentTarget.dataset.id
    if (id == 999) {
      id = 0
    }
    this.getFoodShopList(id)
  },
  // 获取美食商铺列表
  getFoodShopList(id) {
    wx.request({
      url: app.globalData.api + 'getShopList?_id=' + id,
      success: (res) => {
        this.handleShopStar(res.data)
        this.setData({
          foodShopList: res.data
        })
      }
    })
  },
  // 处理美食商铺的星级
  handleShopStar(shopList) {
    if (!(shopList && Array.isArray(shopList) && shopList.length > 0)) return
    // 0无星 1半颗星 2满星
    shopList.forEach(item => {
      let starArr = [0, 0, 0, 0, 0]
      let scoreNum = item.star_num / item.client_num
      let scoreInteger = parseInt(scoreNum)
      let scoreDecimal = scoreNum % 1
      for (let index = 0; index < scoreInteger; index++) {
        starArr[index] = 2;
      }
      if (scoreDecimal >= 0.5) {
        starArr[scoreInteger] = 1
      }
      item.starArr = starArr
    })
  },
  // 去美食店铺详情页
  goShopDetail(e) {
    wx.navigateTo({
      url: '../shop/shop?id=' + e.currentTarget.dataset.id,
    })
  },

  myorder: function () {
    wx.navigateTo({
      url: '../myorder/myorder',
    })
  },
  
  to_Movie: function () {
    wx.redirectTo({
      url: '../movie/movie'
    })
  },
})