
## Build Setup

#### install dependencies
`npm install`


#### serve with hot reload at localhost:port
* 修改`.env`文件的`NODE_ENV`为`development`
* 修改`.env`文件的`PORT`为你的端口号，默认`8080`
* 运行 `npm run dev`


#### build for production with minification
* 修改`.env`文件的`NODE_ENV`为`production`
* 运行 `npm run build`
* 打包后的文件生成在`/dist`目录

#### debug
* 修改 `.env` 文件的 `NODE_ENV`为`debug`
* 修改 `/config/index.js` 的 `proxyTable` 的远程代理机器的地址
* `npm run dev` 启动调试

#### mock data
本地模拟的每个接口均支持`GET`和`POST`两种请求方式
* 在`/ajax/data.js`文件中直接增加接口和对应的数据即可
* 重新运行`npm run dev`

## QA
Q：本地模拟数据更新后，需要重启服务么？

A：不需要


Q：静态资源的地址如何修改？

A：在`/config/index.js`中的`cdnHost`修改


Q：如何新建一个页面？

A：在`/src/modules`中创建一个目录，在刚创建的目录中新建与目录名同名的`.vue`和`.js`及`.html`文件，
然后具体如何编写页面，请参考`vuejs 2.0`文档，每次新增页面时，记得重启服务`npm run dev`

Q：文件发生变动时，页面会自动刷新么？

A：会。系统引入了`webpack`热加载模块，会自动监听`vue`模块相关的资源是否发生变动，如有变动，就会自动编译，浏览器自动重载页面。

Q：如何做接口延时调试？
A：在`/ajax/data.js`的接口数据中添加`delay`参数，值的单位为毫秒

Q: debug`环境下如何模拟微信登录？
A: 在调试前，需要访问一下微信登录后门，获取`cookie`和`session`，[http://dev.xiyayungou.com/bdCustomerLogin.json?username=13062717773&wechat=wx_qiakrtest](http://dev.xiyayungou.com/bdCustomerLogin.json?username=13062717773&wechat=wx_qiakrtest)
这个账号的用户`id`为`3`

## 目录结构

### `/src`目录为源文件
### `/dist`目录为打包后的文件
### `/ajax`目录为mock接口
### `/src/assets`目录为公用的静态资源目录
### `/src/assets/font`目录为`iconfont`目录
### `/src/common_html`目录为公用的页面模版，如公用的页头页尾，公用的`html meta`配置
### `/src/components`目录为公用的`vuejs`组件，如公用的`ui button`组件
### `/src/common_js`目录为公用的类库，如`jquery`、`bootstrap`,默认`jquery`优先加载
### `/src/modules`目录为页面，包括`css`、`js`、`html`、`.vue`
### `/src/common_css`目录为公共的`css`文件。由`/src/webpack_plugins/insert_global_css`把`/src/common_css`目录中的所有`css`文件插入到生成的页面中的`head`标签

## Client端设计文档

[点此查看](http://coderlt.coding.me/qkfe/2016/11/03/vue-multi-page/)
