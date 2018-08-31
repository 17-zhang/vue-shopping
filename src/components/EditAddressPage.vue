<template>
  <div class="edit-address-page">
    <header>
      <!--点击箭头返回Profile-->
      <span class="toProfile" @click="toProfile">
        <i class="el-icon-arrow-left"></i>
      </span>
      <h3>我的收货地址</h3>
    </header>
    <!--主体内容区域-->
    <main>
      <!--判断地址的个数-->
      <ul class="all-address" v-if="allAddress.length > 0">
        <li class="address" v-for="(item, index) in allAddress" :key="item.id">
          <p>{{item.name}}</p>
          <p>{{item.phone}}</p>
          <p>{{item.city + item.detailAdd}}</p>
          <el-button type="text" @click="toModifyAddress(index)">编辑</el-button>
        </li>
      </ul>
    </main>
    <footer>
      <el-button type="danger" @click="toAddressInputForm">新增收货地址</el-button>
    </footer>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    data () {
      return {}
    },
    computed: {
      allAddress () {
        return this.$store.state.address
      }
    },
    methods: {
      toProfile () {
        this.$router.push({
          path: '/Profile'
        })
        // 解决主页与详情页切换时，菜单栏无法更新获取当前路由的问题
        this.$store.state.cartCounter++
        this.$store.state.cartCounter--
      },
      toAddressInputForm () {
        // 跳转到新增收货地址
        this.$router.push({
          path: '/Profile/AddNewAddress'
        })
      },
      toModifyAddress (index) {
        // 跳转到修改地址
        this.$router.push({
          path: '/Profile/ModifyAddress',
          query: {
            index: index
          }
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../assets/css/variable";

  .edit-address-page {
    width: 100%;
    height: 100%;
    position: absolute;
    z-index: 1001;
    background-color: #f5f5f5;

    header {
      position: relative;
      height: 50px;
      border-bottom: 1px solid #eee;
      line-height: 50px;
      background-color: #fff;

      .toProfile i {
        position: absolute;
        left: 10px;
        font-size: 20px;
        top: 50%;
        transform: translateY(-50%);
      }
    }

    main {
      margin-top: 10px;
      text-align: left;
      line-height: 23px;

      .all-address {
        background-color: #fff;

        .address {
          position: relative;
          padding: 10px;
          border-top: 1px solid #eee;

          .el-button {
            position: absolute;
            right: 10px;
            top: 50%;
            transform: translateY(-50%);
          }
        }
      }
    }

    footer {
      position: fixed;
      width: 100%;
      bottom: 10px;
      left: 0;

      .el-button--danger {
        width: 90%;
        background-color: $mainRed;
      }
    }
  }
</style>
