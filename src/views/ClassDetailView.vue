<template>
  <div class="max-w-md mx-auto min-h-screen bg-white sm:border-x sm:border-gray-100 flex flex-col">
    <!-- 네비게이션 바 -->
    <header class="bg-white border-b border-gray-100 p-4 flex items-center sticky top-0">
      <button @click="goBack" class="p-2 -ml-2 text-gray-400 active:text-gray-900 transition-colors">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="w-6 h-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
        </svg>
      </button>
      <h1 class="text-lg font-bold text-gray-800 ml-1">클래스 상세</h1>
    </header>

    <!-- 상세 내용 콘텐츠 공간 -->
    <main class="flex-1 flex flex-col justify-center items-center p-6 bg-gray-50/50">
      <div class="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 w-full text-center">
        <div class="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mb-5">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-8 h-8">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
          </svg>
        </div>
        
        <h2 class="text-3xl font-extrabold text-gray-900 mb-2">
          ID: <span class="text-emerald-500">{{ route.params.id }}</span>
        </h2>
        
        <p class="text-gray-500 text-sm mb-8 leading-relaxed">
          딥링크 테스트를 위한 페이지입니다.<br/>
          Capacitor의 App 플러그인을 사용하여 URL 오픈 시 이 라우트로 처리되도록 패키징합니다.
        </p>

        <button @click="testDetailAction" class="w-full bg-emerald-600 text-white font-semibold py-3.5 px-4 rounded-xl active:bg-emerald-700 active:scale-[0.98] transition-all shadow-sm">
          콘텐츠 상호작용 (테스트)
        </button>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const goBack = () => {
  // 실제 앱에서는 window.history가 비어있을 수 있으므로 대비할 수 있습니다
  router.back()
}

const testDetailAction = () => {
  console.log(`[Native/Web] 상세페이지(클래스 ID ${route.params.id}) 액션 수행!`)
}
</script>
