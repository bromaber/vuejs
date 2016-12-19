<template>
    <transition name="fade">
        <article v-show="show">
            <div class="modal-d" v-if="modal.type != 'toast'">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <!--头部-->
                        <div class="modal-header">
                            <slot name="header">
                                <p class="title">{{modal.title}}</p>
                            </slot>
                            <a @click="close(0)" class="close" href="javascript:void(0)"></a>
                        </div>
                        <!--内容区域-->
                        <div class="modal-body">
                            <slot name="body">
                                <p v-if="modal.type != 'prompt'" class="notice">{{modal.text}}</p>
                                <div v-if="modal.type == 'prompt'" class="mt10 mb10">
                                    <p class="mb10">{{modal.text}}</p>
                                    <input type="text" v-model="modal.inputVal">
                                </div>
                            </slot>
                        </div>
                        <!--尾部,操作按钮-->
                        <div class="modal-footer ub">
                            <slot name="button">
                                <a v-if="modal.showCancelButton" href="javascript:void(0)" :class="[modal.cancelButtonClass]" class="button ub-f1" @click="close(1)">{{modal.cancelButtonText}}</a>
                                <a v-if="modal.showConfirmButton" href="javascript:void(0)" :class="[modal.confirmButtonClass]" class="button ub-f1" @click="modal.submitEvt">{{modal.confirmButtonText}}</a>
                            </slot>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-toast" :class="{'icon': modal.icon||modal.loading}" v-if="modal.type == 'toast'">
                <slot name="toast">
                    <p v-if="modal.icon&&!modal.loading" class="mb5"><i class="iconfont f30" v-html="modal.icon"></i></p>
                    <div v-if="modal.loading" class="mb10 loading-out loadingAmt">
                        <div class="loading-in"></div>
                    </div>
                    <p>{{modal.text}}</p>
                </slot>
            </div>
            <div class="modal-backup" :class="{toast: modal.type == 'toast'}"></div>
        </article>
    </transition>
</template>
<script>
export default {
/**
 * modal 模态接口参数
 * @param {string} modal.title 模态框标题
 * @param {string} modal.text 模态框内容
 * @param {string} modal.type 模态框类型 alert or comfirm or prompt or toast
 * @param {boolean} modal.showCancelButton 是否显示取消按钮
 * @param {string} modal.cancelButtonClass 取消按钮样式
 * @param {string} modal.cancelButtonText 取消按钮文字
 * @param {string} modal.showConfirmButton 是否显示确定按钮
 * @param {string} modal.confirmButtonClass 确定按钮样式
 * @param {string} modal.confirmButtonText 确定按钮标文字
 * @param {string} modal.inputVal prompt类型下 input值
 * @param {function} modal.submitEvt 确定按钮回调
 * @param {string} modal.icon toast图标 iconfont值
 * @param {boolean} modal.loading toast是否是loading
 * @param {number} modal.delay toast显示时间 单位 毫秒 默认2000
 */
    props: [],
    computed: {
        /**
         * 格式化props进来的参数,对参数赋予默认值
         */
        modal: {
            get() {
                let modal = {};
                modal = {
                    title: modal.title || '提示',
                    text: modal.text,
                    type: modal.type || 'alert',
                    showCancelButton: typeof modal.showCancelButton === 'undefined' ? true : modal.showCancelButton,
                    cancelButtonClass: modal.cancelButtonClass ? modal.cancelButtonClass : 'btn-default',
                    cancelButtonText: modal.cancelButtonText ? modal.cancelButtonText : '取消',
                    showConfirmButton: typeof modal.showConfirmButton === 'undefined' ? true : modal.showConfirmButton,
                    confirmButtonClass: modal.confirmButtonClass ? modal.confirmButtonClass : 'btn-active',
                    confirmButtonText: modal.confirmButtonText ? modal.confirmButtonText : '确定',
                    inputVal: modal.inputVal || '',
                    submitEvt: new Function,
                    icon: modal.icon === 'undefined' ? false : modal.icon,
                    loading: modal.loading || false,
                    delay: modal.delay || 2000
                };
                return modal;
            }
        }
    },
    data() {
        return {
            show: false,   // 是否显示模态框
            resolve: '',
            reject: '',
            promise: ''  // 保存promise对象
        }
    },
    watch: {
        show: (val, oval) => { //监听show 值 ，true 则禁止页面滚动
            // document.body.style.overflow = val ? 'hidden' : 'initial';
            $("html")[val ? 'addClass' : 'removeClass']("no-scroll");
        }
    },
    methods: {
        /**
         * 确定,将promise断定为完成态
         */
        submit() {
            this.resolve(this.modal.inputVal || 'submit');
            this.show = false;
        },
        alertSubmit(){
            this.show = false;
        },
        /**
         * 关闭,将promise断定为reject状态
         * @param type {number} 关闭的方式 0表示关闭按钮关闭,1表示取消按钮关闭
         */
        close(type) {
            this.show = false;
            this.reject(type);
        },
        confirm(ops) {
            let confirmModal = {
                submitEvt: this.submit,
                type: 'confirm',
                showCancelButton: true
            }
            this.modal = Object.assign(this.modal, confirmModal, ops);
            this.show = true;
            this.promise = new Promise((resolve, reject) => {
                this.resolve = resolve;
                this.reject = reject;
            });
            return this.promise;
        },
        alert(ops){
            let alertModal = {
                submitEvt: this.alertSubmit,
                type: 'alert',
                showCancelButton: false
            }
            this.modal = Object.assign(this.modal, alertModal, ops);
            this.show = true;
        },
        prompt(ops){
            let confirmModal = {
                submitEvt: this.submit,
                type: 'prompt',
                inputVal: '',
                showCancelButton: true
            }
            this.modal = Object.assign(this.modal, confirmModal, ops);
            this.show = true;
            this.promise = new Promise((resolve, reject) => {
                this.resolve = resolve;
                this.reject = reject;
            });
            return this.promise;
        },
        toast(ops){
            let toastModal = {
                type: 'toast',
                loading: ops.loading || false
            }
            this.modal = Object.assign(this.modal, toastModal, ops);
            this.show = true;
            setTimeout(() => {
                this.show = false;
            }, this.modal.delay);
        },
        hideLoading(){
            this.show = false;
        }
    },
    beforeCreate: function (){
      require(['components/dialogs/dialogs.css'], function (css){
      });
    }
}

</script>
