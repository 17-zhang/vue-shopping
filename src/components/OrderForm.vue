<template>
  <div class="order-form">
    <!--标题栏-->
    <header>
      <span class="toPrifile" @click="toCart">
        <i class="el-icon-arrow-left"></i>
      </span>
      <h3>填写订单</h3>
    </header>
    <main>
      <div class="order-form-item">
        <!--购物车商品-->
        <div v-for="item in cartGoods" :key="item.id" v-if="cartGoods.length > 0" class="goods">
          <div class="left">
            <img :src="item.img" alt="">
          </div>
          <div class="right">
            <p>{{item.count}}</p>
          </div>
        </div>
        <!--订单合计-->
        <div class="order-form-item">
          <p>合计：<span class="price">￥{{pay}}</span></p>
        </div>
        <div class="order-form-item">
          <span>地址：</span>
          <el-select v-model="selectAddress" :placeholder="addressPlaceHolder" v-if="address.length > 0">
            <el-option
              v-for="(item, index) in address"
              :key="index" :label="item.name + item.phone +item.city +item.detailAdd"
              :value="index">
            </el-option>
          </el-select>
        </div>
      </div>
    </main>
    <!--底部去付款-->
    <footer class="order-form-footer">
      <div>
        <span class="price-wrap">付款 <span class="price">￥{{pay}}</span></span>
        <el-button type="danger" class="text-right" @click="toPay">去支付 <i class="el-icon-arrow-right el-icon--right"></i></el-button>
      </div>
    </footer>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    data () {
      return {
        addressPlaceHolder: '请选择地址',
        selectAddress: 0
      }
    },
    computed: {
      // 购物车商品
      cartGoods () {
        return this.$router.query.cartGoods
      },
      // 合计
      pay () {
        return this.$router.query.pay
      },
      // 地址
      address () {
        return this.$router.state.address
      }
    },
    methods: {
      toCart () {
        // 链接到购物车
        this.$router.push({
          path: '/Cart'
        })
        // 解决主页与详情页切换时，菜单栏无法更新获取当前路由
        this.$store.state.cartCounter++
        this.$store.state.cartCounter--
      },
      // 去支付
      toPay () {
        this.$store.state.cartCounter = [] // 默认是数组
        this.$store.state.cartCounter = 0 // 默认为0
        this.$router.push({ // 点击去支付跳转到Cart
          path: '/Cart'
        })
        // 解决主页与详情页切换时，菜单栏无法更新获取当前路由的问题
        this.$store.state.cartCounter++
        this.$store.state.cartCounter--
        alert('支付成功')
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../assets/css/variable";

  .order-form {
    width: 100%;
    height: 100%;
    position: absolute;
    z-index: 1001;
    background-color: #f5f5f5;

    header {
      position: relative;
      height: 50px;
      line-height: 50px;
      background-color: #fff;

      .toProfile i {
        position: absolute;
        left: 10px;
        font-size: 20px;
        top: 50%;
        transform:  translateY(-50%);
      }
    }

    main {
      margin-top: 10px;
      text-align: left;

      .order-form-item {
        padding: 10px;
        background-color: #fff;
        margin-top: 10px;
      }

      .goods {
        height: 40px;
        line-height: 40px;
        border-bottom: 1px solid #eee;
        clear: both;

        .left {
          float: left;
          height: 100%;

          img {
            height: 100%;
          }
        }

        .right {
          float: right;
        }
      }

      .address {

      }

      .price {
        color: $mainRed;
        font-size: 18px;
        font-weight: 600;
        float: right;
      }
    }

    .order-form-footer {
      position: fixed;
      width: 100%;
      height: $cartFooterHeight;  /* 40px */
      line-height: $cartFooterHeight;
      bottom: 0;
      border-top: 1px solid #eee;
      left: 0;
      text-align: right;
      background-color: #fff;

      .price-wrap {
        float: left;
        padding-left: 10px;
        font-size: 18px;
      }

      .price {
        color: $mainRed;
        font-weight: 600;
      }
    }

    .el-button--danger {
      background-color: $mainRed;
      border: none;
      border-radius: 0;
    }
  }
</style>
