const p_center = resolve => require(['./views/p_center.vue'], resolve)
const p_level = resolve => require(['./views/p_level.vue'], resolve)

export default [
	{
		path: '/',
		name:'个人中心',
		redirect:'/center'
	},
	{
		path: '/center',
		name:'个人中心',
		component: p_center
	},
	{
		path: '/level',
		name:'等级特权',
		component: p_level
	}
]