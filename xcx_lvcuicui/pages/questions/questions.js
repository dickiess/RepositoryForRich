// pages/questions/questions.js

import _info_ from './../../utils/info.js';

Page({
  data: {
    filterdata: {},     // 下拉菜单选项：字典包数组

    showfilter: false,  // 下拉菜单是否显示？
    showfilterindex: 0, // 下拉菜单选中项索引

    typeindex: 0,       // 案件分类索引
    typeid: 0,          // 案件分类id

    moneyindex: 0,      // 涉案金额索引
    moneyid: 0,         // 涉案金额id

    cityindex: 0,       // 地区索引
    cityid: 0,          // 地区id
    subcityindex: 0,    // 城市索引
    subcityid: 0,       // 城市id

    servicelist: [],    // 内容列表

    scrolltop: 0,       // 滚动位置
    page: 0             // 分页
  },

  /*----------------------------------------------------------------------------------*/

  // 加载数据
  onLoad: function () {
    this.loadInfo();
    this.fetchData();
  },

  // 下拉菜单项初始化
  loadInfo: function () {
    this.setData({
      filterdata: {
        // 案件分类
        "type": _info_.getAllCatelogArray(),
        // 涉案金额
        "money": _info_.getAllMoneyArray(),
        // 全国城市
        "city": _info_.getAllCityArray(),
      }
    })
  },

  // 获取服务器数据
  fetchData: function () {
    let that = this;
    wx.showToast({
      title: '加载中',
      icon: 'loading'
    })
    const perpage = 10;
    this.setData({
      page: this.data.page + 1
    })
    const page = this.data.page;
    const newlist = [];
    for (var i = (page - 1) * perpage; i < page * perpage; i++) {
      newlist.push({
        "id": i + 1,
        "imgurl": "../../images/xinxi.png",
        "title": "法律咨询上海拜特信息技术有限公司法律咨询上海拜特信息技术有限公司法律咨询上海拜特信息技术有限公司法律咨询上海拜特信息技术有限公司法律咨询上海拜特信息技术有限公司法律咨询上海拜特信息技术有限公司法律咨询上海拜特信息技术有限公司法律咨询上海拜特信息技术有限公司法律咨询上海拜特信息技术有限公司法律咨询上海拜特信息技术有限公司法律咨询上海拜特信息技术有限公司法律咨询" + (i + 1),
        "subtitle": "上海·100万以下",
        "tag": "法律咨询",
        "time": "2018-1-8 12:12"
      })
    }
    setTimeout(() => {
      that.setData({
        servicelist: that.data.servicelist.concat(newlist)
      })
    }, 1500)
  },

  /*----------------------------------------------------------------------------------*/

  // 选择案件分类
  setType: function (e) {
    const d = this.data;
    const dataset = e.currentTarget.dataset;
    this.setData({
      typeindex: dataset.typeindex,
      typeid: dataset.typeid
    })
    // console.log('案件分类' + this.data.typeid);
    this.hideFilter();
  },

  // 选择涉案金额
  setMoney: function (e) {
    const d = this.data;
    const dataset = e.currentTarget.dataset;
    this.setData({
      moneyindex: dataset.moneyindex,
      moneyid: dataset.moneyid
    })
    // console.log('涉案金额' + this.data.moneyid);
    this.hideFilter();
  },

  // 选择地区
  setCityIndex: function (e) {
    const d = this.data;
    const dataset = e.currentTarget.dataset;
    this.setData({
      cityindex: dataset.cityindex,
      cityid: dataset.cityid,
      subcityindex: d.cityindex == dataset.cityindex ? d.subcityindex : 0
    })
    //console.log('地区：' + this.data.cityid + ',城市：' + this.data.subcityid);
  },

  // 选择城市
  setSubcityIndex: function (e) {
    const dataset = e.currentTarget.dataset;
    this.setData({
      subcityindex: dataset.subcityindex,
      subcityid: dataset.subcityid,
    })
    //console.log('地区：' + this.data.cityid + ',城市：' + this.data.subcityid);
    this.hideFilter();
  },

  // 设置改变
  onSettingChanged: function () {
    var sType = this.data.typeid;
    var sMoney = this.data.moneyid;
    // var sCity = this.data.cityid;
    var sSubcity = _info_.getCityName(this.data.subcityid);
    console.log('案件分类' + sType + ', 涉案金额' + sMoney + ', 城市：' + sSubcity);
  },

  /*----------------------------------------------------------------------------------*/

  // 下拉菜单显示
  setFilterPanel: function (e) {
    const d = this.data;
    const i = e.currentTarget.dataset.findex;
    if (d.showfilterindex == i) {
      this.setData({
        showfilter: false,
        showfilterindex: null
      })
    } else {
      this.setData({
        showfilter: true,
        showfilterindex: i,
      })
    }
    //console.log('显示列表' + d.showfilterindex);
  },

  // 下拉菜单收起
  hideFilter: function (e) {
    this.onSettingChanged();
    this.setData({
      showfilter: false,
      showfilterindex: null
    })
  },

  /*----------------------------------------------------------------------------------*/

  // 滚动事件
  scrollHandle: function (e) {
    this.setData({
      scrolltop: e.detail.scrollTop
    })
  },

  // 滚动加载
  scrollLoading: function () {
    this.fetchData();
  },

  // 回到顶部
  goToTop: function () {
    this.setData({
      scrolltop: 0
    })
  },

  // 下拉刷新
  onPullDownRefresh: function () {
    this.setData({
      page: 0,
      servicelist: []
    })
    this.fetchData();
    setTimeout(() => {
      wx.stopPullDownRefresh()
    }, 1000)
  }
})