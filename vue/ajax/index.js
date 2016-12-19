//RESTFUL API 模拟
const forceRequire = require('require-reload');


module.exports = function( router ){
    let mockData = require('./data');

    //每隔1秒重新解析data，刷新data，新增的路由不会生效
    setInterval(function(){
        mockData = forceRequire('./data');
    }, 1000);

    router.all('/*', (req, res, next)=>{
        //非接口请求，走正常流程
        if(req.url.indexOf('.json') === -1){
            return next();
        }
        let apiUrl = req.method + req.path;
        console.log('=>api: '+apiUrl)
        let data = mockData[apiUrl] && mockData[apiUrl]() || {status:404, message:'接口不存在'};

        setTimeout(()=>{
            res.json(data)
        }, data.delay || 0)
    })
};
