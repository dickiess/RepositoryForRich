// pages/tool/tool_2.js

import _info_ from '../../../utils/info.js';

Page({
  data: {

    catelogArray: [],   // 分类数组
    catelogName: '',    // 分类名称
    catelogindex: 0,    // 分类索引
    catelogid: 0,       // 分类id

    fortrunArray: [],   // 财产数组
    fortrunYes: '',     // 是否涉及财产
    fortrunindex: 0,    // 地区索引
    fortrunid: 0,       // 地区id

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
      catelogArray: ["财产案件", "普通非财产案件", "离婚案件", "人格权案件",
        "知识产权案件", "劳动争议案件", "行政案件", "商标专利案件", "管辖权异议案件"],
      fortrunArray: ["是", "否"],
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

  // 分类选择
  onPickerCatelog: function (e) {
    const idx = parseInt(e.detail.value);
    this.setData({
      catelogName: this.data.catelogArray[idx],
      catelogindex: idx,
      catelogid: idx + 1,
    });
  },

  // 财产涉及
  onPickerFortrun: function (e) {
    const idx = parseInt(e.detail.value);
    this.setData({
      fortrunYes: this.data.fortrunArray[idx],
      fortrunindex: idx,
      fortrunid: idx + 1,
    });
  },

  /*----------------------------------------------------------------------------------*/

  // 点击（按钮）事件

  // 重置
  tapForReset: function () {
    this.setData({

      catelogName: '',    // 分类名称
      catelogindex: 0,    // 分类索引
      catelogid: 0,       // 分类id

      fortrunYes: '',     // 是否涉及财产
      fortrunindex: 0,    // 地区索引
      fortrunid: 0,       // 地区id

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

    const sCatelog = parseInt(this.data.catelogid);
    if (sCatelog == 0) {
      this.warning('请输入类型');
      return;
    }

    var sFortrun = parseInt(this.data.fortrunid);
    if (sFortrun == 0) {
      this.warning('请选择财产');
      return;
    }
    sFortrun = sFortrun == 1 ? 1 : 0;

    const sMoney = this.data.moneyNumber;
    if (!sMoney) {
      if (sFortrun == 1) {
        this.warning('请输入案件金额');
        return;
      }
    }

    that.setData({
      showResult: true,
      moneyRange: this.calculate(sCatelog, sFortrun, sMoney)
    })
  },

  // 查看政府文告
  tapForRead: function () {
    var strUrl = '../../tool/issue/issue?';
    var filepath = 'susongfei.html';
    var serverpath = 'https://api.zlsapp.com/UP/Documents/';
    strUrl += 'title=诉讼费计算&&';
    strUrl += 'url=' + serverpath + filepath;
    wx.navigateTo({
      url: strUrl
    })
  },

  /*----------------------------------------------------------------------------------*/

  // 计算逻辑

  // 计算
  calculate: function (_catelog, _fortrun, _money) {
    if (_fortrun) {
      return this.caichan(_catelog, _money) + '元';
    }
    // 非财产类不显示金额
    this.setData({
      moneyNumber: 0,     // 输入金额
      moneyRange: '',     // 输入金额范围
    })
    return this.feicai(_catelog) + '元';
  },

  // 财产类
  caichan: function (_catelog, _money) {
    
    // 万元级分类
    var minSet = parseInt(_money / 10000);
    var maxSet = parseInt(_money / 10000);
    
    switch (_catelog) {
      // 财产案件
      case 1: {
        if (minSet < 1) {
          minSet = 50;
          maxSet = 50;
        } else if (minSet < 10) {
          minSet *= 250;
          maxSet *= 250;
        } else if (minSet < 20) {
          minSet *= 200;
          maxSet *= 200;
        } else if (minSet < 50) {
          minSet *= 150;
          maxSet *= 150;
        } else if (minSet < 100) {
          minSet *= 100;
          maxSet *= 100;
        } else if (minSet < 200) {
          minSet *= 90;
          maxSet *= 90;
        } else if (minSet < 500) {
          minSet *= 80;
          maxSet *= 80;
        } else if (minSet < 1000) {
          minSet *= 70;
          maxSet *= 70;
        } else if (minSet < 2000) {
          minSet *= 60;
          maxSet *= 60;
        } else if (minSet >= 2000) {
          minSet *= 50;
          maxSet *= 50;
        }
      } break;

      // 普通非财产案件
      case 2: {
        minSet = 50;
        maxSet = 100;
      } break;

      // 离婚案件
      case 3: {
        minSet = 50;
        maxSet = (maxSet > 20) ? (maxSet - 20) * 50 : 300;
      } break;

      // 人格权案件
      case 4: {
        minSet = 100;
        if (maxSet > 5 && maxSet <= 10) {
          maxSet = (maxSet - 5) * 100;
        } else if (maxSet >= 10) {
          maxSet = (maxSet - 10) * 50;
        }
      } break;

      // 知识产权案件
      case 5: {
        if (minSet < 1) {
          minSet = 500;
          maxSet = 1000;
        } else if (minSet < 10) {
          minSet *= 250;
          maxSet *= 250;
        } else if (minSet < 20) {
          minSet *= 200;
          maxSet *= 200;
        } else if (minSet < 50) {
          minSet *= 150;
          maxSet *= 150;
        } else if (minSet < 100) {
          minSet *= 100;
          maxSet *= 100;
        } else if (minSet < 200) {
          minSet *= 90;
          maxSet *= 90;
        } else if (minSet < 500) {
          minSet *= 80;
          maxSet *= 80;
        } else if (minSet < 1000) {
          minSet *= 70;
          maxSet *= 70;
        } else if (minSet < 2000) {
          minSet *= 60;
          maxSet *= 60;
        } else if (minSet >= 2000) {
          minSet *= 50;
          maxSet *= 50;
        }
      } break;

      // 劳动争议案件
      case 6: {
        minSet = 10;
        maxSet = 10;
      } break;

      // 行政案件
      case 7: {
        minSet = 100;
        maxSet = 100;
      } break;

      // 商标专利案件
      case 8: {
        minSet = 100;
        maxSet = 100;
      } break;

      // 管辖权异议案件
      case 9: {
        minSet = 50;
        maxSet = 100;
      } break;

      default: break;
    }

    minSet = parseInt(minSet);
    maxSet = parseInt(maxSet);
    return maxSet > minSet ? minSet + '~' + maxSet : maxSet;
  },

  // 非财产类
  feicai: function (_catelog) {

    var minSet = 0;
    var maxSet = 0;

    switch (_catelog) {
      // 财产案件
      case 1: {
        minSet = 50;
        maxSet = 50;
      } break;

      // 普通非财产案件
      case 2: {
        minSet = 50;
        maxSet = 100;
      } break;

      // 离婚案件
      case 3: {
        minSet = 50;
        maxSet = 300;
      } break;

      // 人格权案件
      case 4: {
        minSet = 100;
        maxSet = 500;
      } break;

      // 知识产权案件
      case 5: {
        minSet = 500;
        maxSet = 1000;
      } break;

      // 劳动争议案件
      case 6: {
        minSet = 10;
        maxSet = 10;
      } break;

      // 行政案件
      case 7: {
        minSet = 100;
        maxSet = 100;
      } break;

      // 商标专利案件
      case 8: {
        minSet = 100;
        maxSet = 100;
      } break;

      // 管辖权异议案件
      case 9: {
        minSet = 50;
        maxSet = 100;
      } break;

      default: break;
    }

    minSet = parseInt(minSet);
    maxSet = parseInt(maxSet);
    return maxSet > minSet ? minSet + '~' + maxSet : maxSet;
  },



})