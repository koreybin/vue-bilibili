import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/views/Login.vue'
import register from '@/views/register.vue'
import userinfo from '@/views/userinfo.vue'
import edit from '@/views/Edit.vue'
import home from '@/views/home.vue'
import article from '@/views/article.vue'
Vue.use(Router)


const router = new Router({
  routes: [
    {
      path:'/',
      redirect:'/login'
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '/register',
      component: register
    },
    {
      path: '/userinfo',
      component: userinfo,
      istoken:true
    },
    {
      path:'/edit',
      component: edit,
      meta:{
        istoken:true
      }
    },
    {
      path:'/home',
      component: home,
      meta:{
        keepalive:true,
      }
    },
    {
      path:'/article/:id',
      component: article
    }
    
  ]
})
router.beforeEach((to,from,next) => {
    if( (!localStorage.getItem('token') || !localStorage.getItem('id')) && to.meta.istoken == true ){
      router.push('/login')
      Vue.prototype.$msg.fail('请先登录！')
      return 
    }
    next()
  })

 
  
export default router