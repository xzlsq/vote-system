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
          path: 'select-create',
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
    }
  ],
})

export default router
