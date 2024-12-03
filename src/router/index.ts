import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import SelectCreate from '@/views/SelectCreate.vue'
console.log(import.meta)

const router = createRouter({
  // history: createWebHistory(import.meta.env.BASE_URL),
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      children: [
        {
          path: '',
          redirect: 'select-create', // 重定向方法一
        },
        {
          path: 'select-create',
          // // 重定向方法二(此处使用路径别名实现类似重定向的功能)
          // alias: '', // 子路由的路径为空则表示父路由的路径
          component: SelectCreate
        },
        {
          path: 'me',
          component: () => import('../views/Me.vue')
        }
      ]
    },
    {
      path: '/create',
      component: () => import('../views/CreateVote.vue'),
    },
    {
      path: '/vote/:id',
      component: () => import('../views/Vote.vue'),
    },
    {
      path: '/my-votes',
      component: () => import('../views/MyVotes.vue'),
    },
    {
      path: '/login',
      component: () => import('../views/login.vue'),
    }
  ],
})

export default router
