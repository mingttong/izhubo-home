/**
 * Created by lenovo on 2017/6/2.
 */
const moment = require('moment');

module.exports = logOutput;

/**
 * @name logOutput
 * @description 日志输出
 * @param msg
 * @param formatString
 */
export function logOutput(msg, formatString = 'YYYY-MM-DD HH:mm:ss') {

  let normal_output = `${msg} => Time: ${moment().format(formatString)}`;

  /*
    超过80个字符就换行输出
   */
  if (Buffer.byteLength(normal_output) > 80) {
    console.log(`${msg}\n=> Time: ${moment().format(formatString)}`);
  } else {
    console.log(normal_output);
  }

}