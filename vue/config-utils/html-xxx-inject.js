'use strict';
var _ = require('lodash'),
    rhead = /([.|\n]+?)(<\/head>)/,
    rbody = /([.|\n]+?)(<\/body>)/,
    genLink = function(type, link){
        var tag = '';
        switch(type){
            case 'css':
                tag = '<link rel="stylesheet" href="' + link + '" type="text/css" />';
                break;
            case 'js':
                tag = '<script type="text/javascript" src="' + link + '"></script>';
                break;
            default:
                //do nothing
        }

        return tag;
    };

/**
 * 页头或页体插入CSS或JS
 * @param htmlContent
 * @param opts
 * @returns {*}
 */
function htmlAssetsInject(htmlContent, opts) {
    if (typeof htmlContent !== 'string') {
        throw new TypeError('Expected a string');
    }

    var assets = ( opts && opts.assets ) || [];

    _.each(assets, function( v, i ){
        var inject = v.inject,
            link = genLink(v.type, v.url);

        switch(inject){
            case 'head':
                htmlContent = htmlContent.replace(rhead, '$1' + link + '$2');
                break;
            case 'body':
            default:
                htmlContent = htmlContent.replace(rbody, '$1' + link + '$2');
                break;
                //cancel
        }
    });

    return htmlContent;
};

/**
 * 页头插入元数据
 * @param htmlContent
 * @param metaData
 * @returns {*}
 */
function htmlHeadMetaDataInject(htmlContent, metaData) {
    if (typeof htmlContent !== 'string') {
        throw new TypeError('htmlContent Expected a string');
    }

    if (typeof metaData !== 'string') {
        throw new TypeError('metaData Expected a string');
    }

    htmlContent = htmlContent.replace(rhead, '$1' + metaData + '$2');

    return htmlContent;
};

module.exports = {
    assetsInject: htmlAssetsInject,
    headMetaDataInject: htmlHeadMetaDataInject
};
