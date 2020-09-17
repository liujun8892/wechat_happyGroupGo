//app.js
App({
  // 全局数据
  globalData: {
    api: 'https://liujun1314.online/node1/',
    userInfo: null
  },
  onLaunch:function () {
    // 获取用户信息
    wx.getUserInfo({
      success:(res)=>{
        this.globalData.userInfo = res.userInfo
        // console.log(res.userInfo);
        // 微信登录
        wx.login({
         success: res=>{
           if(res.code){
             // 发送node服务器注册或者登录
              wx.request({    
                url: this.globalData.api+'testUid',
                data: {
                  code: res.code,
                  head: this.globalData.userInfo.avatarUrl,
                  nickname:  this.globalData.userInfo.nickName
                },
                success: res=>{
                  this.globalData.payInfo = res.data // 与支付相关信息
                }
              })
           }else {
             console.log('登录失败!'+res.errMsg);
           }
         }
        })  
        
      }
    })
  }
})