// info.js

// 产品所需的应用枚举

/*----------------------------------------------------------------------------------*/

// 主题色调
function get_theme_color() {
  var theme_color = {
    'background':   '#666',       // 灰
    'navigation':   '#0d6fb8',    // 蓝
    'separate_line':'#ddd',       // 分隔线
    'text_nomal':   '#888',       // 文字灰
    'text_outline': '#f7982a',    // 橙
  }
  return theme_color;
}

/*----------------------------------------------------------------------------------*/

// 添加对象
function add_item(id, title) {
  return {
    "id": id,
    "title": title
  };
}

/*----------------------------------------------------------------------------------*/

// 所有的案件分类
function get_catelog_array() {
  return ["全部",
    "婚姻家庭", "遗产继承", "房屋拆迁", "房产买卖", "劳动人事",
    "保险理赔", "债权纠纷", "医疗纠纷", "交通事故", "知识产权",
    "股权纠纷", "公司合同", "刑事案件", "涉外事务", "其他"];
}

// 案件分类名称
function get_catelog_name(index) {
  return get_catelog_array()[index];
}

// 所有分类对象
function get_catelog_dictionary_array() {
  var array = get_catelog_array();
  var new_array = [];
  array.forEach(function (value, index, array) {
    var dict = add_item(index, array[index]);
    new_array.push(dict);
  });
  return new_array;
}

/*----------------------------------------------------------------------------------*/

// 所有的金额
function get_money_array() {
  return ["不限", "10万以下", "10-100万", "100-1000万", "1000万以上"];
}

// 涉案金额名称
function get_money_name(index) {
  return get_money_array()[index];
}

// 所有金额对象
function get_money_dictionary_array() {
  var array = get_money_array();
  var new_array = [];
  array.forEach(function (value, index, array) {
    var dict = add_item(index, array[index]);
    new_array.push(dict);
  });
  return new_array;
}

/*----------------------------------------------------------------------------------*/

// 城市名称
function get_city_name(index) {
  var idx = index;
  var arr = [];
  arr.push(add_item(0, "全国"));
  arr.push(add_item(52, "北京"));
  arr.push(add_item(321, "上海"));
  arr.push(add_item(77, "深圳"));
  arr.push(add_item(76, "广州"));
  arr.push(add_item(343, "天津"));
  arr.push(add_item(394, "重庆"));
  arr.push(add_item(395, "香港"));
  arr.push(add_item(396, "澳门"));
  arr.push(add_item(397, "台北"));
  arr.push(add_item(220, "南京"));
  arr.push(add_item(221, "苏州"));
  arr.push(add_item(383, "杭州"));
  arr.push(add_item(391, "温州"));
  arr.push(add_item(399, "慈溪"));
  arr.push(add_item(53, "福州"));
  arr.push(add_item(60, "厦门"));
  arr.push(add_item(96, "珠海"));
  arr.push(add_item(244, "沈阳"));
  arr.push(add_item(138, "石家庄"));
  arr.push(add_item(149, "郑州"));
  arr.push(add_item(283, "济南"));
  arr.push(add_item(300, "太原"));
  arr.push(add_item(180, "武汉"));
  arr.push(add_item(197, "长沙"));
  arr.push(add_item(322, "成都"));
  arr.push(add_item(367, "昆明"));

  var strName = "";
  arr.forEach(function (value, index, array) {
    var arrId = array[index].id;
    if (idx == arrId) {
      strName = array[index].title;
      return strName;
    }
  });

  return strName;
}

