<!-- src/components/TodoFrom.vue -->
<template>
    <form @submit.prevent="submitTodo" class="space-y-4">
      <div>
        <label>タイトル:</label>
        <input v-model="title" required class="border p-2 w-full" />
      </div>
      <div>
        <label>説明:</label>
        <textarea v-model="description" class="border p-2 w-full"></textarea>
      </div>
      <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded">追加</button>
    </form>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import axios from 'axios'
  
  const title = ref('')
  const description = ref('')
  
  const submitTodo = async () => {
    await axios.post('/api/todos', {
      title: title.value,
      description: description.value
    })
  
    // 入力をクリア
    title.value = ''
    description.value = ''
    
    // ページを更新 or emit でリスト更新
    location.reload()  // 一時対応（あとで改善可）
  }


  import { useRouter } from 'vue-router'
  const router = useRouter()

  // 成功後に遷移
  await axios.post('/api/todos', {
    title: form.title,
    description: form.description,
    tag: form.tag
  })
  router.push('/')
  </script>
  