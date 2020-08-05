// 云函数入口文件
const cloud = require('wx-server-sdk');
const got = require('got');

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const {
    url,
    token
  } = event

  let response = await got(url, {
    headers: {
      'token': token
    }
  })

  return response.body
}