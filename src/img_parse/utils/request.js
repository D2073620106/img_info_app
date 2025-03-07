import { createRequest, createUpload, createRequestHooks, getPlatform, networkVerify, userConfig } from '@/duxapp/utils'
// import md5 from 'crypto-js/md5'
import hmacSha256 from 'crypto-js/hmac-sha256'
import encHex from 'crypto-js/enc-hex'
// import qs from 'qs'
import { user as userManage  } from "@/img_parse/utils";

const  userRequestConfig = userConfig.option.img_parse.request


const requestConfig = {
  config: {
    request: {
      origin: userRequestConfig.origin,
      path: userRequestConfig.path,
      contentType: 'application/json'
    },
    result: {
      code: 'statusCode',
      data: ['data', 'data'],
      successCode: 200,
      message: res => {
        if (res.statusCode === 200) {
          return res.data.message
        }
        return res.data
      }
    },
    upload: {
      api: 'member/upload',
      requestField: 'file',
      resultField: ['data', 'data', 0, 'url']
    }
  },
  middle: {}
}


const { request, throttleRequest, middle: requestMiddle } = createRequest(requestConfig)
const { upload, uploadTempFile, middle: uploadMiddle } = createUpload(requestConfig)

const before = async params => {
  const timestamp = Math.round(new Date().getTime() / 1000)
  // const [orign, query] = params.url.split('?')
  // console.log('====1')
  // const paths = orign.split('/').slice(orign.startsWith('http') ? 3 : 1)
  // const contentMD5 = md5(
  //   !params.body
  //     ? ''
  //     : params.contentType === 'application/json'
  //       ? JSON.stringify(params.body)
  //       : qs.stringify(params.body, { encode: false })
  // ).toString().toLowerCase()
  const contentDate = timestamp.toString()

  // console.log('====2')
  const signData = []
  // signData.push('/' + paths.join('/'))
  // signData.push(qs.stringify({
  //   ...params.query,
  //   ...query ? qs.parse(query) : {}
  // }, { encode: false }))
  // signData.push(contentMD5)
  signData.push(contentDate)
  // console.log('====3',hmacSha256,config.secretKey)
  const hash = hmacSha256(signData.join('\n'), userRequestConfig.accessKey)
  // const hash =signData.join('\n')
  // console.log('====4')
  const sign = encHex.stringify(hash)
  params.header = {
    Accept: 'application/json',
    AccessKey: userRequestConfig.secretId,
    'Platform': getPlatform(),
    'Content-MD5': sign,
    'Content-Date': contentDate,
    'Authorization': 'Bearer ' + userManage.data.token,
    ...params.header,

  }
  console.log(params.header,'params.header');
  return params
}
requestMiddle.before(before, 10)
uploadMiddle.before(before, 10)
requestMiddle.result(async (res) => {
  if (res.statusCode >= 200 && res.statusCode < 300) {
    const data = res.data || {}
    // data._meta = res.data.meta
    return data
  }
  throw {
    ...(res.data && typeof res.data === 'object' ? res.data : { data: res.data }),
    code: res.statusCode,
    message: res.data?.msg || res.data
  }
}, 10)

// ios首次安装无法请求
requestMiddle.before(networkVerify)

const { useRequest, usePageData } = createRequestHooks(request)

export {
  request,
  throttleRequest,
  requestMiddle,
  upload,
  uploadTempFile,
  uploadMiddle,
  useRequest,
  usePageData
}
