<template>
  <div class="flex h-screen">
    <!-- サイドバー -->
    <div class="sidebar p-4 border-r mr-4"> <!-- サイドバー -->
      <nav class="space-y-4">
        <router-link to="/" class="block text-blue-600 hover:text-blue-800 border-b-2 pb-2">一覧</router-link>
        <router-link to="/add" class="block text-blue-600 hover:text-blue-800 border-b-2 pb-2">追加</router-link>
      </nav>
    </div>

    <!-- メインコンテンツ -->
    <div class="main-content p-4 overflow-auto">
      <h2 class="text-xl mb-4">一覧</h2>
      <table class="w-full table-auto border-collapse">
        <thead>
          <tr>
            <th class="border-b-2 px-4 py-2">No</th>
            <th class="border-b-2 px-4 py-2">タイトル</th>
            <th class="border-b-2 px-4 py-2">説明</th>
            <th class="border-b-2 px-4 py-2">タグ</th>
            <th class="border-b-2 px-4 py-2">ステータス</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="todo in todos" :key="todo.id">
            <td class="border-b px-4 py-2">{{ todo.id }}</td>
            <td class="border-b px-4 py-2">{{ todo.title }}</td>
            <td class="border-b px-4 py-2">{{ todo.description }}</td>
            <td class="border-b px-4 py-2">{{ todo.tag }}</td>
            <td class="border-b px-4 py-2">
              <span :class="{
                'text-red-500': todo.status === 0,
                'text-green-500': todo.status === 1,
                'text-yellow-500': todo.status === 2
              }">
                {{ getStatusText(todo.status) }}
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const todos = ref([])

// ステータスのテキストを返す関数
const getStatusText = (status) => {
  switch (status) {
    case 0:
      return '未着手'
    case 1:
      return '完了'
    case 2:
      return '進行中'
    default:
      return '不明'
  }
}

// Todo一覧を取得する処理
const fetchTodos = async () => {
  try {
    const response = await axios.get('http://localhost:3000/todos')
    todos.value = response.data
  } catch (err) {
    console.error('Todoの取得に失敗しました:', err)
  }
}

// コンポーネントがマウントされた時にTodo一覧を取得
onMounted(() => {
  fetchTodos()
})
</script>

<style scoped>
/* サイドバーのスタイル */
.sidebar {
  width: 100px; /* サイドバーの幅を指定 */
  background-color: #f7fafc; /* 背景色 */
  border-right: 1px solid #ccc; /* 右側の罫線 */
  height: 100vh; /* サイドバーの高さを画面いっぱいに */
  padding-bottom: 1rem;
  position: sticky;
  top: 0;
  margin-right: 1rem; /* サイドバーとメインコンテンツの間に余白を追加 */
}

/* メインコンテンツ */
.main-content {
  width: 400px; /* メインコンテンツの幅を固定 */
  padding: 1rem;
  background-color: #fff; /* 背景色を指定 */
  overflow-y: auto; /* コンテンツがはみ出した場合にスクロールできるように */
}

/* フレックスの親要素に適用 */
.flex {
  display: flex; /* 横並びにする */
  height: 100vh; /* 高さを画面いっぱいに */
}

/* ナビゲーションのリンクのスタイル */
nav {
  display: flex;
  flex-direction: column; /* リストを縦並びに */
  gap: 0.5rem; /* アイテム間に隙間を追加 */
}

nav a {
  padding-bottom: 0.5rem;
  border-bottom: 2px solid #3b82f6;
  color: #3b82f6;
  text-decoration: none;
}

nav a:hover {
  color: #2563eb;
  border-color: #2563eb;
}

/* テーブルのスタイル */
table {
  width: 100%;
  border-collapse: collapse;
}

th, td {
  border: 1px solid #ccc; /* 罫線をつける */
  padding: 8px;
  text-align: left;
}

th {
  background-color: #f4f4f4;
}
</style>
