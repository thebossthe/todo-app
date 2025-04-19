<script>
import { ref, onMounted } from 'vue'

export default {
  setup() {
    const todos = ref([])

    onMounted(async () => {
      try {
        const res = await fetch('http://localhost:3000/todos')
        todos.value = await res.json()
      } catch (e) {
        console.error('データ取得失敗:', e)
      }
    })

    return {
      todos
    }
  }
}
</script>

<template>
  <div style="padding: 2rem">
    <h1>✅ Todo一覧</h1>
    <ul>
      <li v-for="todo in todos" :key="todo.id">
        {{ todo.title }} {{ todo.completed ? '✅' : '⬜️' }}
      </li>
    </ul>
  </div>
</template>

<style>
body {
  font-family: sans-serif;
}
</style>