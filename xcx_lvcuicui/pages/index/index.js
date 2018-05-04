// index.js

// 获取应用实例

var _app_ = getApp();

Page({
  data: {
    userInfo: {},
    indexmenu: [],
    imgUrls: [],
    indicatorDots: false,

    showLoading: false,
  },

  onLoad: function () {
    this.fetchData();
    var that = this;
    // 调用应用实例的方法获取全局数据
    _app_.getUserInfo(function (userInfo) {
      // 更新数据
      that.setData({
        userInfo: userInfo
      })
    })

    // 获取微信唯一码(step1)
    wx.login({
      success: function (res) {
        // 询问微信注册号(step2)
        wx.request({
          url: 'https://api.weixin.qq.com/sns/jscode2session',
          data: {
            appid: 'wxa16d3988fa6c1ad0',
            secret: 'd193d9b4525ce5193e9a76dbe86af638',
            js_code: res.code,
            grant_type: 'authorization_code'
          },
          method: 'GET',
          header: {},
          success: function (res) {
            // success
            // console.log(res.data)
            // 存入本地
            const weixinId = res.data.openid;
            wx.setStorage({
              key: 'wid',
              data: weixinId,
            })

            // 询问用户否注册(step3)
            var url_str = 'https://api.zlsapp.com/SL.php/Lawyer/wx_add?wid='
            wx.request({
              url: url_str + res.data.openid + '&&jsoncallback=?',
              data: {
                wid: weixinId
              },
              method: 'GET',
              header: {},
              success: function (res) {
                // success
                var len = res.data.length
                var entity = JSON.parse(res.data.substring(1, len - 1))
                //console.log(entity.obj)
                that.setData({
                  showLoading: false
                })
                if (entity.obj.exist) {
                  console.log(entity.obj.message)
                  // 存入本地
                  wx.setStorage({
                    key: 'lid',
                    data: entity.obj.lid,
                  })
                } else {
                  console.log(entity.obj.message + ',手机号码与微信号未绑定')
                  // 存入本地
                  wx.setStorage({
                    key: 'lid',
                    data: 290,
                  })
                }
              },
              fail: function () { },
              complete: function () { }
            })
            
          },
          fail: function () { },
          complete: function () { }
        })
      },
      fail: function () { },
      complete: function () { }
    })
  },


  // 初始化
  fetchData: function () {
    this.setData({
      imgUrls: [
        { url: '../../images/banner_01.png' },
        { url: '../../images/banner_02.png' },
        { url: '../../images/banner_03.png' }
      ],
      indexmenu: [
        {
          'icon': './../../images/icon_03.png',
          'text': '同行互助',
          'url':  'help',
        },
        {
          'icon': './../../images/icon_09.png',
          'text': '咨询回复',
          'url': 'questions',
        },
        {
          'icon': './../../images/icon_13.png',
          'text': '案源发布',
          'url': 'ask',
        },
        {
          'icon': './../../images/u24.png',
          'text': '法律工具',
          'url': 'tool',
        },
        {
          'icon': './../../images/u42.png',
          'text': '电话咨询',
          'url': 'apply',
        },
        {
          'icon': './../../images/u28.png',
          'text': '关于我们',
          'url': 'aboutus',
        }
      ]
    })
  },

  // 跳转
  changeRoute: function (url) {
    wx.navigateTo({
      url: '../${url}/${url}'
    })
  },




})
