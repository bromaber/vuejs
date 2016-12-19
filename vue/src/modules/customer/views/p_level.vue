<template>
	<div>
		<section id="levelInfo">
			<div class="mb10 dib">
				<img class="levelImg pr" :src="avatar">
				<img class="levelAfter" :src="customerCurrentLevel.logo">
			</div>
			<div class="imgAfter"></div>
			<div class="f15 mb8">{{customer.customerName}}</div>
			<div class="">{{customerCurrentLevel.levelName}}:可享受{{customerCurrentLevel.discount/10 | tofixed2}}折</div>
		</section>
		<section id="levelDetail" class="pr">
			<div class="detailMain">
				<img class="dn-top" src="http://qncdn.qiakr.com/level_de.png">
				<span class="levelTitle ">等级说明</span>
				<div class="back-white content">
					<div class="ub mb15" v-for="(v,i) in levelInfo">
						<img class="detailImg ub db" :src="v.logo">
						<div class="ub-f1">
							<div class="f15 c-6">{{v.levelName}}</div>
							<div class="c-9" style="font-size:1.25rem;">
								<span v-if="v.level==1">消费满</span>
								<span v-if="v.level==2">自消费满</span>
								<span v-if="v.level==3 || v.level==4 || v.level==5">累计消费满</span>
								{{v.consumeThreshold}}元,可享受{{v.discount/10 | tofixed2}}折
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
		<dialogs ref='dialog'></dialogs>
	</div>
</template>

<script>
	import { apiCustomerCenter } from '../../../api/'
	import dialogs from '../../../components/dialogs/dialogs.vue'

	export default {
		components: {
	        dialogs
	    },
		data(){
			return {
				customer:{},
				avatar:'',
				customerCurrentLevel:{},
				levelInfo:[]
			}
		},
		mounted(){
			this.getLevelInfo();
		},
		filters: {
		    tofixed2: function (value) {
		      	if (!value) return ''
		      	return value.toFixed(2)
		    }
		},
		methods:{
			getLevelInfo(){
				apiCustomerCenter.save()
					.then((res)=>{
						if (res.body.status===0) {
							this.levelInfo = res.body.result.levelList;
							this.customer = res.body.result.customer;
							this.avatar = res.body.result.customer.avatar || 'http://qncdn.qiakr.com/mall/default-photo.png';
							this.customerCurrentLevel = res.body.result.customerCurrentLevel;
						}
						else{
							if (res.body) this.showToast(res.body.errmsg);
						}
					})
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
	#levelInfo {height: 13rem;background:url(//qncdn.qiakr.com/wx/gradeBg@2x.png) no-repeat;background-size: cover;color: #fff;text-align: center;padding-top: 2rem;box-sizing: border-box;}
	#levelDetail {padding: 2rem .5rem;}
	.levelImg {width: 4rem;height: 4rem;border-radius: 4rem;margin:0 auto;background-size: cover;}
	.levelAfter {width: 1.5rem;height: 1.5rem;border:0;display: block;background-size: cover;position: absolute;right: 43%;top: 4.7rem;}
	.detailMain {position:relative;}
	.detailMain>.dn-top{position:absolute;top:6px;left:1%;width:98%;height:3rem;}
	.content {width:78%;padding:4rem 1rem 1rem 2rem;box-sizing: border-box;margin:0 auto;border-radius: 5px;}
	.detailImg {width: 2rem;height: 2rem;margin-right: .5rem;}
	.levelTitle {position: absolute;width: 100%;text-align: center;top: 0.8rem;
    color: #fff;}
    .mb8 {margin-bottom: .8rem;}
</style>