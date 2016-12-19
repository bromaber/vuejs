<template>
    <article>
        <p class="f28">this is a home page123 !!!!</p> 
        <p class="btn-red-1 mt10 mb20 f16" @click="flag =! flag">click事件~~~~</p>
        <p class="btn-wh-1 mt10 mb20" v-tap="{methods:tapBtn}">touch事件~~~~</p>
        <div v-show="flag" v-for="i in 10" :style="{width: i + 'rem'}"></div>
    </article>
</template> 

<script>
// import a from "../../common_css/a.scss"
export default {
    data(){
        return {
            flag: true
        }
    },
    mounted(){
        this.init();
    },
    methods: {
        init(){
            
        },
        tapBtn(){
            this.flag = !this.flag;
        }    
    }
}
</script>

<style lang="scss" scoped>
$blue-color: blue;
$red-color: #ff4436;
article{color: $blue-color;}
div{color: #fff;height:1rem;background-color: $red-color;}
</style>

