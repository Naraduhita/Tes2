import { createRouter, createWebHistory } from 'vue-router'
import TodoApp from '../components/TodoApp.vue'
import TaskEditor from '../components/TaskEditor.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
  {
    path: '/',
    name: 'Home',
    component: TodoApp
  },
  {
    path: '/Wishlist',
    name: 'Cat1',
    component: () => import('../views/Cat1.vue')
  },
  {
    path: '/Work',
    name: 'Cat2',
    component: () => import('../views/Cat2.vue')
  },
  {
    path: '/editTask',
    name: 'TaskEditor',
    component: TaskEditor
  },
  {
    path: '/update/:id',
      name: 'update',
      component: () => import('../components/TaskEditor.vue')
  },
]
})

export default router
