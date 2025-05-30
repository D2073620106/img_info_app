/**
 * platform:支持的平台(weapp, h5, rn)不配置支持所有
 * subPackage:是否将其设置为分包
 * home: 是否是主页 是主页的页面将会被排在前面
 */
const config = {
  path: 'pages',
  pages: {
    'img_parse/index': {
      pages: {
        'index': {
          home:true
         }
      },
    },
    'img_parse/history': {
      pages: {
        'index': { },
        'detail': { }
      },
    },
    'img_parse/setting': {
      pages: {
        'index': { }
      },
    },

  }
}

module.exports = config
