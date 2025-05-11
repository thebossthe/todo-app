<!-- src/components/TodoList.vue -->
<template>
  <div class="flex h-screen">
    <!-- サイドバー -->
    <Sidebar />

    <!-- メインコンテンツ -->
    <div class="main-content w-full flex-grow min-w-0 p-4">
      <h2 class="text-xl mb-4">一覧</h2>

      <!-- ページングボタン -->
      <div class="mt-4 justify-center items-center space-x-2">
        <button
          @click="goToPage(currentPage - 1)"
          :disabled="currentPage === 1"
          class="px-3 py-1 border rounded"
          >
          前へ
        </button>
        <span>ページ {{ currentPage }} / {{ totalPages }}</span>
        <button
          @click="goToPage(currentPage + 1)"
          :disabled="currentPage === totalPages"
          class="px-3 py-1 border rounded"
          >
          次へ
        </button>

        <!-- 完了も含むチェックボックス -->
        <label>
          <input type="checkbox" v-model="showCompleted"/>
          完了も含む
        </label>
      </div>

      <table class="w-full border-collapse">
        <thead>
          <tr>
            <th class="w-[5%]">No</th>
            <th class="w-[18%]">タイトル</th>
            <th class="w-[55%]">説明</th>
            <th class="w-[7%]">タグ</th>
            <th class="w-[10%]">ステータス</th>
            <th class="w-[5%]">操作</th> 
          </tr>
        </thead>
        <tbody>
          <tr v-for="todo in paginatedTodos" :key="todo.id">
            <td>{{ todo.id }}</td>
            <td>{{ todo.title }}</td>
            <td>{{ todo.description }}</td>
            <td>{{ todo.tag }}</td>
            <td>{{ getStatusText(todo.status) }}</td>
            <td>
              <router-link :to="`/edit/${todo.id}`" class="text-blue-700">編集</router-link>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import Sidebar from './Sidebar.vue'
import { ref, onMounted, computed, watch } from 'vue'
import axios from 'axios'

const todos = ref([])
const showCompleted = ref(false) // 完了も含むチェックボックス
const currentPage = ref(1);
const itemsPerPage = 10; // 1ページあたりの件数

// ステータスのテキストを返す関数
const getStatusText = (status) => {
  const numericStatus = Number(status); 
  switch (numericStatus) {
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
  console.log('Fetching Todos...', { includeCompleted: showCompleted.value });  // リクエスト時のパラメータを確認
  try {
    const response = await axios.get('http://localhost:3000/todos', {
      params: { includeCompleted: showCompleted.value }
    });
    console.log('Fetched Todos:', response.data);  // レスポンス内容を確認
    todos.value = response.data;
  } catch (err) {
    console.error('Todoの取得に失敗しました:', err);
  }
};

// 完了も含むオプションを反映したfilteredTodosを計算プロパティでフィルタリング
const filteredTodos = computed(() => {
  console.log("Filtered Todos: ", todos.value); // フィルタリング前の todos を確認
  if (showCompleted.value) {
    return todos.value
  } else {
    return todos.value.filter(todo => todo.status !== '1') // 完了状態以外を表示
  }
})

// コンポーネントがマウントされた時にTodo一覧を取得
onMounted(() => {
  fetchTodos()
})

// 完了も含むオプション変更時に再検索
watch(showCompleted, () => {
  console.log('showCompleted changed:', showCompleted.value);  // showCompletedの状態確認
  fetchTodos()
  currentPage.value = 1;
});

const paginatedTodos = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return filteredTodos.value.slice(start, end);
});

const totalPages = computed(() => {
  return Math.ceil(filteredTodos.value.length / itemsPerPage);
});

const goToPage = (page) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page;
  }
};
</script>

<style scoped>
button {
  border: 2px solid #3b82f6;
  background-color: #3b82f6;
  color: white;
  padding: 0.5rem;
  text-align: center;
  border-radius: 0.375rem;
  margin-bottom: 1rem;
}

button:hover {
  background-color: #2563eb;
  border-color: #2563eb;
}

/* メインコンテンツ */
.main-content {
  flex-grow: 1;  /* メインコンテンツをサイドバーの隣で可動させる */
  padding: 1rem;
  background-color: #fff;
  overflow-y: auto;
}

/* フレックスの親要素に適用 */
.flex {
  display: flex;
  height: 100vh;
  flex-wrap: nowrap; /* 子要素が横並びになるように */
  justify-content: space-between; /* 余白を均等に分配 */
}

/* サイドバーとメインコンテンツの間に余白を設定 */
.flex > * {
  box-sizing: border-box;
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
  table-layout: auto; /* 列幅をコンテンツに基づいて調整 */
}

th, td {
  border: 1px solid #adadad; /* 罫線をつける */
  padding: 8px;
  text-align: left;
}

th {
  background-color: #f4f4f4;
}

/* テキストが長い場合に折り返す */
td {
  white-space: normal;
  overflow-wrap: break-word;
  word-break: break-all;
}
</style>
