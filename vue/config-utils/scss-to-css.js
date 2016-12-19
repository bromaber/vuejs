var sass = require('node-sass');
var glob = require('glob');
var npath = require('path');
var fs = require('fs');

function scssToCss(path){
    var scssArr = glob.sync(path);
    scssArr.forEach(function (scss, i){
        var basename = npath.basename(scss, npath.extname(scss))
        sass.render({
            file: getFileName(basename),
            outFile: getOutFileName(basename),
            outputStyle: 'compressed',
        }, 
        function(error, result) {
            // console.log(error,result);
            if(!error){
                fs.writeFile(getOutFileName(basename), result.css, function(err){
                    if(!err){

                    }
                });
            }
        });
    });
}

function getFileName(basename){
    return './src/common_css/' + basename + '.scss';
}

function getOutFileName(basename){
    return './src/common_css/dist_css/' + basename + '.css';
}

module.exports = scssToCss;