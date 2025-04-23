import { createRouter, createWebHistory } from 'vue-router'
import TodoList from '../components/TodoList.vue' // Todo一覧ページ
import TodoAdd from '../components/TodoAdd.vue' // Todo追加ページ
const baseUrl = import.meta.env.VITE_BASE_URL;

const routes = [
  {
    path: '/',
    name: 'Home',
    component: TodoList
  },
  {
    path: '/add',
    name: 'AddTodo',
    component: TodoAdd
  }
]

const router = createRouter({
  history: createWebHistory(baseUrl),
  routes
})

export default router
