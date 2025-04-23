<template>
  <div class="p-4 flex">
    <!-- サイドバー -->
    <div class="sidebar p-4 border-r mr-4"> <!-- サイドバー -->
      <nav class="space-y-4">
        <router-link to="/" class="block text-blue-600 hover:text-blue-800 border-b-2 pb-2">一覧</router-link>
        <router-link to="/add" class="block text-blue-600 hover:text-blue-800 border-b-2 pb-2">追加</router-link>
      </nav>
    </div>

    <!-- フォーム -->
    <div class="flex-1 ml-4 p-4 overflow-auto">
      <h2 class="text-xl mb-4">追加</h2>
      <form @submit.prevent="addTodo" class="space-y-4 flex flex-col">
        <!-- タイトル -->
        <div class="flex flex-col">
          <label for="title" class="block">タイトル</label>
          <input v-model="title" id="title" class="border p-2 w-full" required />
        </div>
        <!-- 説明 -->
        <div class="flex flex-col">
          <label for="description" class="block">説明</label>
          <textarea v-model="description" id="description" class="border p-2 w-full h-24"></textarea>
        </div>
        <!-- タグ -->
        <div class="flex flex-col">
          <label for="tag" class="block">タグ</label>
          <input v-model="tag" id="tag" class="border p-2 w-full" />
        </div>
        <!-- ステータス -->
        <div class="flex flex-col">
          <label for="status" class="block">ステータス</label>
          <select v-model="status" id="status" class="border p-2 w-full">
            <option value="0">未着手</option>
            <option value="1">完了</option>
            <option value="2">進行中</option>
          </select>
        </div>
        <!-- 追加ボタン -->
        <div class="flex flex-col">
          <button type="submit" class="bg-blue-600 text-white p-2 w-full border-2 border-blue-600 hover:bg-blue-700 hover:border-blue-700 rounded">
            追加
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'

const title = ref('')
const description = ref('')
const tag = ref('')
const status = ref(0)  // 追加されたステータス（未完了をデフォルトに設定）

const router = useRouter()

// Todoを追加する処理
const addTodo = async () => {
  try {
    await axios.post('http://localhost:3000/todos', {
      title: title.value,
      description: description.value,
      tag: tag.value,
      status: status.value,  // statusを送信
    })
    // フォーム初期化
    title.value = ''
    description.value = ''
    tag.value = ''
    status.value = 0  // デフォルトのステータスにリセット

    // Todo追加後に一覧ページへ遷移
    router.push('/')
  } catch (err) {
    console.error('追加失敗:', err)
  }
}
</script>

<style scoped>
/* サイドバーのスタイルを追加 */
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
.flex-1 {
  width: 400px; /* メインコンテンツの幅を固定 */
  padding: 1rem;
  background-color: #fff; /* 背景色を指定 */
  overflow-y: auto; /* コンテンツがはみ出した場合にスクロールできるように */
}

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

/* フォーム内のラベルとインプットを縦に並べて表示 */
div.flex {
  display: flex;
}

.flex-col {
  flex-direction: column;
}

/* ボタンの枠線とホバー時の変更 */
button {
  border: 2px solid #3b82f6; /* 青い枠線 */
  background-color: #3b82f6;  /* 背景色 */
  color: white; /* 文字色 */
  padding: 0.5rem;
  width: 100%; /* 横幅を100%に */
  text-align: center; /* 文字を中央に */
  border-radius: 0.375rem; /* 角を丸く */
}

button:hover {
  background-color: #2563eb;  /* ホバー時の背景色 */
  border-color: #2563eb;  /* ホバー時の枠線色 */
}

/* 説明テキストエリアの高さを4行分に設定 */
textarea {
  height: 6rem; /* 高さを約4行分に設定 */
}
</style>
