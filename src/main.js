import { createApp } from "vue";
import App from "./App.vue";
import router from "./router/index.js";
import store from "./store/index.js";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";

// 5. 创建并挂载根实例
//确保 _use_ 路由实例使用
//整个应用支持路由。
// use(store) 使所有的组件可以调用 this.$store，不需要一一import
// use(ElementPlus)全局引入
createApp(App).use(router).use(store).use(ElementPlus).mount("#app");
