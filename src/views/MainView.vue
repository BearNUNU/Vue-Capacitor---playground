<template>
  <main class="max-w-md mx-auto min-h-screen bg-white shadow-xl flex flex-col sm:border-x border-gray-100">
    <header class="text-center py-5 border-b border-gray-100 bg-white sticky top-0 z-10">
      <h1 class="text-2xl font-bold text-gray-800 tracking-tight">LearningBook</h1>
      <p class="text-xs text-gray-500 mt-1 font-medium">Native Plugin Tester</p>
    </header>

    <div class="flex-1 flex flex-col gap-5 p-5 bg-gray-50">
      
      <!-- 1. 푸시 알림 -->
      <section class="native-section">
        <h2 class="section-title">🔔 푸시 알림</h2>
        <div class="flex gap-2">
          <button @click="requestPushPermission" class="btn btn-primary flex-1">권한 요청</button>
          <button @click="checkPushToken" class="btn btn-outline flex-1">토큰 확인</button>
        </div>
      </section>

      <!-- 2. 화면 제어 -->
      <section class="native-section">
        <h2 class="section-title">📱 화면 제어</h2>
        <div class="flex gap-2">
          <button @click="lockPortrait" class="btn btn-primary flex-1">세로 고정</button>
          <button @click="lockLandscape" class="btn btn-outline flex-1">가로 고정</button>
        </div>
      </section>

      <!-- 3. Status Bar 제어 -->
      <section class="native-section">
        <h2 class="section-title">🔋 Status Bar</h2>
        <div class="flex gap-2">
          <button @click="hideStatusBar" class="btn btn-primary flex-1">숨기기</button>
          <button @click="showStatusBar" class="btn btn-outline flex-1">보이기</button>
        </div>
      </section>

      <!-- 4. 키보드 제어 -->
      <section class="native-section">
        <h2 class="section-title">⌨️ 키보드 제어</h2>
        <div class="flex gap-2">
          <input 
            type="text" 
            placeholder="입력 테스트" 
            class="input-box flex-1 min-w-0"
          />
          <button @click="forceHideKeyboard" class="btn bg-rose-500 text-white hover:bg-rose-600 shrink-0">강제 내리기</button>
        </div>
      </section>

      <!-- 5. 햅틱 (진동) -->
      <section class="native-section">
        <h2 class="section-title">📳 햅틱 (진동)</h2>
        <button @click="triggerHaptic" class="btn btn-primary w-full">가벼운 진동(Haptic) 발생</button>
      </section>

      <!-- 6. 보안 저장소 (Secure Storage) -->
      <section class="native-section border-indigo-100 bg-indigo-50/30">
        <h2 class="section-title text-indigo-900">🔒 보안 저장소</h2>
        <div class="flex flex-col gap-2">
          <input 
            v-model="secureTokenInput" 
            type="text" 
            placeholder="비밀 토큰 값 입력" 
            class="input-box border-indigo-200 focus:ring-indigo-500 w-full"
          />
          <div class="flex gap-2 mt-1">
            <button @click="saveSecureToken" class="btn bg-indigo-600 text-white hover:bg-indigo-700 flex-1">안전하게 저장</button>
            <button @click="loadSecureToken" class="btn border border-indigo-600 text-indigo-700 bg-white hover:bg-indigo-50 flex-1">불러오기</button>
          </div>
        </div>
      </section>

      <!-- 딥링크 테스트 이동 (Vue Router) -->
      <section class="native-section border-emerald-100 bg-emerald-50 mt-4 shadow-sm">
        <h2 class="section-title text-emerald-800">🔗 딥링크 라우팅 테스트</h2>
        <p class="text-[11px] text-emerald-600 mb-3 px-1">앱 패키징 시 URL 스킴과 매핑될 대상 화면입니다.</p>
        <button @click="goToDeepLinkTest" class="btn bg-emerald-600 text-white hover:bg-emerald-700 w-full">클래스 상세(ID: 1001)로 이동</button>
      </section>

    </div>
  </main>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { isApp, isAndroid, isIOS, isWeb } from '@/utils/native'
import { nativeHaptic, setStatusBarVisible } from '@/utils/capacitorModule'

const router = useRouter()

// ===== 1. 푸시 알림 =====
const requestPushPermission = () => {
  console.log('[Native] 푸시 권한 요청')
}
const checkPushToken = () => {
  console.log('[Native] 푸시 토큰 확인')
}

// ===== 2. 화면 제어 =====
const lockPortrait = () => {
  console.log('[Native] 화면 세로 고정')
}
const lockLandscape = () => {
  console.log('[Native] 화면 가로 고정')
}

// ===== 3. Status Bar 제어 =====
const hideStatusBar = () => {
 if(isApp()){
  setStatusBarVisible(false)
 }else{
  alert('이 기능은 앱에서만 작동합니다.')
 }
}

const showStatusBar = () => {
 if(isApp()){
  setStatusBarVisible(true)
 }else{
  alert('이 기능은 앱에서만 작동합니다.')
 }
}

// ===== 4. 키보드 제어 =====
const forceHideKeyboard = () => {
  console.log('[Native] 키보드 강제 내리기')
}

// ===== 5. 햅틱 (진동) =====
const triggerHaptic = () => {
  console.log('[Native] 가벼운 진동(Haptic) 발생')
  if (isApp()) {
    nativeHaptic()
} else {
    alert('이 기능은 앱에서만 작동합니다.')
}
}

// ===== 6. 보안 저장소 =====
const secureTokenInput = ref('')
const saveSecureToken = () => {
  console.log(`[Native] 보안 저장소에 저장됨: ${secureTokenInput.value || '빈 값'}`)
}
const loadSecureToken = () => {
  console.log('[Native] 보안 저장소에서 불러오기 버튼 클릭')
}

// ===== 딥링크 라우팅 테스트 =====
const goToDeepLinkTest = () => {
  router.push('/class/1001')
}
</script>

<style scoped>
/* 재사용 가능한 Tailwind 클래스 유틸리티 */
.native-section {
  @apply bg-white p-4 justify-between items-stretch rounded-2xl border border-gray-100 shadow-sm flex flex-col;
}
.section-title {
  @apply text-[15px] font-bold text-gray-800 mb-3 tracking-tight;
}
.btn {
  @apply font-semibold py-3 px-3 rounded-xl transition duration-150 active:scale-[0.98] text-sm shadow-sm flex justify-center items-center;
}
.btn-primary {
  @apply bg-zinc-800 text-white hover:bg-zinc-900;
}
.btn-outline {
  @apply bg-white text-zinc-800 border border-zinc-200 hover:bg-zinc-50;
}
.input-box {
  @apply border border-gray-200 rounded-xl p-3 text-[15px] focus:outline-none focus:ring-2 focus:ring-zinc-800 bg-gray-50 text-gray-900 w-full transition-shadow;
}
</style>
