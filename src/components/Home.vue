<template>
  <div class="home">
    <home-header></home-header>
    <div class="home-main">
      <!--<transition-group> 元素作为多个元素/组件的过渡效果。-->
      <transition-group enter-active-class="slideInRight">
        <ul class="goods animated" :key="animatedCurrentKey">
          <li v-for="item in goods" :key="item.id" class="one-com" v-show="isCurrent(item.kind)">
            <one-commodity
              :itemId="item.id"
              :imgUrl="item.img"
              :title="item.title"
              :content="item.content"
              :price="item.price"
              :count="0">
            </one-commodity>
          </li>
        </ul>
        <div :key="'0' + animatedCurrentKey">
          <p class="no-more-goods">没有更多商品啦，敬请期待!!!</p>
        </div>
      </transition-group>
    </div>
    <!--二维码对话框-->
    <!--.sync是双向绑定修饰符，实现了父子组件的双向绑定数据-->
    <el-dialog title="提示" :visible.sync="dialogVisible" width="30%">
      <p>这是手机端应用，用手机微信，或浏览器扫码打开，或chrome浏览器手机调试模式下打开效果更佳哦。</p>
      <img src="../../static/qrcode.png" height="280" width="280">
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script type="text/ecmascript-6">
  import HomeHeader from './HomeHeader.vue'
  import OneCommodity from './HomeOneCommodity.vue'

  export default {
    name: 'home',
    components: {
      HomeHeader: HomeHeader,
      OneCommodity: OneCommodity
    },
    data () {
      // 判断浏览器类型。
      // userAgent属性是一个只读字符串，声明了浏览器用于Http请求的用户代理头的值
      var UA = navigator.userAgent
      // 判断是否为ipad,iphone,android
      var ipad = !!(UA.match(/(iPad).*OS\s([\d_]+)/))
      var isIphone = !!(!ipad && UA.match(/(iPhone\sOS)\s([\d_]+)/))
      var isAndroid = !!(UA.match(/(Android)\s+([\d.]+)/))
      var isPC = !(isIphone || isAndroid || ipad)
      return {
        goods: [],
        dialogVisible: isPC
      }
    },
    computed: {
      animatedCurrentKey () {
        return this.$store.state.GoodsCurrentSelKind
      }
    },
    methods: {
      // 分类按钮点击
      isCurrent (itemKind) {
        let currentKind = this.$store.state.GoodsCurrentSelKind
        if (currentKind === 0) {
          // 0表示全部商品
          return true
        } else {
          return itemKind === currentKind
        }
      }
    },
    mounted () {
      // 获取数据
      this.axios.get('/shoppingApp/static/data/github-goods.json')
        .then(res => {
          this.goods = [...res.data]
        })
        // 捕获异常后，使用另一个json数据
        .catch(() => {
          this.axios.get('http://localhost:8080/static/data/goods.json')
            .then(res => {
              this.goods = [...res.data]
            })
        })
    }
  }
</script>

<style lang="scss" scoped>
  @import "../assets/css/variable.scss";

  .home {
    width: 100%;
    padding-bottom: $NavHeight + 5px;
    padding-top: $HomeHeaderHeight;
  }

  .home-main {
    width: 100%;
    overflow-x: hidden;
  }

  .goods {
    width: 100%;
    list-style: none;
    padding: 0;
  }

  .goods > li {
    width: 100%;
  }

  .no-more-goods {
    height: 40px;
    line-height: 40px;
  }

  .slideInRight {
    animation-duration: 0.25s;  /* 定义动画完成一个周期所需要的时间，以秒或毫秒计。 */
  }
</style>
