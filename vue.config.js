const path = require('path')
const cdnPlugin = require('webpack-cdn-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const resolve = dir => path.join(__dirname, dir)

module.exports = {
  //基本路径
  publicPath: "/",
  //输出文件目录
  outputDir: "dist",
  //放置生成的静态资源 (js、css、img、fonts) 的 (相对于 outputDir 的) 目录。
  assetsDir: "static",
  devServer: {
    port: 8661, // 端口
    open: false, // 自动开启浏览器
    compress: false, // 开启压缩
    overlay: {
      warnings: true,
      errors: true
    },
    host: "0.0.0.0",
    proxy: {
			'^/devapi': {
				target: 'http://service.smarttour.ziztour.loc',
				// target: 'http://test.zyx.ziztour.com/api/',
				changeOrigin: true,
				pathRewrite: {'^/devapi' : ''}
      },
      '^/testapi': {
				target: 'http://test.zyx.ziztour.com/api/',
				changeOrigin: true,
				pathRewrite: {'^/testapi' : ''}
      },
		}
  },
  configureWebpack: config => {
    let plugins = [
      new HtmlWebpackPlugin({
        title: 'title',
        cdnModule: 'vue',
      }),
      new cdnPlugin({
        modules: [
          { name: 'vue', var: 'Vue', path: 'dist/vue.min.js' },
        ],
        publicPath: "/node_modules"
      }),
    ]
    config.plugins = plugins
  },
}