// 完成和路由相关的工作
import {createRouter,createWebHistory} from 'vue-router'
// import Home from '../components/HomePage.vue'
import About from '../components/AboutPage.vue'
import Ad from '../components/AdPage.vue'
import Login from '../components/LoginPage.vue'
import Index from '../components/user/Index.vue'
import UserProfile from '../components/user/UserProfile.vue'
import UserPosts from '../components/user/UserPosts.vue'

// 2. 定义一些路由
// 每个路由都需要映射到一个组件。
// 我们后面再讨论嵌套路由。
const routes = [
    { 
        path: '/',
        // 命名视图 
        components: {
            // 函数引入，替代头部 import Home from '../components/HomePage.vue'
            // default: Home,
            default: () => import('@/components/HomePage.vue'),
            LeftSidebar:About 
        } },
    // 重定向,改变url
    { path: '/home', redirect: '/' },
    // 别名,不改变url，指向同一个组件
    // { path: '/about', component: About, alias:['/myAbout','/thisAbout'] },
    { path: '/ad', component: Ad },
    { path: '/login', component: Login },
    { 
        // path: '/user/:id(\\d+)*', 
        path: '/user/:id(\\d+)',
        name: 'user',
        // 任意信息附加到路由
        meta: {requiresAuth: false}, 
        // 向组件component里传参，route.params 将被设置为组件的props
        // 如果使用命名视图（多个components），则 props：{default: true, sidebar: false}
        props: true,
        // 当参数为静态时，设置为对象形式，按原样设置component的props
        // props: {id:18,name:'Lisa'},
        component: Index,
        children: [
            {
                // 当 /user/:id/profile 匹配成功
                // UserProfile 将被渲染到 User 的 <router-view> 内部
                path: 'profile',
                component: UserProfile,
              },
              {
                // 当 /user/:id/posts 匹配成功
                // UserPosts 将被渲染到 User 的 <router-view> 内部
                path: 'posts',
                component: UserPosts,
              },
        ],
    },
  ]
  
  // 3. 创建路由实例并传递 `routes` 配置
  // 你可以在这里输入更多的配置，但我们在这里
  // 暂时保持简单
  const router = createRouter({
    // 4. 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
    // history: createWebHashHistory(),
    history: createWebHistory(),
    routes, // `routes: routes` 的缩写
  })

  // 动态路由，模拟服务端获取数据，添加路由
  let about = { path: '/about', component: About, alias:['/myAbout','/thisAbout'] }
  router.addRoute(about)

  // 全局的路由守卫（类似Java filter）
  router.beforeEach((to, from) => {
    console.log(from)
    console.log(to)

    if(to.meta.requiresAuth){
        return {
            path: '/login',
            // 保存我们所在的位置，以便以后再来
            query: { redirect: to.fullPath },
        }
    }
    // ...
    // 返回 false 以取消导航
    return true
  })
  export default router