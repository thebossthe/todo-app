import { createRouter, createWebHistory } from 'vue-router'
import TodoAdd from '../components/TodoAdd.vue' // TodoAdd.vueをインポート

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../components/TodoList.vue') // ホームページ
  },
  {
    path: '/add', // `/add` でTodo追加ページを表示
    name: 'AddTodo',
    component: TodoAdd
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
