/**
 * Created by lenovo on 2017/6/2.
 */
const fs = require('fs');

module.exports = readFile;

function readFile(path, encode = 'utf8') {
  return new Promise(function (resolve, reject) {
    fs.readFile(path, encode, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    })
  })
}