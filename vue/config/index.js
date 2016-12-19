// see http://vuejs-templates.github.io/webpack for documentation.
var path = require('path')

module.exports = {
    build: {
        env: require('./prod.env'),
        index: path.resolve(__dirname, '../dist/index.html'),
        cdnHost: path.resolve(__dirname, '../dist'),
        // cdnHost: "//dev.cxplp.cn",
        assetsRoot: path.resolve(__dirname, '../dist'),
        assetsSubDirectory: 'static',
        assetsPublicPath: '/',
        productionSourceMap: false,
        productionGzip: false,
        productionGzipExtensions: ['js', 'css']
    },
    dev: {
        env: require('./dev.env'),
        port: 8080,
        assetsSubDirectory: 'static',
        assetsPublicPath: '/',
        proxyTable: {
            '/*/*.json?(*)*': {
                target: 'http://www.cxplp.cn/',
                changeOrigin: true,
                logLevel: "debug",
                secure: false,
                pathRewrite: {
                  '^/mall': '/mall'
                }
            }
        },
        cssSourceMap: false
    }
}
