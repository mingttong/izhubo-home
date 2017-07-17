/**
 * Created by lenovo on 2017/5/21.
 */
"use strict";

const pinyin = require('pinyin');
const ApiClient = require('../sdk/index.js').ApiClient;

/**
 * @name sendMsg
 * @description 发送短信
 * @param opts
 * {
 *   appkey:                  必填
 *   appsecret:               必填
 *   extend:                  可选
 *   sms_free_sign_name:      必填
 *   sms_template_code:       必填
 *   sms_param:               必填
 *   {
 *     "param1": ...,
 *     "param2": ...,
 *     "param3": ...
 *   }
 *   rec_num:                 必填，只能发送一个号码，检查：能转为数字，并且长度为13位
 * }
 * @returns {Promise.<void>}
 */
async function sendMsg(opts) {

  const DEFAULT_TEMPLATE_CODE = 'SMS_67975058';

  // TODO: 电话和参数必须传入

  let appkey = opts.appkey || 23843597,
      appsecret = opts.appsecret || 'a14d971678c5c1003dcde690de024a13',
      extend = opts.extend || '',
      sms_free_sign_name = opts.sms_free_sign_name || 'i主播',
      sms_template_code = opts.sms_template_code || DEFAULT_TEMPLATE_CODE,
      sms_param = opts.sms_param,
      rec_num = opts.rec_num
  ;

  // 变量最大长度限制为13个字（还未加上两边双引号时。不管是英文还是中文）

  /*
    TODO: 如何更优雅的处理字符多个属性，如formatString(str1)(str2)(str3)
   */
  // 处理变量过长
  for (let k in sms_param) {
    sms_param[k] = formatString(sms_param[k]);
  }

  /*
    TODO: 如何更优雅的处理这个部分。
   */
  if (sms_template_code === DEFAULT_TEMPLATE_CODE) {
    sms_param.an = `\"${sms_param.an}\"`;
    sms_param.rn = `\"${sms_param.rn}\"`;
  }

  sms_param = JSON.stringify(sms_param);

  let client = new ApiClient({
    'appkey': appkey,
    'appsecret': appsecret,
    'REST_URL': 'http://gw.api.taobao.com/router/rest',
  });

  return await new Promise(function (resolve, reject) {

    client.execute('alibaba.aliqin.fc.sms.num.send', {

      'extend': extend,
      'sms_type': 'normal',
      'sms_free_sign_name': sms_free_sign_name,
      'sms_param': sms_param,
      'rec_num': rec_num, // 电话号码 15979149311
      'sms_template_code': sms_template_code, // 模板CODE

    }, function (err, res) {

      if (!err) {
        resolve(res);
      } else {
        reject(err);
      }

    });

  });

}

/**
 * @name formatString 格式化变量字符串
 * @description 变量长度不能超过规定长度，超过规定长度的后面内容用省略号表示
 * @param str            {String} 需要格式化的字符串
 * @returns {*}
 */
function formatString(str) {

  // 转为字符串
  str = str + '';

  /*
    TODO: 变得优雅一些，batch(str, limitLength, forbidKeywords, limitLength);
   */
  // 限制长度-->屏蔽关键词-->限制长度
  str = limitLength(forbidKeywords(limitLength(str)));

  return str;
}

function limitLength(str) {

  let limitLength = 13;

  // 限制长度
  if (str.length > limitLength) {
    str = str.slice(0, limitLength - 1) + "…";
  }

  return str;
}

function forbidKeywords(str) {

  let forbiddenKeyWords = ['炸'];

  // 和谐关键字
  forbiddenKeyWords.forEach(function (word) {
    str = str.replace(new RegExp(word, 'g'), pinyin(word).join(''));
  });

  return str;
}

module.exports = sendMsg;