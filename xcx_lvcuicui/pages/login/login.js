// pages/login/login.js

import _util_ from './../../utils/util.js';
import _info_ from './../../utils/info.js';

Page({

  data: {
    codeBtnTitle: '验证码',
    mobileNum: '',
    passCode: '',
    passCodeCheck: '9999',
    checked: true,
    showLoading: false
  },

  onLoad: function (options) {
    console.log('onLoad');
  },

  // 分享
  onShareAppMessage: function () {
    console.log('onShareAppMessage');
  },

  // 输入手机号码
  onInputNumber: function (e) {
    var num = e.detail.value;
    // console.log('onInputNumber:' + num);
    // 长度控制
    if (num.length > 11) {
      var old_num = this.data.mobileNum;
      this.setData({
        mobileNum: old_num
      })
      return;
    }

    // 赋值
    this.setData({
      mobileNum: num
    })
  },

  // 输入验证码
  onInputCode: function (e) {
    var num = e.detail.value;
    // console.log('onInputCode:' + num);
    // 长度控制
    if (num.length > 8) {
      var old_num = this.data.passCode;
      this.setData({
        passCode: old_num
      })
      return;
    }

    // 赋值
    this.setData({
      passCode: num
    })
  },

  // 请求验证码
  tapForCode: function (e) {
    console.log('tapForCode');
  },

  // 查看服务协议
  tapForAgreement: function (e) {
    // console.log('tapForAgreement');
    wx.navigateTo({
      url: '../agreement/agreement'
    })
  },

  // 点击勾选
  tapForCheck: function (e) {
    var chk = e.detail.value[0] ? true : false;
    // console.log('tapForCheck:' + chk);
    this.setData({
      checked: chk
    })
  },

  // 登录注册
  tapForLogin: function (e) {
    // console.log('tapForLogin');
    
    // 手机号码验证
    var mobile = this.data.mobileNum
    if (!_util_.checkMobile(mobile)) {
      // _info_.warning('提示', '请输入正确的手机号码');
      // return;
    }
    
    // 验证码验证
    var pass1 = this.data.passCode;
    var pass2 = this.data.passCodeCheck;
    if (pass1 != pass2) {
      // _info_.warning('提示', '验证码不正确');
      // return;
    }

    // 跳转到律师详情页
    wx.redirectTo({
      url: '../lawyerdetail/lawyerdetail',
    })
  },

})