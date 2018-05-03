//index.js

//获取应用实例
var app = getApp()

Page({

  // 数据
  data: {
    motto: 'Hello World',
    wxid: '',
    phone_number: '',
    secret_code: '',
    input_code:  '',
    userInfo: {}, 
    codeBtnTitle: '获取验证码',
    countDown: 90,
    counting: false,
    showLoading: true
  },

  // 生命周期
  onLoad: function () {
    console.log('Index onLoad')
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo){
      //更新数据
      that.setData({
        userInfo:userInfo
      })
    })

    // 获取微信唯一码(step1)
    wx.login({
      success: function(res){
        
        // 询问微信注册号(step2)
        wx.request({
          url: 'https://api.weixin.qq.com/sns/jscode2session',
          data: {
            appid:  'wxa16d3988fa6c1ad0',
            secret: 'd193d9b4525ce5193e9a76dbe86af638',
            js_code: res.code,
            grant_type: 'authorization_code'
          },
          method: 'GET', 
          header: {}, 
          success: function(res){
            // success
            // console.log(res.data)
            that.setData({
              wxid: res.data.openid
            })

            // 询问用户否注册(step3)
            var url_str = 'https://api.zlsapp.com/SL.php/Lawyer/wx_add?wid='
            wx.request({
              url: url_str + res.data.openid + '&&jsoncallback=?',
              data: {
                wid: res.data.openid
              },
              method: 'GET',
              header: {},
              success: function(res){
                // success
                var len = res.data.length
                var entity = JSON.parse(res.data.substring(1, len-1))
                // console.log(entity.obj)
                that.setData({
                  showLoading: false
                })
                if (entity.obj.exist) {
                  console.log(entity.obj.message)
                } else {  
                  console.log(entity.obj.message)
                } 
              },
              fail: function() { },
              complete: function() { }
            })
          },
          fail: function() { },
          complete: function() { }
        })
      },
      fail: function() { },
      complete: function() { }
    })
  },

  // 事件处理函数
  // 点击看日志
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },

  // 存储手机号
  bindInputNumber: function(e) {
    var that = this
    that.setData({
        phone_number: e.detail.value
      })
  },
  
  // 存储验证码
  bindInputCode: function(e) {
    var that = this
    that.setData({
        input_code: e.detail.value
      })
  },

  // 点击获取验证码
  btnForCode: function(e) {
    // 
    if (this.counting == true) {
      console.log('锁死')
      return
    }

    var that = this
    var wxid = this.data.wxid
    var phone = this.data.phone_number

    if (wxid == '') {
      wx.showModal({
        title: '提示:',
        content: '微信认证失败',
        showCancel: false,
        confirmText: '我知道了',
        success: function(res) { }
      })
      return;
    }

    if (phone == '') {
      wx.showModal({
        title: '提示:',
        content: '请输入手机号码',
        showCancel: false,
        confirmText: '我知道了',
        success: function(res) { }
      })
      return;
    }
    
    this.counting = true
    console.log('btnForCode')
    wx.showToast({
      title: '加载中',
      icon: 'loading',
      duration: 10000
    })

    var url_str = 'https://api.zlsapp.com/SL.php/Lawyer/wx_add?wid='
    // console.log(url_str + wxid + '&&mobile=' + phone + '&&jsoncallback=?')
    wx.request({
      url: url_str + wxid + '&&mobile=' + phone + '&&jsoncallback=?',
      data: {},
      method: 'POST',
      header: { },
      success: function(res){
        // success
        console.log(res.data)
        var len = res.data.length
        var entity = JSON.parse(res.data.substring(2, len-1))
        if (entity.obj) {
          console.log('code: ' + entity.obj.code)
          var num = this.countDown
          
          that.setData({
            secret_code: entity.obj.code,
            codeBtnTitle: num
          })

        } else {
          wx.showModal({
            title: '提示:',
            content: entity.msg,
            showCancel: false,
            confirmText: '我知道了',
            success: function(res) { }
          })
        }
      },
      fail: function() { },
      complete: function() { 
        this.counting = false
        console.log('解锁')
        setTimeout(function(){
          wx.hideToast()
        }, 1000)
      }
    })
  },

  // 
  btnForLogin: function(e) {
    console.log('btnForLogin')
    console.log(e);
  },



})
