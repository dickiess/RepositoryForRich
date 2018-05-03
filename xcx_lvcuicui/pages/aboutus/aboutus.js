//aboutus.js

//获取应用实例
var app = getApp();

Page({

  // 数据
  data: {
    fullScreenUrl: '../../images/u2.jpg',
    title: '上海找律师信息科技有限公司',
    content: '上海找律师信息科技有限公司是一家从事法律业务的互联网创新企业',
    address: '上海市静安区裕通路100号洲际商务中心3705室',
    telephone:'400-007-9090',
    e_mail:'kefu.zlsapp.com',
    userInfo: {},
  },

  // 生命周期
  onLoad: function () {
    // console.log('AboutUs onLoad');
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function (userInfo) {
      //更新数据
      that.setData({
        userInfo: userInfo
      })
    })
  }
})
