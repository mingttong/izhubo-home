/**
 * @file index
 * @description 后端模板入口文件
 * @author zhouwunan
 */

'use strict';

const index = require('../model/index.js');
const util = require('../lib/util.js');

module.exports = function(req, res){
    res.render('home/page/index.tpl', index.getData());
};

