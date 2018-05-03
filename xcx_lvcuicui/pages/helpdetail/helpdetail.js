// pages/helpdetail/helpdetail.js

import _util_ from './../../utils/util.js';
import _info_ from './../../utils/info.js';

Page({
  data: {
    caseid: 0,
    helpdetail: {},

    nowLoading: false,  // 请求保护
  },

  onLoad: function (options) {
    this.setData({
      caseid: options.id
    })
  },

  onReady: function () {
    this.fetchData();
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

    let that = this;
    // 网络请求
    var url_str = 'https://api.zlsapp.com/SL.php/LawyerHelp/wx_detail?id=' + that.data.caseid;
    console.log("req:" + url_str);
    wx.request({
      url: url_str + '&&jsoncallback=?',
      data: {
        id: that.data.caseid
      },
      method: 'GET',
      header: {},
      success: function (res) {
        // success
        var len = res.data.length;
        var entity = JSON.parse(res.data.substring(1, len - 1));
        console.log(entity);

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

  // 数据处理
  deal: function (e) {
    var entity = e[0];
    this.setData({
      helpdetail: {
        'title': entity.content,
        'tag': _info_.getHelpName(entity.type),
        'color': _info_.getHelpColor(entity.type),
        'subtitle': entity.lastname + entity.firstname + '律师',
      }
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





})