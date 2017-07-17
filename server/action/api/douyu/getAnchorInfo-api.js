/**
 * Created by lenovo on 2017/5/24.
 */

/**
 * 使用官方的api接口
 * 经过测试，每秒发送100个请求没问题，这个接口还是很可靠的。
 */

const rp = require('request-promise');
const moment = require('moment');

const BASE_URI = 'http://open.douyucdn.cn/api/RoomApi/room/';
const DEFAULT_ROOM_ID = 85963;

module.exports = getAnchorInfo;

async function getAnchorInfo(opts) {
  "use strict";

  let start = Date.now();

  let room_id = opts.room_id || DEFAULT_ROOM_ID;
  // 传入的房间号必须是数字或者可以强制转换为数字
  // room_id must be a number type or a number like
  if ((typeof room_id === 'string' || typeof room_id === 'number') && Number.isNaN(Number(room_id))) {
    throw new Error('room_id must be a number type or a number like');
  }

  // 调用斗鱼接口的地址
  // Douyu's api URI
  let uri = BASE_URI + room_id;

  // 用request-promise模块发送请求所需参数
  // the parameter used to send a request by request-promise
  let options = {
    uri: uri,
    json: false, // don't let the request-promise parse the JSON string
  };

  try {

    /*
      获取房间信息
     */

    let repos = await rp(options);
    let size = Buffer.byteLength(repos, 'utf8');
    repos = JSON.parse(repos);
    if (repos.error !== 0) {
      throw new Error(repos.data);
    }
    // 获取到的是一个JSON，其$ROOM字段下是JSON，因此我们要转换两次
    // we get a json from the api, and the '$ROOM' key's value is a json
    // so we need to parse twice
    let $ROOM = repos.data;

    // 获取主播信息
    // get anchor info
    let {
      room_name,    // 房间号
      owner_name,    // 主播名
      room_status,  // 是否在直播 1 为直播，2为未开播
      start_time,    // 上次开播时间
      owner_weight, // 鱼丸重量
      fans_num,     // 关注数量
      online,       // 在线人数
    } = $ROOM;

    /*
      对获取的信息处理
     */

    // transfer variable name
    let show_status = Number(room_status); // 咸鱼接口，得到的还是string类型
    let show_time = start_time;

    // show_status 为 1 时则开播，为 2 时则未开播，为 0 时则房间已关闭。
    // if show_status is 0, then the room is close forever!
    // if show_status is 1, then is live
    // if show_status is 2, then is not live
    switch (show_status) {
      case 0:
        // 房间关闭，就永远不让他开播
        show_status = false;
        // TODO: 处理关闭的直播间（别浪费我们的流量）
        // 两种方案：1. 自动删除掉   2. 通知管理员，让管理员来操作
        // 或者在用户绑定时就提醒用户
        handleCloseRoom(room_id);
        break;
      case 1:
        // 开播
        show_status = true;
        break;
      case 2:
        // 未开播
        show_status = false;
        break;
      default:
        console.log('Get unknown show_status:', 'TYPE:', typeof show_status, '- VALUE:', show_status);
        show_status = false;
    }

    // 耗时
    let use_time = Date.now() - start;

    /*
      返回所需信息
     */

    return {
      room_id,
      owner_name,
      room_name,
      show_status,
      show_time,
      owner_weight, // 鱼丸重量
      fans_num, // 粉丝数量
      online, // 在线人数
      use_time,
      size,
    };

  } catch (err) {

    // TODO: 如何优雅的处理错误

    console.log(err);
    return {
      error_response: {
        msg: err,
      }
    }

  }

}

function handleCloseRoom() {

}