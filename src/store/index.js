import { createStore } from 'vuex'

// 创建一个新的 store 实例
const store = createStore({
    // 视作之前的 app 实例的 data，只不过时全局的，所有组件都能访问
    // state 属性实现共享变量，甚至可以 state.count修改，但是不建议
    // 全局多个组件共享，对其操作不应该放在具体的组件中
    state () {
      return {
        count: 0,
        name: 'Tom'
      }
    },
    // 视作之前的 app 实例的 methods
    // 保存了共享数据的修改逻辑
    mutations: {
      increment (state) {
        state.count++
      }
    }
  })

  // 每个应用仅包含一个 store 实例
  // Vuex 通过 Vue 插件系统，将 store 实例从根组件诸如发哦所有的子组件中
  // 不需要频繁的 import
  export default store