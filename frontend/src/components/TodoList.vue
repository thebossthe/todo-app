<template>
  <div class="bg-white p-6 rounded shadow-md">
    <h2 class="text-xl font-bold mb-4">Todo一覧</h2>
    <ul>
      <li v-for="todo in todos" :key="todo.id" class="border-b py-2">
        <strong>{{ todo.title }}</strong> - {{ todo.description }}
      </li>
    </ul>
  </div>
</template>
  
  <script setup>
  import { ref, onMounted } from 'vue'
  import axios from 'axios'
  
  const todos = ref([])
  
  // APIから一覧を取得
  const fetchTodos = async () => {
    const res = await axios.get('/api/todos')
    todos.value = res.data
  }
  
  onMounted(fetchTodos)
  </script>
  