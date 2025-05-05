<template>
  <div class="min-h-screen">
    <!-- ヘッダー -->

    <!-- ルートに応じたコンポーネントを表示 -->
    <router-view />
  </div>
</template>

<script setup>
</script>

<style>
html, body, #app {
  margin: 0;
  padding: 0;
  height: 100%;
}

* {
  box-sizing: border-box;
}

.min-h-screen {
  min-height: 100vh;
}

header {
  flex-shrink: 0; /* ヘッダーは縮小しないように */
}
</style>