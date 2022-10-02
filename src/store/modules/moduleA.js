const moduleA = {
    // 添加命名空间，高封装性、高复用性
    namespaced: true,
    state: () => ({ // 模块内的状态已经是嵌套，namespaced无影响
        count: 0
      }),
    mutations: {
        increment (state) { // namespaced有影响：commit('moduleA/increment')
          // 这里的 `state` 对象是模块的局部状态
          state.count++
        }
      },
      getters: {
        doubleCount (state) { // namespaced有影响：getters['moduleA/doubleCount']
          return state.count * 2
        },
        // 参数1：内部模块state，参数2：内部模块getters，参数3：根节点state，参数4：根节点getters
        // sumWithRootCount (state, getters, rootState, rootGetters) {
        //     getters.doubleCount
        //     rootGetters.someOtherGetter
        //     return state.count + rootState.count
        //   }
      },
    //   模块内部action，可以从context解构出局部状态 state、根节点状态 rootState、根节点的 rootGetters
    //   actions: {
    //     incrementIfOddOnRootSum ({ state, commit, rootState, rootGetters }) {  // namespaced有影响：dispatch('moduleA/incrementIfOddOnRootSum')
    //       // ...
    //     }
    //   }

    // 嵌套模块
    modules: {
        moduleA_1: {
            // 不使用 namespaced 属性，只需要继承父模块的命名空间
            state: () =>({ aa:1 }),
            getters: {
                doubleAa (state) { // namespaced有影响：getters['moduleA/doubleAa']
                    return state.aa*2
                }
            },
            // 进一步嵌套模块
            moduleA_1_1: {
                // 使用命名空间，在继承的父模块命名空间下，使用自身命名空间
                namespaced: true,
                state: () => ({aaa:2}),
                getters: {
                    doubleAaa (state) { // namespaced有影响：getters['moduleA/moduleA_1_1/doubleAaa']
                        return state.aaa*2
                    }
                }
            }
        }
    }
  }
export default moduleA