import { createStore } from 'vuex'
import { INCREMENT_OBJ} from './mutation-types'

// 创建一个新的 store 实例
const store = createStore({
    // 视作之前的 app 实例的 data，只不过时全局的，所有组件都能访问
    // state 属性实现共享变量，甚至可以 state.count修改，但是不建议
    // 全局多个组件共享，对其操作不应该放在具体的组件中
    state () {
      return {
        count: 0,
        name: 'Tom',
        todos: [
          { id: 1, text: '学习', done: true },
          { id: 2, text: '打篮球', done: false }
        ]
      }
    },
    // 视作之前的 app 实例的 methods
    // 保存了共享数据的修改逻辑
    // 注意：必须是同步函数
    mutations: {
      increment (state) {
        state.count++
      },
      // 调用带参数n，也可以传入对象
      incrementN (state,n) {
        state.count+=n
      },
      // ES2015风格的计算属性命名功能，使用一个常量作为函数名
      // [INCREMENT_OBJ]，使用import的变量
      [INCREMENT_OBJ] (state,obj){
        state.count+=obj.n
      }
    },
    // state中派生出来的一些状态，例如：对列表进行过滤、计数
    // 可认为是store的计算属性
    getters: {
      doneCount(state) {
           return state.todos.filter(todo=>todo.done===true).length
      },
      // getters也可以接受其他getters作为第二个参数
      doneCountDouble(state,getters){
        return getters.doneCount*2
      }
    },
    // Action（类似app实例的methods）提交mutition，而不是直接变更state
    // 可以包含异步操作
    // Action 接收context对象（与store实例具有相同的方法和属性）
    // 是多个组件共享的复杂的业务逻辑
    actions: {
      // increment (context) {
      //   context.commit('increment')
      // }
      // 也可以用ES2015参数解构方式来简化
      increment ({ commit }) { 
        setTimeout(() => {
          commit('increment')
        },2000)
      }
    }

  })

  // 每个应用仅包含一个 store 实例
  // Vuex 通过 Vue 插件系统，将 store 实例从根组件诸如发哦所有的子组件中
  // 不需要频繁的 import
  export default store