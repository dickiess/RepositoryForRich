// pages/help/help.js

import _util_ from './../../utils/util.js';
import _info_ from './../../utils/info.js';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    filterdata: {},     // 下拉菜单选项：字典包数组

    showfilter: false,  // 下拉菜单是否显示？
    showfilterindex: 0, // 下拉菜单选中项索引

    typeindex: 0,       // 互助方式索引
    typeid: 0,          // 互助方式id

    cityindex: 0,       // 地区索引
    cityid: 0,          // 地区id
    subcityindex: 0,    // 城市索引
    subcityid: 0,       // 城市id

    helplist: [],       // 内容列表

    scrolltop: 0,       // 滚动位置
    page: 0,            // 分页

    nowLoading: false,  // 请求保护
  },

  /*----------------------------------------------------------------------------------*/

  onLoad: function (options) {
    this.loadInfo();
  },

  onReady: function () {
    this.fetchData();
  },

  onHide: function () {

  },

  onUnload: function () {
    this.setData({
      filterdata: {},     // 下拉菜单选项：字典包数组

      showfilter: false,  // 下拉菜单是否显示？
      showfilterindex: 0, // 下拉菜单选中项索引

      typeindex: 0,       // 互助方式索引
      typeid: 0,          // 互助方式id

      cityindex: 0,       // 地区索引
      cityid: 0,          // 地区id
      subcityindex: 0,    // 城市索引
      subcityid: 0,       // 城市id

      helplist: [],       // 内容列表

      scrolltop: 0,       // 滚动位置
      page: 0             // 分页
    })
  },

  /*----------------------------------------------------------------------------------*/

  // 滚动事件
  scrollHandle: function (e) {
    this.setData({
      scrolltop: e.detail.scrollTop
    })
  },

  // 滚动加载（上拉添加）
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
      helplist: []
    })
    this.fetchData();
    setTimeout(() => {
      wx.stopPullDownRefresh()
    }, 1000)
  },

  // 分享
  onShareAppMessage: function () {

  },

  /*----------------------------------------------------------------------------------*/

  // 下拉菜单项初始化
  loadInfo: function () {
    this.setData({
      filterdata: {
        // 互助方式
        "type": _info_.getAllHelpArray(),
        // 全国城市
        "city": _info_.getAllCityArray(),
      }
    })
  },

  // 获取服务器数据
  fetchData: function () {

    if (this.data.nowLoading) {
      return;
    }

    wx.showToast({
      title: '加载中',
      icon: 'loading'
    });
    const perpage = 10;
    this.setData({
      page: this.data.page + 1,
      nowLoading: true
    });
    const page = this.data.page;
    const htype = this.data.typeid;
    const scity = this.data.subcityid;

    let that = this;
    // 网络请求
    var url_str = 'https://api.zlsapp.com/SL.php/LawyerHelp/wx_all?ht=' + htype;
    url_str += '&&city=' + scity;
    url_str += '&&p=' + page;
    url_str += '&&pz=' + perpage;
    //console.log("req:" + url_str);
    wx.request({
      url: url_str + '&&jsoncallback=?',
      data: {
        ht: htype,
        city: scity,
        p: page,
        pz: perpage,
      },
      method: 'GET',
      header: {},
      success: function (res) {
        // success
        var len = res.data.length;
        var entity = JSON.parse(res.data.substring(1, len - 1));
        // console.log(entity);

        var message = entity.msg;
        if (message.length > 0) {
          setTimeout(() => {
            that.warning(message);
          }, 1500)
        } else {
          that.deal(entity.obj);
        }
      },
      fail: function () { },
      complete: function () {
        setTimeout(() => {
          that.setData({
            nowLoading: false
          });
        }, 3000)  // 请求保护，防止反复请求
      }
    });
  },

  // 告警
  warning: function (t) {
    wx.showModal({
      title: '提示:',
      content: t,
      showCancel: false,
    })
  },

  // 数据处理
  deal: function (e) {
    var entity = e;

    var newlist = [];
    entity.forEach(function (value, index, array) {
      var item = array[index];
      // console.log(item);
      newlist.push({
        "id": item.id,
        "lid": item.lid,
        "imgurl": "../../images/xinxi.png",
        "title": item.content,
        "subtitle": item.lastname + item.firstname + '律师',
        "tag": _info_.getHelpName(item.type),
        "color": _info_.getHelpColor(item.type),
        "time": _util_.getDateByDouble(item.create_time),
      })
    });

    setTimeout(() => {
      this.setData({
        helplist: this.data.helplist.concat(newlist)
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
    // var sCity = this.data.cityid;
    var sSubcity = _info_.getCityName(this.data.subcityid);
    // console.log('互助方式' + sType + ', 城市：' + sSubcity);
    this.setData({
      page: 0,
      helplist: []
    })
    this.fetchData();
    setTimeout(() => {
      wx.stopPullDownRefresh()
    }, 1000)
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



})