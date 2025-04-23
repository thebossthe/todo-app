<template>
  <div class="container mx-auto p-4">
    <!-- ヘッダー（任意） -->
    <header class="mb-4 text-2xl font-bold">
      <h1>ToDoアプリ</h1>
    </header>

    <!-- ナビゲーション（共通） -->

    <!-- ルートに応じたコンポーネントを表示 -->
    <router-view />
  </div>
</template>

<script setup>
</script>

<style scoped>
/* 必要に応じてスタイルを追加します */
</style>
