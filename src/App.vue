<template>
  <div class="font-sans antialiased text-gray-900 bg-gray-50 min-h-screen">
    <router-view />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { isApp } from '@/utils/native'
import { setStatusBarVisible } from '@/utils/capacitorModule'

// 앱 초기 구동 시 상태바 강제 표시
onMounted(async () => {
  if (isApp()) {
    await setStatusBarVisible(true)
  }
})
</script>
