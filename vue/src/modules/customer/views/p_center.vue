<template>
	<div>
		<section id="customerDeatil" class="ub">
		<div id="cusImg" class="ub pr5">
			<img :src="avatar" class="size60">
		</div>
		<div class="ub ub-f1 ub-ver ub-pc">
			<div class="mb5 f14">{{customer.customerName}} (ID:{{customer.id}})</div>
			<a href="customer.html?i=1#/level" class="dib ub back-white levelInfo">
				<img :src="customerLevel.logo" class="levelImg">
				<span class="f12">{{customerLevel.levelName}}</span>
			</a>
		</div>
		</section>
		<section id="orderStatusData" class="ub">
			<a href="../order.html#/list?type=1&status=1" class="ub-f1 tx-c ptb10 db">
				<div class="br1">
					<span>{{statusList[1]}}</span>
					<div>待付款</div>
				</div>				
			</a>
			<a href="../order.html#/list?type=2&status=2_10" class="ub-f1 tx-c ptb10 db">
				<div class="br1">
					<span>{{statusList[2] - 0 + statusList[10]}}</span>
					<div>待收货</div>
				</div>
			</a>
			<a href="../order.html#/list?type=3&status=3" class="ub-f1 tx-c ptb10 db">
				<div class="br1">
					<span>{{statusList[3]}}</span>
					<div>待评价</div>
				</div>
			</a>
			<a href="../order.html#/list?type=4&status=4" class="ub-f1 tx-c ptb10 db">
				<div class="br1">
					<span>{{statusList[4]}}</span>
					<div>已完成</div>
				</div>
			</a>
		</section>
		<section id="customerChannel">
			<a href="../order.html#/list?type=&status=" class="bt1 pr line-h db ub ub-ac"><i class="iconfont">&#xe61f;</i>全部订单</a>
			<!-- <a href="../order.html#/refundlist?type=&status=" class="bt1 pr line-h db"><i class="iconfont fl">&#xe65c;</i>售后订单</a> -->
			<a href="../cart.html" class="bt1 pr line-h db"><i class="iconfont">&#xe61c;</i>我的购物车</a>
			<a href="../address.html" class="bt1 pr line-h db"><i class="iconfont">&#xe620;</i>收货地址管理</a>
		</section>
		<dialogs ref='dialog'></dialogs>
	</div>
</template>

<script>
import dialogs from '../../../components/dialogs/dialogs.vue'
import { apiCustomerCenter, apiGetOrderCountByStatus, apiGetWechatJsApiTicket } from '../../../api/'

export default {
	data(){
		return {
			customer: {},
			customerLevel: {},
			statusList: {
				1: 0,
				2: 0,
				3: 0,
				4: 0,
                10: 0
			},
			avatar:''
		}
	},
	components: {
		dialogs
	},
	name: 'p_center',
	created(){
		this.getCustomerInfo();

		this.getOrderCount();
	},
    mounted(){

    },
	methods:{
		getCustomerInfo(){
            apiCustomerCenter.save()
                .then((res) => {
                    if(res.body.status ===0){
                    	this.avatar = res.body.result.customer.avatar||'//qncdn.qiakr.com/mall/default-photo.png'
	                    this.customer = res.body.result.customer;
	                    this.customerLevel = res.body.result.customerCurrentLevel;                      
                    }
                    else {
                    	return this.showToast(res.body.errmsg);
                    }
                });
		},
		getOrderCount(){
			apiGetOrderCountByStatus.save()
				.then((res) => {
					if(res.body.status != "0")
                        return this.showToast(res.body.errmsg);

                    res.body.statusCountVoList.forEach((obj) => {
                    	this.statusList[obj.status] = obj.count || 0;
                    });
				});
		},
		showToast(errmsg){
            this.$refs.dialog.toast({
                text: errmsg||'系统繁忙，请稍后再试！',
                icon: '&#xe660;',
                delay: 1000
            })
        }	
    }
}

</script>

<style scoped>
	#customerDeatil {background: -webkit-gradient(linear, 65% 40%, 55% 100%, from(#DA2727), to(#DD2727));color: #fff;/*padding:2rem 1.5rem;*/}
	#orderStatusData {background-color: #fff;border-bottom: 1px solid #f2f2f2;}
	#customerChannel {padding-left: 1rem;background-color: #fff;}
	/*.p15 {padding: 1.5rem;}*/
	.pr5 {margin-right: 5px;}
	.size60 {/*width: 6rem;height: 6rem;*/border-radius: 100%;border: 2px solid #fff;}
	/*.ptb10 {padding: 1rem 0;}*/
	.iconfont {margin-right: 1rem;}
	.br1 {border-right: 1px solid #f2f2f2;}
	.bt1 {border-bottom: 1px solid #f2f2f2;}
	#customerChannel .bt1:after {border: #e4e4e4 solid;border-width: 0 0 2px 2px;
    -webkit-transform: rotate(-135deg);content: ' ';position: absolute;top: 50%;
    margin-top: -6px;right: 15px;width: 10px;height: 10px;}
    /*.line-h {line-height: 4.4rem;height: 4.4rem;}
    .levelImg {width: 1.6rem;height: 1.6rem;}
    .levelInfo {padding: .1rem .5rem .1rem .2rem;border-radius: 1rem;}*/
</style>