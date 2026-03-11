<template>
  <main class="max-w-md mx-auto min-h-screen bg-white shadow-xl flex flex-col sm:border-x border-gray-100">
    <header class="text-center py-5 border-b border-gray-100 bg-white sticky top-0 z-10">
      <h1 class="text-2xl font-bold text-gray-800 tracking-tight">LearningBook</h1>
      <p class="text-xs text-gray-500 mt-1 font-medium">Native Plugin Tester</p>
    </header>

    <div class="flex-1 flex flex-col gap-5 p-5 bg-gray-50">

      <!-- 7. Multi WebView 테스트 (양방향 통신) -->
      <section class="native-section border-indigo-100 bg-white mt-4 border-2 border-dashed">
        <h2 class="section-title text-indigo-800">🖼️ Multi WebView (양방향)</h2>
        <p class="text-[11px] text-indigo-600 mb-3 px-1">부모-자식 웹뷰 간 실시간 이벤트 전달 테스트</p>
        
        <div class="bg-indigo-50 rounded-xl p-3 mb-4 border border-indigo-100">
            <p class="text-[10px] text-indigo-400 font-bold uppercase mb-1">자식으로부터 받은 데이터:</p>
            <div class="text-sm font-medium text-indigo-900 break-all min-h-[1.25rem]">
                {{ lastReceivedData || '데이터 없음' }}
            </div>
        </div>

        <div class="flex flex-col gap-2">
          <button @click="handleOpenSubWebView" class="btn bg-indigo-600 text-white hover:bg-indigo-700 w-full">서브 웹뷰 열기</button>
          <div class="flex gap-2">
            <button @click="handleSendMessageToChild" class="btn border border-indigo-600 text-indigo-600 flex-1">자식에게 메시지 전송</button>
            <button @click="handleCloseSubWebView" class="btn bg-gray-200 text-gray-700 flex-1">웹뷰 닫기</button>
          </div>
        </div>
      </section>

    </div>
  </main>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { isApp, isAndroid, isIOS, isWeb } from '@/utils/native'
import { nativeHaptic, setStatusBarVisible } from '@/utils/capacitorModule'
import { registerPlugin } from '@capacitor/core'
import type { MultiWebViewPlugin } from 'capacitor-multi-webview'

const MultiWebView = registerPlugin<MultiWebViewPlugin>('MultiWebView')

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

// ===== 7. Multi WebView 테스트 =====
const subWebViewId = 'test-sub-webview'
const lastReceivedData = ref('')

// 서브 웹뷰로부터 오는 메시지 리스너 등록
onMounted(async () => {
    if (isApp()) {
        await MultiWebView.addListener('onSubWebViewMessage', (payload) => {
            console.log('[Native] 서브 웹뷰 메시지 수신:', payload)
            lastReceivedData.value = `[${payload.webviewId}] ${payload.data}`
            
            // 만약 자식이 닫아달라고 요청했다면 처리
            try {
                const parsed = JSON.parse(payload.data)
                if (parsed.action === 'close') {
                    handleCloseSubWebView()
                }
            } catch (e) { /* 일반 문자열 메시지인 경우 패스 */ }
        })
    }
})

const handleOpenSubWebView = async () => {
    console.log('[Native] 서브 웹뷰 열기 시도')
    if (isApp()) {
        try {
            // 루트 앱에서 제공하는 테스트 경로 (/sub-webview-test) 로 접속
            await MultiWebView.openWebView({ 
                url: `/sub-webview-test?id=${subWebViewId}`, 
                webviewId: subWebViewId 
            })
        } catch (e) {
            alert(`열기 실패: ${e}`)
        }
    } else {
        alert('이 기능은 앱에서만 작동합니다.')
    }
}

const handleCloseSubWebView = async () => {
    console.log('[Native] 서브 웹뷰 닫기 시도')
    if (isApp()) {
        await MultiWebView.closeWebView({ webviewId: subWebViewId })
    }
}

const handleSendMessageToChild = async () => {
    const msg = `반갑다 자식아! (${new Date().toLocaleTimeString()})`
    console.log('[Native] 자식에게 메시지 전송 시도:', msg)
    if (isApp()) {
        await MultiWebView.postMessageToWebView({ 
            webviewId: subWebViewId, 
            data: msg 
        })
    }
}

// 딥링크 라우팅 테스트 =====
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
