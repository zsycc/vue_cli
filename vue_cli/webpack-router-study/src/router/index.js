import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import HelloRouter from '@/components/HelloRouter'
import User from '@/components/User'
import UserInfo from '@/components/UserInfo'
import Password from '@/components/Password'
//如果在一个模块化工程中使用它，必须要通过 Vue.use() 明确地安装路由功能
//在vue实例中去注册router
Vue.use(Router)

export default new Router({
  mode:'history',
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/helloRouter',
      name: 'HelloRouter',
      component: HelloRouter
    },
    {
      //路由跳转携带值
      //关于路由优先级的问题:index越小,优先级越高
      path: '/user/:id/set/:time',
      name:'User',
      component: User 
    },
    {
      path: '/userInfo',
      name: 'UserInfo',
      component: UserInfo,
      children:[
        {
          //要注意，以 / 开头的嵌套路径会被当作根路径。 这让你充分的使用嵌套组件而无须设置嵌套的路径
          path: 'password',
          name:'Password',
          component: Password
        },
        {
          path:'',
          component:Password
        },
        //命名路由
        {
          path:'/outputs',
          components:{
            default:User,
            a:UserInfo,
            b:HelloRouter
          }
        },
        //重定向
        {
          // path: '/sss',
          path: '/*',
          redirect : '/HelloRouter'
        }
      ]
    }
  ]
})