// 所有城市对象
function get_city_dictionary_array() {
  var new_array = [];

  // 全部
  // new_array.push(add_item(0, "全部"));

  // 热门城市
  var array1 = [];
  array1.push(add_item(52, "北京"));
  array1.push(add_item(321, "上海"));
  array1.push(add_item(77, "深圳"));
  array1.push(add_item(76, "广州"));
  array1.push(add_item(343, "天津"));
  array1.push(add_item(394, "重庆"));
  var item1 = {
    "id": 1,
    "title": "热门城市",
    "subcity": array1
  };
  new_array.push(item1);

  // 港澳台
  var array2 = [];
  array2.push(add_item(395, "香港"));
  array2.push(add_item(396, "澳门"));
  array2.push(add_item(397, "台北"));
  var item2 = {
    "id": 2,
    "title": "港澳台地区",
    "subcity": array2
  };
  new_array.push(item2);


  // 江苏
  var array3 = [];
  array3.push(add_item(220, "南京"));
  array3.push(add_item(221, "苏州"));
  var item3 = {
    "id": 3,
    "title": "江苏",
    "subcity": array3
  };
  new_array.push(item3);

  // 浙江
  var array4 = [];
  array4.push(add_item(383, "杭州"));
  array4.push(add_item(391, "温州"));
  array4.push(add_item(399, "慈溪"));
  var item4 = {
    "id": 4,
    "title": "浙江",
    "subcity": array4
  };
  new_array.push(item4);

  // 福建
  var array5 = [];
  array5.push(add_item(53, "福州"));
  array5.push(add_item(60, "厦门"));
  var item5 = {
    "id": 5,
    "title": "福建",
    "subcity": array5
  };
  new_array.push(item5);

  // 广东
  var array6 = [];
  array6.push(add_item(76, "广州"));
  array6.push(add_item(77, "深圳"));
  array6.push(add_item(96, "珠海"));
  var item6 = {
    "id": 6,
    "title": "广东",
    "subcity": array6
  };
  new_array.push(item6);

  // 辽宁
  var array7 = [];
  array7.push(add_item(244, "沈阳"));
  var item7 = {
    "id": 7,
    "title": "辽宁",
    "subcity": array7
  };
  new_array.push(item7);

  // 河北 石家庄
  var array8 = [];
  array8.push(add_item(138, "石家庄"));
  var item8 = {
    "id": 8,
    "title": "河北",
    "subcity": array8
  };
  new_array.push(item8);

  // 河南 郑州
  var array9 = [];
  array9.push(add_item(149, "郑州"));
  var item9 = {
    "id": 9,
    "title": "河南",
    "subcity": array9
  };
  new_array.push(item9);

  // 山东 济南
  var array10 = [];
  array10.push(add_item(283, "济南"));
  var item10 = {
    "id": 10,
    "title": "山东",
    "subcity": array10
  };
  new_array.push(item10);

  // 山西 太原
  var array11 = [];
  array11.push(add_item(300, "太原"));
  var item11 = {
    "id": 11,
    "title": "山西",
    "subcity": array11
  };
  new_array.push(item11);

  // 湖北 武汉
  var array12 = [];
  array12.push(add_item(180, "武汉"));
  var item12 = {
    "id": 12,
    "title": "湖北",
    "subcity": array12
  };
  new_array.push(item12);

  // 湖南 长沙
  var array13 = [];
  array13.push(add_item(197, "长沙"));
  var item13 = {
    "id": 13,
    "title": "湖南",
    "subcity": array13
  };
  new_array.push(item13);

  // 四川 成都
  var array14 = [];
  array14.push(add_item(322, "成都"));
  var item14 = {
    "id": 14,
    "title": "四川",
    "subcity": array14
  };
  new_array.push(item14);

  // 云南 昆明
  var array15 = [];
  array15.push(add_item(367, "昆明"));
  var item15 = {
    "id": 15,
    "title": "云南",
    "subcity": array15
  };
  new_array.push(item15);

  return new_array;
}

/*----------------------------------------------------------------------------------*/

// 所有的互助分类
function get_help_array() {
  return ["全部", "异地查档", "案件协助", "案件委托", "资源分享", "其他"];
}

function get_help_color(index) {
  return ['#0d6fb8', '#f85cad', '#f7982a', '#f85cad', '#f7982a', '#0d6fb8'][index];
}

// 互助分类名称
function get_help_name(index) {
  return get_help_array()[index];
}

// 所有互助对象
function get_help_dictionary_array() {
  var array = get_help_array();
  var new_array = [];
  array.forEach(function (value, index, array) {
    var dict = add_item(index, array[index]);
    new_array.push(dict);
  });
  return new_array;
}

/*----------------------------------------------------------------------------------*/

// 接口函数
module.exports = {
  getThemeColor:      get_theme_color,
  getAllCatelogArray: get_catelog_dictionary_array,
  getCatelogArray:    get_catelog_array,
  getCatelogName:     get_catelog_name,
  getAllMoneyArray:   get_money_dictionary_array,
  getMoneyName:       get_money_name,
  getAllCityArray:    get_city_dictionary_array,
  getCityName:        get_city_name,
  getAllHelpArray:    get_help_dictionary_array,
  getHelpArray:       get_help_array,
  getHelpColor:       get_help_color,
  getHelpName:        get_help_name,
}