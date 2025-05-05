import { createRouter, createWebHistory } from 'vue-router'
import TodoList from '../components/TodoList.vue' // Todo一覧ページ
import TodoAdd from '../components/TodoAdd.vue'   // Todo追加ページ
import TodoEdit from '../components/TodoEdit.vue' // Todo編集ページ

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
  },
  {
    path: '/edit/:id', // 編集ページ用ルート
    name: 'EditTodo',
    component: TodoEdit,
    props: true         // これにより `id` を props 経由で渡せる
  }
]

const router = createRouter({
  history: createWebHistory(baseUrl),
  routes
})

router.beforeEach((to, from, next) => {
  console.log(`遷移: from=${from.fullPath} → to=${to.fullPath}`);
  next();
});

export default router
