<template>
  <form @submit.prevent="addTodo" class="space-y-4">
    <!-- タイトル入力フィールド -->
    <div>
      <input 
        v-model="title" 
        type="text" 
        placeholder="タイトル(必須)" 
        class="border p-2 rounded w-full" 
        required
      />
    </div>
    
    <!-- 説明入力フィールド -->
    <div>
      <input 
        v-model="description" 
        type="text" 
        placeholder="説明" 
        class="border p-2 rounded w-full" 
      />
    </div>
    
    <!-- タグ入力フィールド -->
    <div>
      <input 
        v-model="tag" 
        type="text" 
        placeholder="タグ" 
        class="border p-2 rounded w-full" 
      />
    </div>

    <!-- 追加ボタン -->
    <button 
      type="submit" 
      class="bg-blue-500 text-white px-6 py-4 rounded hover:bg-blue-800 w-full"
    >
      追加
    </button>
  </form>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'

// タスクのデータ
const title = ref('')
const description = ref('')
const tag = ref('')

// イベント emit を定義
const emit = defineEmits(['todo-added'])

// タスクを追加する関数
const addTodo = async () => {
  try {
    // APIにデータを送信
    const response = await axios.post('http://localhost:3000/todos', {
      title: title.value,
      description: description.value,
      tag: tag.value,
    })

    // 成功した場合、フォームをリセット
    title.value = ''
    description.value = ''
    tag.value = ''

    // 親コンポーネントにタスク追加の通知を送る
    emit('todo-added', response.data) 

    console.log('タスクが追加されました:', response.data)
  } catch (err) {
    console.error('タスク追加失敗:', err)
  }
}
</script>
