// pages/question/question.js

import _info_ from './../../utils/info.js';

Page({
  data: {
    
    catelogArray: [],   // 案件分类
    catelogName: '',    // 案件分类名称
    catelogindex: 0,    // 案件分类索引
    catelogid: 0,       // 案件分类id

    question: '',       // 咨询问题
    contact: '',        // 联系人
    mobile: '',         // 手机号码
  },

  /*----------------------------------------------------------------------------------*/

  // 加载数据
  onLoad: function () {
    //console.log('onLoad');
    this.loadInfo();
  },

  // 下拉菜单项初始化
  loadInfo: function () {
    var arr = _info_.getCatelogArray();
    arr.splice(0, 1); // 取出其中的全部项（0位置的1个数据）
    this.setData({
      catelogArray: arr
    })
  },

  /*----------------------------------------------------------------------------------*/
  
  // 选择分类返回
  onPickerCatelog: function (e) {
    const idx = parseInt(e.detail.value);
    this.setData({
      catelogName: this.data.catelogArray[idx],
      catelogindex: idx,
      catelogid: idx + 1,
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

  // 输入问题
  onInputQuestion:function(e) {
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

  /*----------------------------------------------------------------------------------*/

  // 提交问题
  questionSubmit: function () {
    // console.log('questionSubmit');
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
    if (! rExp.exec(strMobile)) {
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
  }
})
