import Vuex from 'vuex'
import Vue from 'vue'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
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
    }
  }
})
