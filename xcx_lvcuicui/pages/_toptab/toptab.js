// pages/_toptab/toptab.js

var app = getApp()

Page({

  data: {
    navbar: ['案件咨询', '同行互助'],
    currentTab: 0
  },

  tapForTab: function (e) {
    const idx = parseInt(e.currentTarget.dataset.idx);
    this.setData({
      currentTab: idx
    })
  }
})  