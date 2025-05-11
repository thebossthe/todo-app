<!-- src/components/TodoEdit.vue -->
<template>
  <div class="flex">
    <!-- サイドバー -->
    <Sidebar />

    <!-- 編集フォーム -->
    <div class="flex-1 ml-4 p-4 overflow-auto">
      <h2 class="text-xl mb-4">編集</h2>
      <form @submit.prevent="updateTodo" class="space-y-4 flex flex-col">
        <div class="flex flex-col">
          <label for="title" class="block">タイトル</label>
          <input v-model="todo.title" id="title" class="input-base" />
        </div>
        <div class="flex flex-col">
          <label for="description" class="block">説明</label>
          <textarea v-model="todo.description" id="description" class="input-base h-24" />
        </div>
        <div class="flex flex-col">
          <label for="tag" class="block">タグ</label>
          <select v-model="todo.tag" id="tag" class="input-base text-center">
            <option v-for="tagName in tags" :key="tagName" :value="tagName">
              {{ tagName }}
            </option>
          </select>
        </div>
        <div class="flex flex-col">
          <label for="status" class="block">ステータス</label>
          <select v-model="todo.status" id="status" class="input-base text-center">
            <option value="0">未着手</option>
            <option value="1">完了</option>
            <option value="2">進行中</option>
          </select>
        </div>
        <div class="flex flex-col gap-4">
          <button type="submit" class="btn">更新</button>
          <button @click.prevent="deleteTodo" class="btn">削除</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import Sidebar from './Sidebar.vue'
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

#tag, #status {
  text-align: center;
  font-size: 1.1rem;
  height: 3rem;
  padding: 0.5rem 1rem;
}

</style>
