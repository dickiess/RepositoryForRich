// pages/tool/tool_1.js

import _info_ from '../../../utils/info.js';

Page({
  data: {

    regionArray: [],    // 地区数组
    regionName: '',     // 地区名称
    regionindex: 0,     // 地区索引
    regionid: 0,        // 地区id

    catelogArray: [],   // 分类数组
    catelogName: '',    // 分类名称
    catelogindex: 0,    // 分类索引
    catelogid: 0,       // 分类id

    moneyNumber: null,  // 输入金额
    moneyRange: '',     // 输入金额范围
    showResult: false   // 显示结果
  },

  /*----------------------------------------------------------------------------------*/

  // 生命周期函数--监听页面加载
  onLoad: function (options) {
    this.loadInfo();
  },

  // 初始化
  loadInfo: function () {
    this.setData({
      regionArray: ["北京", "上海", "广东", "江苏", "浙江", "安徽", "福建"],
      catelogArray: ["民事案件", "刑事案件", "行政案件"],
    })
  },

  /*----------------------------------------------------------------------------------*/

  // 点击输入金额
  onMoneyInput: function (e) {
    var moneyValue = e.detail.value;
    // 输入控制
    if (moneyValue.length == 1) {
      moneyValue = moneyValue.replace(/[^1-9]/g, '');
    } else {
      moneyValue = moneyValue.replace(/\D/g, '');
    }

    // console.log(moneyValue);
    this.setData({
      moneyNumber: moneyValue,
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

  // 地区选择
  onPickerRegion: function (e) {
    const idx = parseInt(e.detail.value);
    this.setData({
      regionName: this.data.regionArray[idx],
      regionindex: idx,
      regionid: idx + 1,
    })
  },

  // 分类选择
  onPickerCatelog: function (e) {
    const idx = parseInt(e.detail.value);
    this.setData({
      catelogName: this.data.catelogArray[idx],
      catelogindex: idx,
      catelogid: idx + 1,
    })
  },

  /*----------------------------------------------------------------------------------*/

  // 点击（按钮）事件

  // 重置
  tapForReset:function () {
    this.setData({
      regionName: '',     // 地区名称
      regionindex: 0,     // 地区索引
      regionid: 0,        // 地区id

      catelogName: '',    // 分类名称
      catelogindex: 0,    // 分类索引
      catelogid: 0,       // 分类id

      moneyNumber: null,  // 输入金额
      moneyRange: '',     // 输入金额范围
      showResult: false   // 显示结果
    })
  },

  // 提交
  tapForSubmit: function () {
    var that = this;
    that.setData({
      showResult: false
    })

    const sRegion = parseInt(this.data.regionid);
    if (sRegion == 0) {
      this.warning('请输入地区');
      return;
    }

    const sCatelog = parseInt(this.data.catelogid);
    if (sCatelog == 0) {
      this.warning('请输入类型');
      return;
    }

    const sMoney = this.data.moneyNumber;
    if (!sMoney) {
      this.warning('请输入案件金额');
      return;
    }

    // 输入控制
    if (sMoney <= 10000) {
      that.setData({
        showResult: true,
        moneyRange: '3000元'
      });
      return;
    }

    that.setData({
      showResult: true,
      moneyRange: this.calculate(sRegion, sCatelog, sMoney)
    })
  },

  // 查看政府文告
  tapForRead: function () {
    var strUrl = '../../tool/issue/issue?';
    const regionArray = ['nm','bj', 'sh', 'gd', 'js', 'zj', 'ah', 'fj'];
    var filepath = 'lvshifei_' + regionArray[this.data.regionid] + '.html';
    var serverpath = 'https://api.zlsapp.com/UP/Documents/';
    strUrl += 'title=' + this.data.regionName + '律师费计算&&';
    strUrl += 'url=' + serverpath + filepath;
    wx.navigateTo({
      url: strUrl
    })
  },

  /*----------------------------------------------------------------------------------*/

  // 计算逻辑

  // 计算
  calculate: function (_region, _catelog, _money) {
    if (_catelog == 1) {
      return this.minshi(_region, _money) + '元';
    } else if (_catelog == 2) {
      return this.xingshi(_region, _money) + '元';
    } else if (_catelog == 3) {
      return this.xingzheng(_region, _money) + '元';
    }
    return "Error";
  },

  // 民事
  minshi: function (_region, _money) {
    var minSet = _money / 100;   // 先除以100
    var maxSet = _money / 100;

    switch (_region) {
      /*
       北京律师费民事计算
       收费不足3k        3k
       10w以下(含)       10%
       100w以下(含)      6%
       1000w以下(含)     4%
       1y以下(含)        2%
       1y以上            2%
       
       **/
      case 1: {

        if ((minSet / 100) <= 10) {
          minSet *= 10;
          maxSet *= 10;
        } else if ((minSet / 100) <= 100) {
          minSet *= 6;
          maxSet *= 6;
        } else if ((minSet / 100) <= 1000) {
          minSet *= 4;
          maxSet *= 4;
        } else if ((minSet / 100) <= 10000) {
          minSet *= 2;
          maxSet *= 2;
        } else {
          minSet /= 2;
          maxSet *= 2;
        }

        minSet = minSet <= 3000 ? 3000 : minSet;
        maxSet = maxSet <= 3000 ? 3000 : maxSet;

      } break;


      /*
       上海律师费计算
       收费不足3k        3k
       10w以下(含)       8-12%
       100w以下(含)      5-7%
       1000w以下(含)     3-5%
       1y以下(含)        1-3%
       1y以上            0.5-1%
       
       **/
      case 2: {
        if ((minSet / 100) <= 10) {
          minSet *= 8;
          maxSet *= 12;
        } else if ((minSet / 100) <= 100) {
          minSet *= 5;
          maxSet *= 7;
        } else if ((minSet / 100) <= 1000) {
          minSet *= 3;
          maxSet *= 5;
        } else if ((minSet / 100) <= 10000) {
          minSet *= 1;
          maxSet *= 3;
        } else {
          minSet /= 2;
          maxSet *= 1;
        }

        minSet = minSet <= 3000 ? 3000 : minSet;
        maxSet = maxSet <= 3000 ? 3000 : maxSet;

      } break;


      /*
       广东律师费计算
       1000元基本费用
       10w以下(含)       8%
       50w以下(含)       5%
       100w以下(含)      4%
       500w以下(含)      3%
       1000w以下(含)     2%
       5000w以下(含)     1%
       5000w以上         0.5%
       
       **/
      case 3: {

        if ((minSet / 100) <= 10) {
          minSet *= 8;
          maxSet *= 8;
        } else if ((minSet / 100) <= 50) {
          minSet *= 5;
          maxSet *= 5;
        } else if ((minSet / 100) <= 100) {
          minSet *= 4;
          maxSet *= 4;
        } else if ((minSet / 100) <= 500) {
          minSet *= 3;
          maxSet *= 3;
        } else if ((minSet / 100) <= 1000) {
          minSet *= 2;
          maxSet *= 2;
        } else if ((minSet / 100) <= 5000) {
          minSet *= 1;
          maxSet *= 1;
        } else {
          minSet /= 2;
          maxSet /= 2;
        }

        minSet += 1000;
        maxSet += 1000;

      } break;


      /*
       江苏律师费计算
       收费不足2.5k      2.5k
       10w以下(含)       4-7%
       50w以下(含)       3-6%
       100w以下(含)      2.5-5%
       500w以下(含)      2-4%
       1000w以下(含)     1.5-3%
       1y以下(含)        0.7-2%
       1y以上            0.5%
       
       **/
      case 4: {

        if ((minSet / 100) <= 10) {
          minSet = minSet * 4;
          maxSet = minSet * 7;
        } else if ((minSet / 100) <= 50) {
          minSet = minSet * 3;
          maxSet = minSet * 6;
        } else if ((minSet / 100) <= 100) {
          minSet = minSet * 2.5;
          maxSet = minSet * 5;
        } else if ((minSet / 100) <= 500) {
          minSet = minSet * 2;
          maxSet = minSet * 4;
        } else if ((minSet / 100) <= 1000) {
          minSet = minSet * 1.5;
          maxSet = minSet * 3;
        } else if ((minSet / 100) <= 10000) {
          minSet = minSet * 0.7;
          maxSet = minSet * 2;
        } else {
          minSet = minSet * 0.5;
          maxSet = minSet * 0.5;
        }

        minSet = minSet <= 2500 ? 2500 : minSet;
        maxSet = maxSet <= 2500 ? 2500 : maxSet;

      } break;


      /*
       浙江律师费计算
       收费不足1.5k      1.5k
       10w以下(含)       4.8-6.4%
       50w以下(含)       4-4.8%
       100w以下(含)      3.2-4%
       500w以下(含)      2.4-3.2%
       1000w以下(含)     1.6-2.4%
       1000w以上         0.8-1.6%
       
       **/
      case 5: {

        if ((minSet / 100) <= 10) {
          minSet = minSet * 4.8;
          maxSet = minSet * 6.4;
        } else if ((minSet / 100) <= 50) {
          minSet = minSet * 4;
          maxSet = minSet * 4.8;
        } else if ((minSet / 100) <= 100) {
          minSet = minSet * 3.2;
          maxSet = minSet * 4;
        } else if ((minSet / 100) <= 500) {
          minSet = minSet * 2.4;
          maxSet = minSet * 3.2;
        } else if ((minSet / 100) <= 1000) {
          minSet = minSet * 1.6;
          maxSet = minSet * 2.4;
        } else {
          minSet = minSet * 0.8;
          maxSet = minSet * 1.6;
        }

        minSet = minSet <= 1500 ? 1500 : minSet;
        maxSet = maxSet <= 1500 ? 1500 : maxSet;

      } break;


      /*
       安徽律师费计算
       1000元基本费用
       10w以下(含)       0%
       50w以下(含)       4-6%
       100w以下(含)      3-5%
       500w以下(含)      2-4%
       1000w以下(含)     1-3%
       1000w以上         1-2%
       
       **/
      case 6: {

        if ((minSet / 100) <= 10) {
          minSet = 0;
          maxSet = 0;
        } else if ((minSet / 100) <= 50) {
          minSet = minSet * 4;
          maxSet = minSet * 6;
        } else if ((minSet / 100) <= 100) {
          minSet = minSet * 3;
          maxSet = minSet * 5;
        } else if ((minSet / 100) <= 500) {
          minSet = minSet * 2;
          maxSet = minSet * 4;
        } else if ((minSet / 100) <= 1000) {
          minSet = minSet * 1;
          maxSet = minSet * 3;
        } else {
          minSet = minSet * 1;
          maxSet = minSet * 2;
        }

        minSet += 1000;
        maxSet += 1000;

      } break;


      /*
       福建律师费计算
       10w以下(含)       800
       50w以下(含)       4%
       100w以下(含)      3%
       500w以下(含)      2%
       1000w以下(含)     1.2%
       5000w以下(含)     0.7%
       5000w以上         0.5%
       
       **/
      case 7: {

        if ((minSet / 100) <= 10) {
          minSet = 0;
          maxSet = 0;
        } else if ((minSet / 100) <= 50) {
          minSet = minSet * 4;
          maxSet = minSet * 4;
        } else if ((minSet / 100) <= 100) {
          minSet = minSet * 3;
          maxSet = minSet * 3;
        } else if ((minSet / 100) <= 500) {
          minSet = minSet * 2;
          maxSet = minSet * 2;
        } else if ((minSet / 100) <= 1000) {
          minSet = minSet * 1.2;
          maxSet = minSet * 1.2;
        } else if ((minSet / 100) <= 5000) {
          minSet = minSet * 0.7;
          maxSet = minSet * 0.7;
        } else {
          minSet = minSet * 0.5;
          maxSet = minSet * 0.5;
        }

        minSet += 800;
        maxSet += 800;

      } break;

      default: break;
    }

    minSet = parseInt(minSet);
    maxSet = parseInt(maxSet);

    return maxSet > minSet ? minSet + '~' + maxSet : maxSet;
  },

  // 刑事
  xingshi: function (_region, _money) {

    var set1 = {
      'minSet': 0,
      'maxSet': 0,
      'process': '侦查阶段: '
    }

    var set2 = {
      'minSet': 0,
      'maxSet': 0,
      'process': '审查起诉阶段: '
    }

    var set3 = {
      'minSet': 0,
      'maxSet': 0,
      'process': '一审阶段: '
    }

    switch (_region) {
      /*
       北京律师费刑事计算
       侦查阶段       2000-10000元
       审查起诉阶段    2000-10000元
       一审阶段       4000-30000元
       
       **/
      case 1: {

        set1.minSet = 2000;
        set1.maxSet = 10000;

        set2.minSet = 2000;
        set2.maxSet = 10000;

        set3.minSet = 4000;
        set3.maxSet = 30000;

      } break;

      /*
       上海律师费刑事计算
       侦查阶段       1500-10000元
       审查起诉阶段    2000-10000元
       一审阶段       3000-30000元
       
       **/
      case 2: {

        set1.minSet = 1500;
        set1.maxSet = 10000;

        set2.minSet = 2000;
        set2.maxSet = 10000;

        set3.minSet = 3000;
        set3.maxSet = 30000;

      } break;

      /*
       广东律师费刑事计算
       侦查阶段       2000-6000元
       审查起诉阶段    6000-16000元
       一审阶段       6000-33000元
       
       **/
      case 3: {

        set1.minSet = 2000;
        set1.maxSet = 6000;

        set2.minSet = 6000;
        set2.maxSet = 16000;

        set3.minSet = 6000;
        set3.maxSet = 33000;

      } break;

      /*
       江苏律师费刑事计算
       侦查阶段       1000-8000元
       审查起诉阶段    1500-10000元
       一审阶段       2500-20000元
       
       **/
      case 4: {

        set1.minSet = 1000;
        set1.maxSet = 8000;

        set2.minSet = 1500;
        set2.maxSet = 10000;

        set3.minSet = 2500;
        set3.maxSet = 20000;

      } break;

      /*
       浙江律师费刑事计算
       侦查阶段       1500-8000元
       审查起诉阶段    1500-10000元
       一审阶段       2500-25000元
       
       **/
      case 5: {

        set1.minSet = 1500;
        set1.maxSet = 8000;

        set2.minSet = 1500;
        set2.maxSet = 10000;

        set3.minSet = 2500;
        set3.maxSet = 25000;

      } break;

      /*
       安徽律师费刑事计算
       侦查阶段       1200-8000元
       审查起诉阶段    1200-8000元
       一审阶段       1200-15000元
       
       **/
      case 6: {

        set1.minSet = 1200;
        set1.maxSet = 8000;

        set2.minSet = 1200;
        set2.maxSet = 8000;

        set3.minSet = 1200;
        set3.maxSet = 15000;

      } break;

      /*
       福建律师费刑事计算
       侦查阶段       1000-5000元
       审查起诉阶段    1000-6000元
       一审阶段       1500-12000元
       
       **/
      case 7: {

        set1.minSet = 1000;
        set1.maxSet = 5000;

        set2.minSet = 1000;
        set2.maxSet = 6000;

        set3.minSet = 1500;
        set3.maxSet = 12000;

      } break;

      default: break;
    }

    var str1 = set1.maxSet > set1.minSet ? set1.minSet + '~' + set1.maxSet : set1.maxSet;
    var str2 = set2.maxSet > set2.minSet ? set2.minSet + '~' + set2.maxSet : set2.maxSet;
    var str3 = set3.maxSet > set3.minSet ? set3.minSet + '~' + set3.maxSet : set3.maxSet;
    return set1.process + str1.toString() + "元\n"
      + set2.process + str2.toString() + "元\n"
      + set3.process + str3.toString();
  },

  // 行政
  xingzheng: function (_region, _money) {
    var minSet = 0;
    var maxSet = 0;

    switch (_region) {
      /*
       北京律师费行政计算
       3000-10000
       
       **/
      case 0: {
        minSet = 3000;
        maxSet = 10000;
      } break;

      /*
       上海律师费计算
       3000-12000
       
       **/
      case 1: {
        minSet = 3000;
        maxSet = 12000;
      } break;

      /*
       广东律师费计算
       3000-20000
       
       **/
      case 2: {
        minSet = 3000;
        maxSet = 20000;
      } break;

      /*
       江苏律师费计算
       2500－10000
       
       **/
      case 3: {
        minSet = 2500;
        maxSet = 10000;
      } break;

      /*
       浙江律师费计算
       2500-10000
       
       **/
      case 4: {
        minSet = 2500;
        maxSet = 10000;
      } break;

      /*
       安徽律师费计算
       1000－8000
       
       **/
      case 5: {
        minSet = 1000;
        maxSet = 8000;
      } break;

      /*
       福建律师费计算
       800-6000
       
       **/
      case 6: {
        minSet = 800;
        maxSet = 6000;
      } break;

      default: break;
    }

    return maxSet > minSet ? minSet + '~' + maxSet : maxSet;
  },

})