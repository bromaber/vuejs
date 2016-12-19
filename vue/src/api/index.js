import Vue from 'vue'
import VueResource from 'vue-resource'
import NProgress from 'nprogress'
// import css from 'assets/css/nprogress.css'

//接口主机名，开发环境一般为空，生产环境根据情况设置
const HOST = "";

Vue.use(VueResource)
//服务器无法处理application/json,所以只能把请求当作表单提交
Vue.http.options.emulateJSON = true;

Vue.http.interceptors.push((request, next) => {

    // if(!/micromessenger/i.test(navigator.userAgent)){
    //   // return alert('非法访问');
    //     return window.location.href = "error.html#/wxerror";
    // }
    sessionStorage.setItem('redirect', location.href);

    console.log("保存重定向地址： "+sessionStorage.getItem("redirect"));
    //request.headers['Content-Type'] = 'application/json';
    request.url = HOST + request.url;
    $("html").addClass("no-scroll");
    NProgress.start();
    $('#nprogress').css('height', Math.max($(document).height(), $(window).height()));
    if($('.modal-backup').get(0) && $('.modal-backup').css('display') !== 'none'){
        $('#nprogress').css('background', 'rgba(0,0,0,0)');
    }else{
        $('#nprogress').css('background', 'rgba(0,0,0,.5)');
    }
    // 请求发送前的处理逻辑
    // 1. 获取 token 添加至头部
    next((response) => {
        //微信认证处理
        if(response.body && response.body.status && response.body.status === 302){
          location.href = response.body.redirectUrl;
          return;
        }
        $("html").removeClass("no-scroll");
        NProgress.done();
        // 请求完成后的处理逻辑
        // 401 未登录处理
        // 404 处理
        // 500 处理
        return response
    })
})

export const apiMenus = Vue.resource('/api/menus')
export const apiSession = Vue.resource('/api/session{/id}')
export const apiUser = Vue.resource('/api/user{/id}')
export const apiOverview = Vue.resource('/api/overview')
export const apiSuppliers = Vue.resource('/api/suppliers')
export const apiSupplierOverview = Vue.resource('/api/supplier{/id}/overview')
export const apiSupplierChart = Vue.resource('/api/supplier{/id}/chart')
export const apiCategoryList = Vue.resource('/api/categoryList')
export const apiOrderList = Vue.resource('/api/orderList')
export const apiStockList = Vue.resource('/api/stockList')
/*购物车*/
export const apiShoppingCartList = Vue.resource('/mall/getShoppingCart.json')
export const apiAddOrUpdateShoppingCart = Vue.resource('/mall/insertOrUpdateCustomerShoppingCart.json')
export const apiDeleteCustomerShoppingCart = Vue.resource('/mall/deleteCustomerShoppingCart.json')
/*会员中心*/
export const apiCustomerCenter = Vue.resource('/mall/customerCenter.json')
export const apiGetCustomerAgent = Vue.resource('/mall/getCustomerAgent.json')
/*收货地址*/
export const apiGetCustomerAddressList = Vue.resource('/mall/getCustomerAddressList.json')
export const apiInsertCustomerAddress = Vue.resource('/mall/insertCustomerAddress.json')
export const apiUpdateCustomerAddress = Vue.resource('/mall/updateCustomerAddress.json')
export const apiDeleteCustomerAddress = Vue.resource('/mall/deleteCustomerAddress.json')
export const apiGetCustomerAddressById = Vue.resource('/mall/getCustomerAddressById.json')
/*商品评价*/
export const apiGetStockAppraiseList = Vue.resource('/mall/getStockAppraiseList.json')
export const apiInsertAppraiseStock = Vue.resource('/mall/insertAppraiseStock.json')
export const apiGetOrderInfo = Vue.resource('/mall/getOrderInfo.json')
export const apiCheckBeforePayOrder = Vue.resource('/mall/checkBeforePayOrder.json')
export const apiGetOrderExpressInfoByOrderId = Vue.resource('/mall/getOrderExpressInfoByOrderId.json')

export const apiQuerySelfGroupList = Vue.resource('/mall/querySelfGroupList.json')
export const apiQueryAgentStock = Vue.resource('/mall/queryAgentStock.json')
export const apiGetStockInfo = Vue.resource('/mall/getStockInfo.json')

export const apiQueryCustomerOrderList = Vue.resource('/mall/queryCustomerOrderList.json')
export const apiPrepareOrder = Vue.resource('/mall/prepareOrder.json')
export const apiCreateOrder = Vue.resource('/mall/createOrder.json')
export const apiCompleteOrder = Vue.resource('/mall/completeOrder.json')
export const apiWechatJsPayWithOpenId = Vue.resource('/mall/wechatJsPayWithOpenId.json')
export const apiGetOrderCountByStatus = Vue.resource('/mall/getOrderCountByStatus.json')



export const apiGetWechatJsApiTicket = Vue.resource('/mall/getWechatJsApiTicket.json')



