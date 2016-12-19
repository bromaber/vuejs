const Mock  = require('mockjs')

module.exports = {
  'POST/mall/getShoppingCart.json': ()=>{
    return {
      status: 301,
      redirectUrl: 'http://baidu.com'
    };
  },
  'POST/mall/customerCenter.json':()=>{
    return {
      a: 1
    }
  },
  'POST/mall/getOrderCountByStatus.json':()=>{
    return Mock.mock({
      status: 200,
      result:[
        {
          key: '1',
          name: '商户数据',
          icon: 'user',
          path: '/data',
          child: [
            {
              name: '子菜单',
              path: '/data/1',
              key: '1-1'
            }
          ]
        },{
          key: '2',
          name: '商户列表',
          icon: 'laptop',
          path: '/list'
        },{
          key: '3',
          name: '商户设置',
          icon: 'notification',
          path: '/setup'
        }
      ]
    })
  }
}


// status 200 正常
// status 403 未授权
// status 404 未找到
// status 500 服务器错误

// 注册&登录API
// 登入/登出对应的服务端资源应该是session，所以相关api应该如下：
// GET /session # 获取会话信息
// PUT /session # 更新会话信息 (心跳)
// POST /session # 创建新的会话（登入）
// DELETE /session # 销毁当前会话（登出）
//
// 而注册对应的资源是user，api如下：
// GET /user/:id # 获取id用户的信息
// PUT /user/:id # 更新id用户的信息
// POST /user # 创建新的用户（注册）
// DELETE /user/:id # 删除id用户（注销）
