<template>
    <!-- $route 访问路由实例 -->
    <!-- <div>User {{ $route.params.id }}</div> -->
    <!-- 使用 $route 组件会与 router 紧密耦合，限制了灵活性 -->
    <div>User {{ id }}</div>
    <router-link v-bind:to="'/user/'+$route.params.id+'/profile'">用户头像</router-link><br>
    <router-link v-bind:to="'/user/'+$route.params.id+'/posts'">用户岗位</router-link><br>
    <router-view></router-view>
</template>

<script>
    
export default {
    name: 'App',
    // 从路由组件传入的参数
    props: ['id','name'],
    components: {},
    mounted(){
        console.log(this.id)
        console.log(this.name)
    }
}
</script>