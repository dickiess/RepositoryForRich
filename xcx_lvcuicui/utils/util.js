
/**
* 从一个数组中随机取出若干个元素组成数组
* @param {Array} arr 原数组
* @param {Number} count 需要随机取得个数
**/
const getRandomArray = (arr, count) => {
  var shuffled = arr.slice(0),
    i = arr.length,
    min = i - count,
    temp,
    index;
  while (i-- > min) {
    index = Math.floor((i + 1) * Math.random());
    temp = shuffled[index];
    shuffled[index] = shuffled[i];
    shuffled[i] = temp;
  }
  return shuffled.slice(min);
}

function repayDate(month) {
  var date = new Date();
  date.setMonth(date.getMonth() + month);
  var year = date.getFullYear(),
    month = date.getMonth() + 1,
    day = date.getDate();
  return year + '/' + month + '/' + day;
}

function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}

/*----------------------------------------------------------------------------------*/

// double转日期1
function double_to_date(dVal) {
  return new Date(parseInt(dVal * 1000))
}

// double转日期2
function format_date(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  return [year, month, day].map(format_number).join('/')
}

// double转日期
function get_date_by_double(dVal) {
  return format_date(double_to_date(dVal))
}

// 日期转自负字符
function format_time(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()

  var dd = [year, month, day].map(format_number).join('/')
  var hh = [hour, minute, second].map(format_number).join(':')

  return dd + ' ' + hh
}

// 数字转字符
function format_number(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}

function get_time() {
  var dd = new Date()
  return format_time(dd)
}

/*----------------------------------------------------------------------------------*/

module.exports = {
  repayDate: repayDate,
  getDateByDouble: get_date_by_double,
  formatTime: format_time,
  getTime: get_time, 
}