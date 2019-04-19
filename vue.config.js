const path = require('path');
module.exports = {
  // baseUrl: '/',
  // devServer: {
  //   proxy: {
  //     '/api': {
  //       target: "http://166220.com.cn/api",
  //       changeOrigin: true,
  //     }
  //   }
  // },
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'less',
      patterns: [path.resolve(__dirname, './src/assets/style/varibles.less'),]
    }
  }
}
