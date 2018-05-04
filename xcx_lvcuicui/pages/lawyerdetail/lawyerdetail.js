// pages/lawyerdetail/lawyerdetail.js

import _util_ from './../../utils/util.js';
import _info_ from './../../utils/info.js';

Page({

  data: {
    details: [],
    name: '',       // 律师姓名
    platform: '',   // 平台编号
    mobile: '',     // 联系方式
    citycode: '',   // 城市编号
    loc_lang: '',   // 工作方言
    office: '',     // 所属律所
    identify: '',   // 执业证号
  },

  onLoad: function (options) {
    this.fakeData();
    this.updateData();
  },

  // 分享
  onShareAppMessage: function () {

  },

  // 初始数据
  fakeData: function () {
    this.setData({
      name: '张三',                     // 律师姓名
      platform: '100001',              // 平台编号
      mobile: '13913913139',           // 联系方式
      citycode: '321',                 // 城市编号
      loc_lang: '上海方言',             // 工作方言
      office: '上海瀛东律师事务所',      // 所属律所
      identify: '112233445566778899',  // 执业证号
    })
  },

  // 更新数据
  updateData: function () {
    var that = this;
    that.setData({
      details: [
        { 'title': '律师姓名', 'content': this.data.name },
        { 'title': '平台编号', 'content': this.data.platform },
        { 'title': '联系方式', 'content': this.data.mobile },
        { 'title': '所在城市', 'content': _info_.getCityName(parseInt(this.data.citycode)) },
        { 'title': '工作方言', 'content': this.data.loc_lang },
        { 'title': '所属律所', 'content': this.data.office },
        { 'title': '执业证号', 'content': this.data.identify },
      ]
    })
  }



})