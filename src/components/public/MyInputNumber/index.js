import MyInputNumber from './MyInputNumber'

// 手动注册一个公共组件
const InputNumber = {
  install: function (Vue) {
    Vue.component('MyInputNumber', MyInputNumber)
  }
}

export default InputNumber
