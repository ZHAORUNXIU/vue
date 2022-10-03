<!-- <template>
  <img alt="Vue logo" src="./assets/logo.png">
  <HelloWorld msg="Welcome to Your Vue.js App"/>
</template> -->

<!-- 使用路由 -->
<template>
  <h1>Hello App!</h1>
  <span>这里直接访问 store.state.count:{{ $store.state.count }}</span><br>
  <span>这里使用计算属性访问 store.state.count:{{ count }}</span><br>
  <span>这里使用mapState访问 store.state.count:{{ count }}-----name:{{ name }}</span><br>
  <button @click="increment">Plus</button><br>
  <button @click="plus10">Plus10</button><br>
  <button @click="plus20">Plus20</button><br>
  <span>查看今天完成了多少个日程:{{ doneCount }}</span><br>
  <span>查看double结果:{{ doneCountDouble }}</span><br>
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
  <br>
  <span>这里获取setup中number的值: {{ number }}---<input v-model="number"></span>
</template>

<script>
import { mapState,mapGetters,mapActions } from 'vuex'
import { INCREMENT_OBJ } from '@/store/mutation-types.js'
// import HelloWorld from './components/HelloWorld.vue'
import { ref } from 'vue'

export default {
  name: 'App',
  components: {
//  HelloWorld,   
  },
  // setup 响应式API，集中处理共同主题的内容，并暴露，不需要再 data 中再次暴露
  // 可以理解为，提取了一部分代码到 setup 当中
  setup() {
    //此处非响应式
    // return { number: 2 }
    let number = ref(2)
    return { number }
  },
  mounted() {
    // 调用$需要this，但是<template>模块中调用，不需要this
    this.$router.replace('/ad')
    setTimeout(() => {
      this.$router.push({path: '/'})
    },3000)
  },
  data () {
    return{
      num:0
    }
  },
  methods:{
    plus() {
      // this.$store.state.count++;
      // this.$store.commit('increment')
      // 改调用store的actions方法：分发Action
      this.$store.dispatch('increment')
    },
    // 需要携带附加参数
    plus10() {
      this.$store.commit('incrementN',10)
    },
    // 如果对象的方式传递参数，即 incrementObj (state,obj){}，则需要对象的方式commit
    plus20() {
      // this.$store.commit({type:'incrementObj',n:20})
      // 改用 INCREMENT_OBJ 变量替代 'incrementObj'
      this.$store.commit({type: INCREMENT_OBJ,n:20})
    },
    ...mapActions(['increment'])
  },
  // 计算属性是方法
  // 注意：计算属性不能对属性值进行赋值、修改，只能依赖这个属性值得到另一个值
  computed: {
    // 使用...对象展运算符，将mapstate返回的对象和局部计算属性合并
    myNum() {
      return this.num+10
    },
  //   count() {
  //      return this.$store.state.count
  //    }
   // 使用 mapState辅助函数生成计算属性
   ...mapState(
    // {
    // count: state => state.count,
    // 等同于
    // count: 'count' 
    // }
    // 解构方式：
    ['count','name']
   ),
  //  doneCount() {
  //     return this.$store.state.todos.filter(todo=>todo.done===true).length
  //   }
  // 如果多个组件需要用到此计算属性，需要复制，不够理想，此处移动到store的getter对象中（全局可用）
  // 用计算属性访问store的getter属性，方法类似state
  // 方法一：直接调用
  // doneCount(){
  //   return this.$store.getters.doneCount
  // }
  // 方法二：使用 mapGetters辅助函数生成计算属性
  ...mapGetters(['doneCount','doneCountDouble'])
  }
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
