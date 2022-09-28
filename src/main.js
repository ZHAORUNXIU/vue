import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index.js'
import store from './store/index.js'


  // 5. 创建并挂载根实例
  //确保 _use_ 路由实例使用
  //整个应用支持路由。
createApp(App).use(router).use(store).mount('#app')

