<template>
  <div class="p-4 flex">
    <!-- サイドバー -->
    <div class="sidebar p-4 border-r mr-4">
      <nav class="space-y-4">
        <router-link to="/" class="block text-blue-600 hover:text-blue-800 border-b-2 pb-2">一覧</router-link>
        <router-link to="/add" class="block text-blue-600 hover:text-blue-800 border-b-2 pb-2">追加</router-link>
      </nav>
    </div>

    <!-- 編集フォーム -->
    <div class="flex-1 ml-4 p-4 overflow-auto">
      <h2 class="text-xl mb-4">編集</h2>
      <form @submit.prevent="updateTodo" class="space-y-4 flex flex-col">
        <div class="flex flex-col">
          <label for="title" class="block">タイトル</label>
          <input v-model="todo.title" id="title" class="border p-2" required />
        </div>
        <div class="flex flex-col">
          <label for="description" class="block">説明</label>
          <textarea v-model="todo.description" id="description" class="border p-2 h-24"></textarea>
        </div>
        <div class="flex flex-col">
          <label for="tag" class="block">タグ</label>
          <select v-model="todo.tag" id="tag" class="border p-2">
            <option v-for="tagName in tags" :key="tagName" :value="tagName">
              {{ tagName }}
            </option>
          </select>
        </div>
        <div class="flex flex-col">
          <label for="status" class="block">ステータス</label>
          <select v-model="todo.status" id="status" class="border p-2">
            <option value="0">未着手</option>
            <option value="1">完了</option>
            <option value="2">進行中</option>
          </select>
        </div>
        <div class="flex flex-col gap-4">  <!-- gapを調整 -->
          <button type="submit" class="text-white p-2 rounded">
            更新
          </button>
          <button @click.prevent="deleteTodo" class="text-white p-2 rounded">
            削除
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import axios from 'axios'

const route = useRoute()
const router = useRouter()
const todo = ref({ title: '', description: '', tag: '', status: 0 })
const tags = ref([])

const fetchTodo = async () => {
  try {
    const res = await axios.get('http://localhost:3000/todos', {
      params: { includeCompleted: true }  // 明示的に完了含むように指定
    });
    console.log('取得した全Todoリスト:', res.data);
    const found = res.data.find(t => t.id === parseInt(route.params.id));
    if (found) {
      console.log('該当のTodo:', found);
      todo.value = { ...found };
    } else {
      console.warn('該当するTodoが見つかりませんでした。ID:', route.params.id);
    }
  } catch (err) {
    console.error('Todoの取得に失敗:', err);
  }
};

const fetchTags = async () => {
  try {
    const res = await axios.get('http://localhost:3000/todos/tags')
    tags.value = res.data
  } catch (err) {
    console.error('タグの取得に失敗:', err)
  }
}

const updateTodo = async () => {
  try {
    await axios.put(`http://localhost:3000/todos/${route.params.id}`, todo.value)
    router.push('/')
  } catch (err) {
    console.error('更新失敗:', err)
  }
}

const deleteTodo = async () => {
  if (confirm('本当に削除しますか？')) {
    try {
      await axios.delete(`http://localhost:3000/todos/${route.params.id}`)
      router.push('/')
    } catch (err) {
      console.error('削除失敗:', err)
    }
  }
}

onMounted(() => {
  console.log('Editページに遷移しました。Todo ID:', route.params.id)
  fetchTodo()
  fetchTags()
})
</script>

<style scoped>
.flex-1 {
  flex-grow: 1;
  min-width: 0;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  padding: 1rem;
  background-color: #fff;
}

nav {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
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

div.flex {
  display: flex;
}

.flex-col {
  flex-direction: column;
}

button {
  border: 2px solid #3b82f6;
  background-color: #3b82f6;
  color: white;
  padding: 0.5rem;
  width: 100%;
  text-align: center;
  border-radius: 0.375rem;
  margin-bottom: 1rem;
}

button:hover {
  background-color: #2563eb;
  border-color: #2563eb;
}

textarea {
  height: 6rem;
}

input, textarea, select, button {
  width: 100%;
  box-sizing: border-box;
}

#tag, #status {
  text-align: center;
  font-size: 1.1rem;
  height: 3rem;
  padding: 0.5rem 1rem;
}
</style>
