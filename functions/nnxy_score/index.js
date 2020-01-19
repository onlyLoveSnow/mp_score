// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const {
    getUrl,
    token
  } = event

  const got = require('got');

  let response = await got(getUrl, {
    headers: {
      'Content-Type': 'application/json',
      'token': token
    }
  });

  return response.body
}