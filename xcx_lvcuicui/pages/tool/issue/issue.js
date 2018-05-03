// pages/tool/issue/issue.js
Page({

  data: {
    'title': '',
    'url': ''
  },

  onLoad: function (options) {
    var pages = getCurrentPages();             // 获取加载的页面
    var currentPage = pages[pages.length - 1]; // 获取当前页面的对象
    var url = currentPage.route;               // 当前页面url
    var options = currentPage.options;         // 如果要获取url中所带的参数可以查看options
    console.log(options);
    this.setData({
      title: options.title,
      url: options.url
    })
  },

  onReady: function () {
    
  },

})