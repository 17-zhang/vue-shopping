import Vuex from 'vuex'
import Vue from 'vue'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    username: '', // 用户名
    isLogin: false,
    address: [
      {
        name: '张三',
        phone: 11111111,
        city: '广州',
        detailAdd: '广州市白云区化成大道111号'
      },
      {
        name: '李四',
        phone: '12344566666',
        city: '南京',
        detailAdd: '建邺区富春江东街111号'
      }
    ],
    cartGoods: [], // 添加到购物车中的商品
    cartCounter: 0, // 购物车物品总数
    GoodsCurrentSelKind: 0 // 表示显示全部分类商品
  },
  mutations: {
    // 添加商品到购物车
    addGoodsToCart (state, item) {
      item.isInCart = true
      item.count++
      state.cartGoods.push(item) // 添加到购物车
      state.cartCounter++
    },
    // 从购物车中删除商品
    deleteGoodsFromCart (state, itemId) {
      state.cartCounter--
      state.cartGoods.some((val, index, Goods) => {
        if (val.id === itemId) {
          val.isInCart = false
          val.count--
          Goods.splice(index, 1)
          return true
        }
      })
    },
    // 添加商品
    addGoods (state, itemId) {
      state.cartCounter++
      state.cartGoods.some(val => {
        if (val.id === itemId) {
          val.count++
          return false
        }
      })
    },
    // 减少商品
    reduceGoods (state, itemId) {
      state.cartCounter--
      state.cartCounters.some(val => {
        if (val.id === itemId) {
          val.count--
          return true
        }
      })
    },
    // 改变选中的商品种类
    changeCurrentSelKind (state, kind) {
      state.GoodsCurrentSelKind = kind
    },
    // 登录
     login (state, username) {
      state.username = username
      state.isLogin = true // 已经处于登录状态了
    },
    // 退出登录
    logout (state) {
      state.isLogin = false
    }
  }
})
