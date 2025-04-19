<template>
  <div class="p-4">
    <!-- ナビゲーション -->
    <nav class="mb-4 space-x-4">
      <router-link to="/" class="text-blue-600 hover:underline">一覧</router-link>
      <router-link to="/add" class="text-blue-600 hover:underline">追加</router-link>
    </nav>

    <!-- ルーティングに応じたコンポーネント表示 -->
    <router-view />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'

const title = ref('')
const description = ref('')
const tag = ref('')

const router = useRouter()

// Todoを追加する処理
const addTodo = async () => {
  try {
    await axios.post('http://localhost:3000/todos', {
      title: title.value,
      description: description.value,
      tag: tag.value,
    })
    // フォーム初期化
    title.value = ''
    description.value = ''
    tag.value = ''

    // Todo追加後に一覧ページへ遷移
    router.push('/')
  } catch (err) {
    console.error('追加失敗:', err)
  }
}
</script>

<style>
/* スタイルはここに追加できます */
</style>
