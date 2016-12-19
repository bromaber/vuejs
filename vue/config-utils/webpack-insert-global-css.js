var env = require("dotenvr").load()
var jetpack = require('fs-jetpack')
var config = require('../config')
var npath = require('path')
require('shelljs/global')


var cssPath = config.build.cdnHost + config.build.assetsPublicPath + config.build.assetsSubDirectory;
var assetsPath = npath.join(config.build.assetsRoot, config.build.assetsSubDirectory);

function InsertGlobalCss(path){
    this.path = path;
}

InsertGlobalCss.prototype.apply = function(compiler) {
    var path = this.path;

    compiler.plugin('compilation', function(compilation, options) {
        compilation.plugin('html-webpack-plugin-before-html-processing', function(htmlPluginData, callback) {
            if(env.NODE_ENV === 'development' || env.NODE_ENV === 'debug'){
                var cssText = '<style type="text/css">';
                path.forEach(function (v, k){
                    var css = jetpack.read(v);
                    cssText += css;
                });
                cssText += '</style>';

                htmlPluginData.html = htmlPluginData.html.replace(/([.|\n]+?)(<\/head>)/, '$1' + cssText + '$2');
            }else{
                var fulldirname = '', dirname = '';
                path.forEach(function (v, k){
                    fulldirname = npath.dirname(v);
                    var dirnames = npath.dirname(v).split('/');
                        dirname = dirnames[dirnames.length-1];
                    htmlPluginData.assets.css.unshift(cssPath + "/" + dirname + "/" + npath.basename(v) + "?" + compilation.hash);
                });
                rm('-rf', assetsPath+"/"+dirname)
                mkdir('-p', assetsPath+"/"+dirname)
                cp('-R', fulldirname, assetsPath);
            }
            callback(null, htmlPluginData);
        });
    });
};

module.exports = InsertGlobalCss;


