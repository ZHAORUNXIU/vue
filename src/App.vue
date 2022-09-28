<!-- <template>
  <img alt="Vue logo" src="./assets/logo.png">
  <HelloWorld msg="Welcome to Your Vue.js App"/>
</template> -->

<!-- 使用路由 -->
<template>
  <h1>Hello App!</h1>
  <span>这里直接访问 store.state.count:{{ $store.state.count }}</span><br>
  <span>这里使用计算属性访问 store.state.count:{{ $store.state.count }}</span><br>
  <span>这里使用mapState访问 store.state.count:{{ count }}-----name:{{ name }}</span><br>
  <button @click="plus">Plus</button>
  <p>
    <!--使用 router-link 组件进行导航 -->
    <!--通过传递 `to` 来指定链接 -->
    <!--`<router-link>` 将呈现一个带有正确 `href` 属性的 `<a>` 标签-->
    <router-link to="/">Go to Home</router-link><br/>
    <router-link to="/about">Go to About</router-link><br/>
    <!-- 命名路由 -->
    <router-link :to="{name: 'user',params: {id: 12}}">12号用户</router-link><br/>
    <!-- path路径 -->
    <router-link to="/user/13">13号用户</router-link><br/>
    <router-link to="/user/">未知用户</router-link><br/>
    <!-- <router-link to="/user/13/1">13号用户子账户1</router-link> -->
  </p>
  <!-- 路由出口 -->
  <!-- 路由匹配到的组件将渲染在这里 -->
  <!-- 预留，挖出的坑 -->
  <router-view name="LeftSidebar"></router-view>
  <router-view></router-view>
</template>

<script>
import { mapState } from 'vuex'
// import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
  components: {
//  HelloWorld,   
  },
  mounted() {
    // 调用$需要this，但是<template>模块中调用，不需要this
    this.$router.replace('/ad')
    setTimeout(() => {
      this.$router.push({path: '/'})
    },3000)
  },
  methods:{
    plus() {
      // this.$store.state.count++;
      this.$store.commit('increment')
    }
  },
  // 计算属性时方法
  computed: 
  // {
  //   count() {
  //      return this.$store.state.count
  //    }
  // }
   // 使用 mapRtate辅助函数生成计算属性
   mapState(
    // {
    // count: state => state.count,
    // 等同于
    // count: 'count' 
    // }
    // 解构方式：
    ['count','name']
   )
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center; 
  color: #2c3e50;
  margin-top: 60px;
}
</style>
