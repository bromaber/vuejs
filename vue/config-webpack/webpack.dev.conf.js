var config = require('../config')
var webpack = require('webpack')
var merge = require('webpack-merge')
var utils = require('../config-utils/utils')
var baseWebpackConfig = require('./webpack.base.conf')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var jetpack = require('fs-jetpack');
var htmlXXXInject = require('../config-utils/html-xxx-inject');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var path = require('path');

//Multiple Page settings
var path = require('path');
var glob = require('glob');

// add hot-reload related code to entry chunks
Object.keys(baseWebpackConfig.entry).forEach(function (name) {
    baseWebpackConfig.entry[name] = ['./config-webpack/dev-client'].concat(baseWebpackConfig.entry[name])
});
//公用css添加到webpack hot middleware
glob.sync('./src/common_css/dist_css/*.css').forEach(function (v, k){
    baseWebpackConfig.entry[path.basename(v)] = v;
});

module.exports = merge(baseWebpackConfig, {
    module: {
        loaders: utils.styleLoaders({ sourceMap: config.dev.cssSourceMap })
    },
    // eval-source-map is faster for development
    devtool: '#eval-source-map',
    plugins: [
        new webpack.DefinePlugin({
          'process.env': config.dev.env
        }),
        // https://github.com/glenjamin/webpack-hot-middleware#installation--usage
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
        // https://github.com/ampedandwired/html-webpack-plugin
        //new HtmlWebpackPlugin({
        //  filename: 'index.html',
        //  template: 'index.html',
        //  inject: true
        //})
    ]
})

function getEntry(globPath) {
    var entries = {}, basename, tmp, pathname;

    glob.sync(globPath).forEach(function(entry) {
        basename = path.basename(entry, path.extname(entry));
        tmp = entry.split('/').splice(-3);
        pathname = tmp.splice(0, 1) + '/' + basename; // 正确输出js和html的路径
        entries[pathname] = entry;
    });
      //console.log("dev-entrys:");
      //console.log(entries);
    return entries;
}

var pages = getEntry('./src/modules/**/*.html');
var header_metadata = jetpack.read(baseWebpackConfig.common_modules.header_metadata);
//console.log("dev pages----------------------");
for (var pathname in pages) {
    //console.log("filename:" + pathname + '.html');
    //console.log();
    // 配置生成的html文件，定义路径等
    (function (path){
        var conf = {
            filename: path + '.html',
            templateContent: function (templateParams, compilation){
                var tc = jetpack.read( pages[path]);
                tc = htmlXXXInject.headMetaDataInject(tc, header_metadata);

                return tc;
            },
            inject: true,              // js插入位置
            chunksSortMode: 'dependency'
        };

        if (pathname in module.exports.entry) {
            conf.chunks = baseWebpackConfig.libNames.concat(path);
            conf.hash = true;
        }

        // 需要生成几个html文件，就配置几个HtmlWebpackPlugin对象
        module.exports.plugins.push(new HtmlWebpackPlugin(conf));
    })(pathname)
}
// console.log(module.exports);

