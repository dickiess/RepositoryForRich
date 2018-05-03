// pages/tool/tool.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    toollist: [],

    array: ['美国', '中国', '巴西', '日本'],
    objectArray: [
      {
        id: 0,
        name: '美国'
      },
      {
        id: 1,
        name: '中国'
      },
      {
        id: 2,
        name: '巴西'
      },
      {
        id: 3,
        name: '日本'
      }
    ],
    index: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.loadInfo();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },

  // 列表初始化
  loadInfo: function () {
    var item1 = {
      'id': 1,
      'title': '律师费计算',
      'imgUrl': '../../images/icon_26.png',
      'url':  '../tool/tool_1/tool_1',
    };
    var item2 = {
      'id': 2,
      'title': '诉讼费计算',
      'imgUrl': '../../images/icon_26.png',
      'url': '../tool/tool_2/tool_2',
    };

    var arr = [];
    arr.push(item1);
    arr.push(item2);
    
    this.setData({
      toollist: arr
    });
  },
  
})