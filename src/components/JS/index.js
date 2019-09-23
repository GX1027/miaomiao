import Vue from 'vue'
import MessageBox from './MessageBox'

export const messageBox = (function () {
    //默认参数
    const defaults = {
        title: '',
        content: '',
        cancel: '',
        ok: '',
        handleCancel: null,
        handleOk: null
    }
    const MyComponent = Vue.extend(MessageBox)
    return function (opts) {
        //接受配置参数,覆盖原属性
        for (let attr in defaults) {
            defaults[attr] = opts[attr]
        }
        const vm = new MyComponent({
            el: document.createElement('div'),
            data: {
                title: defaults.title,
                content: defaults.content,
                cancel: defaults.cancel,
                ok: defaults.ok
            },
            methods: {
                handleCancel() {
                    defaults.handleCancel && defaults.handleCancel.call(this)
                    document.body.removeChild(vm.$el)
                },
                handleOk() {
                    defaults.handleOk && defaults.handleOk.call(this)
                    document.body.removeChild(vm.$el)
                }
            }
        })
        document.body.appendChild(vm.$el)
    }
})()