<template>
  <nav class="app-nav">
    <router-link to="/Home">
      <div class="nav-item" @click="changeNavImg">
        <div class="homeImg" :class="homeImgOn"></div>
      </div>
    </router-link>
    <router-link to="/Cart">
      <div class="nav-item" @click="changeNavImg">
        <div class="cartImg" :class="cartImgOn">
          <span class="cart-counter" v-show="cartCounter > 0">{{ cartCounter }}</span>
        </div>
      </div>
    </router-link>
    <router-link to="/Profile">
      <div class="nav-item" @click="changeNavImg">
        <div class="profileImg" :class="profileImgOn"></div>
      </div>
    </router-link>
  </nav>
</template>

<script type="text/ecmascript-6">
  export default {
    name: 'home',
    data () {
      /**
       * 为什么要写return返回？
       *    因为不使用return包裹的数据会在项目中的全局可见，会造成变量污染。
       *    使用return包裹后数据中的变量只在当前组件生效，不影响其他组件。
       */
      return {
        homeImgOn: '',
        cartImgOn: '',
        profileImgOn: '',
        imgLoadCount: 0
      }
    },
    methods: {
      // 点击导航栏菜单时，更新数据，触发 updated
      changeNavImg () {
        this.homeImgOn = ''
        this.cartImgOn = ''
        this.profileImgOn = ''
      },
      // 更新导航图标
      autoChangeCurrentImg () {
        let currentPath = this.currentPath
        if (currentPath.includes('Home')) { // 判断当前路径是否为 Home
          this.homeImgOn = 'homeImgOn'
          this.cartImgOn = ''
          this.profileImgOn = ''
        } else if (currentPath.includes('Cart')) { // 判断当前路径是否为 Cart
          this.homeImgOn = ''
          this.cartImgOn = 'cartImgOn'
          this.profileImgOn = ''
        } else if (currentPath.includes('Profile')) { // 判断当前路径是否为 Profile
          this.homeImgOn = ''
          this.cartImgOn = ''
          this.profileImgOn = 'profileImgOn'
        } else { // 以上都不是
          this.homeImgOn = ''
          this.cartImgOn = ''
          this.profileImgOn = ''
        }
      }
    },
    computed: {
      // 计算购物车数量
      cartCounter () {
        return this.$store.state.cartCounter
      },
      // 计算当前路径
      currentPath () {
        return this.$router.path
      }
    },
    // 钩子函数，调autoChangeCurrentImg()
    mounted () {
      this.autoChangeCurrentImg()
    },
    // 更新之后的钩子
    updated () {
      this.autoChangeCurrentImg()
    }
  }
</script>

<style lang="scss" scoped>
  @import "../assets/css/variable.scss";

  .app-nav {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    border-top: 1px solid #eee;
    font-size: 0;
    background-color: #fff;
    height: $NavHeight;
    z-index: 999;
  }

  .nav-item {
    height: 100%;
    display: inline-block;
    width: 33.33%;
    text-align: center;
  }
  /* 等同于 .nav-item div {} */
  .nav-item > div {
    display: inline-block;
    width: $NavHeight * 0.75;  /* 45px */
    height: $NavHeight * 0.75;  /* 45px */
    margin-top: $NavHeight * 0.125;  /* 7.5px */
  }

  .homeImg {
    background-image: url('../../static/icon/home.png');
    background-repeat: no-repeat;
    background-position: 0 0;
    background-size: $NavHeight * 0.75 * 3 $NavHeight * 0.75;  /* 135px 45px*/
  }

  .homeImgOn {
    background-position: 100% 100%;
  }

  .cartImg {
    background-image: url("../../static/icon/cart.png");
    background-repeat: no-repeat;
    background-position: 0 0;
    background-size: $NavHeight * 0.75 * 3 $NavHeight * 0.75;
  }

  .cartImgOn {
    background-position: 100% 100%;
  }

  .profileImg {
    background-image: url("../../static/icon/profile.png");
    background-repeat: no-repeat;
    background-position: 0 0;
    background-size: $NavHeight * 0.75 * 3 $NavHeight * 0.75;
  }

  .profileImgOn {
    background-position: 100% 100%;
  }

  .cart-counter {
    position: absolute;
    width: 25px;
    height: 20px;
    top: 5px;
    line-height: 20px;
    border-radius: 40%;
    background-color: $mainRed;
    color: #fff;
    font-size: 10px;
  }
</style>
