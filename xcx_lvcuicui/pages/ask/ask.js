// pages/ask/ask.js

import _info_ from './../../utils/info.js';

Page({

  data: {
    navbar: ['案件咨询', '同行互助'],
    currentTab: 0,

    hideAbove: false,   // 部分内容隐藏

    catelogArray: [],   // 案件分类
    catelogName: '',    // 案件分类名称
    catelogindex: 0,    // 案件分类索引
    catelogid: 0,       // 案件分类id

    question: '',       // 咨询问题
    contact: '',        // 联系人
    mobile: '',         // 手机号码

    helpTypeArray: [],  // 互助类型
    helpTypeName: '',   // 互助类型名称
    helpindex: 0,       // 互助类型索引
    helpid: 0,          // 互助类型id

    helpCaseInfo: '',   // 互助简述
    helpContact: '',    // 联系人
    helpMobile: '',     // 手机号码
  },

  /*----------------------------------------------------------------------------------*/

  // 加载数据
  onLoad: function () {
    //console.log('onLoad');
    this.loadInfo();
  },

  // 菜单项初始化
  loadInfo: function () {
    var arr1 = _info_.getCatelogArray();
    arr1.splice(0, 1); // 取出其中的全部项（0位置的1个数据）
    var arr2 = _info_.getHelpArray();
    arr2.splice(0, 1); // 取出其中的全部项（0位置的1个数据）
    this.setData({
      catelogArray: arr1,
      helpTypeArray: arr2
    })
  },

  // 告警
  warning: function (t) {
    wx.showModal({
      title: '提示:',
      content: t,
      showCancel: false,
    })
  },

  // 点击切换分页
  tapForTab: function (e) {
    const idx = parseInt(e.currentTarget.dataset.idx);
    this.setData({
      currentTab: idx
    })
  },

  /*----------------------------------------------------------------------------------*/

  // 案件咨询

  // 选择案件分类
  onPickerCatelog: function (e) {
    const idx = parseInt(e.detail.value);
    this.setData({
      catelogName: this.data.catelogArray[idx],
      catelogindex: idx,
      catelogid: idx + 1,
    })
  },

  // 输入问题
  onInputQuestion: function (e) {
    this.setData({
      question: e.detail.value
    })
  },

  // 输入联系人
  onInputName: function (e) {
    this.setData({
      contact: e.detail.value
    })
  },

  // 输入手机号码
  onInputPhone: function (e) {
    this.setData({
      mobile: e.detail.value
    })
  },

  // 提交问题
  questionSubmit: function () {
    const d = this.data;
    const catelogid = d.catelogid;
    const strQuestion = d.question;
    const strContract = d.contact;
    const strMobile = d.mobile;

    if (strQuestion == '') {
      this.warning('请输入问题');
      return;
    }

    if (strContract == '') {
      this.warning('请输入联系人');
      return;
    }

    if (strMobile == '') {
      this.warning('请输入手机号码');
      return;
    }

    // 输入控制
    var rExp = new RegExp('^1[3|4|5|8]+[0-9]', 'g');
    if (!rExp.exec(strMobile)) {
      this.warning('请输入正确的手机号码');
      return;
    }
    if (strMobile.length < 11) {
      this.warning('请输入正确的手机号码');
      return;
    }

    console.log('提交问题：' + strQuestion + ' 分类：' + catelogid + ' 联系人：' + strContract + ' 手机号码' + strMobile);
  },

  // 拨打电话
  callContact: function (e) {  //拨打电话
    console.log('callContact');
    wx.makePhoneCall({
      phoneNumber: e.currentTarget.dataset.ponenumber
    })
  },

  /*----------------------------------------------------------------------------------*/

  // 同行互助

  // 选择互助类型
  onPickerHelpType: function (e) {
    const idx = parseInt(e.detail.value);
    this.setData({
      helpTypeName: this.data.helpTypeArray[idx],
      helpindex: idx,
      helpid: idx + 1,
    })
  }, 
  
  // 输入互助内容
  onInputHelpCase: function (e) {
    this.setData({
      helpCaseInfo: e.detail.value
    })
  },

  // 输入联系人
  onInputHelpName: function (e) {
    this.setData({
      helpContact: e.detail.value
    })
  },

  // 输入手机号码
  onInputHelpPhone: function (e) {
    this.setData({
      helpMobile: e.detail.value
    })
  },

  // 提交互助
  helpCaseSubmit: function () {
    const d = this.data;
    const helpid = d.helpid;
    const strHelpCase = d.helpCaseInfo;
    const strContract = d.helpContact;
    const strMobile = d.helpMobile;

    if (strHelpCase == '') {
      this.warning('请输入案件描述');
      return;
    }

    if (strContract == '') {
      this.warning('请输入联系人');
      return;
    }

    if (strMobile == '') {
      this.warning('请输入手机号码');
      return;
    }

    // 输入控制
    var rExp = new RegExp('^1[3|4|5|8]+[0-9]', 'g');
    if (!rExp.exec(strMobile)) {
      this.warning('请输入正确的手机号码');
      return;
    }
    if (strMobile.length < 11) {
      this.warning('请输入正确的手机号码');
      return;
    }

    console.log('提交互助：' + strQuestion + ' 分类：' + catelogid + ' 联系人：' + strContract + ' 手机号码' + strMobile);
  },

  /*----------------------------------------------------------------------------------*/

})  