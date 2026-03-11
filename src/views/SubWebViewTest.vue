<template>
  <div class="min-h-screen bg-indigo-900 text-white p-6 flex flex-col items-center justify-center text-center">
    <div class="bg-white/10 backdrop-blur-md rounded-3xl p-8 shadow-2xl border border-white/20 w-full max-w-sm">
      <div class="mb-6">
        <div class="w-16 h-16 bg-indigo-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
          <span class="text-3xl">👶</span>
        </div>
        <h1 class="text-2xl font-bold tracking-tight">Sub-WebView</h1>
        <p class="text-indigo-200 text-sm mt-1">자식 웹뷰 (ID: {{ webviewId }})</p>
      </div>

      <div class="space-y-4 mb-8">
        <div class="bg-black/20 rounded-xl p-4 text-left border border-white/5">
          <p class="text-[10px] uppercase tracking-wider text-indigo-300 font-bold mb-2">Parent로부터 받은 메시지:</p>
          <div class="text-sm font-mono break-all min-h-[1.5rem]">
            {{ lastMessageFromParent || '메시지 대기 중...' }}
          </div>
        </div>
      </div>

      <div class="flex flex-col gap-3">
        <button 
          @click="sendMessageToParent" 
          class="w-full bg-white text-indigo-900 font-bold py-4 rounded-xl shadow-lg active:scale-[0.98] transition-all hover:bg-indigo-50"
        >
          부모에게 메시지 보내기
        </button>
        
        <button 
          @click="closeSelf" 
          class="w-full bg-indigo-500/30 text-white font-semibold py-3 rounded-xl hover:bg-indigo-500/40 transition-all border border-white/10"
        >
          이 창 닫기
        </button>
      </div>
    </div>
    <p class="mt-8 text-[11px] text-indigo-300/60 uppercase tracking-widest font-medium">NativeBridge Communication Active</p>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const webviewId = ref((route.query.id as string) || 'unknown')
const lastMessageFromParent = ref('')

// 1. 부모(메인 웹뷰)로부터 메시지 수신 (네이티브가 주입한 window.onNativeMessage 호출)
const setupNativeMessageListener = () => {
  (window as any).onNativeMessage = (data: any) => {
    console.log('[SubWebView] 부모로부터 메시지 수신:', data)
    lastMessageFromParent.value = typeof data === 'object' ? JSON.stringify(data) : data
  }
}

// 2. 부모(메인 웹뷰)에게 메시지 전송 (네이티브 브릿지 호출)
const sendMessageToParent = () => {
  const message = `안녕하세요 부모님! 저는 ${webviewId.value}입니다. (${new Date().toLocaleTimeString()})`
  
  if ((window as any).NativeBridge) {
    console.log('[SubWebView] 부모에게 메시지 전송 시도:', message);
    (window as any).NativeBridge.postMessage(message)
  } else {
    console.error('[SubWebView] NativeBridge를 찾을 수 없습니다.')
    alert('네이티브 브릿지가 연결되지 않았습니다 (앱 환경에서만 작동)')
  }
}

// 3. 스스로 닫기 요청 (이벤트를 통해 부모에게 닫아달라고 요청)
const closeSelf = () => {
  if ((window as any).NativeBridge) {
    (window as any).NativeBridge.postMessage(JSON.stringify({ action: 'close', id: webviewId.value }))
  } else {
    alert('앱 환경이 아닙니다.')
  }
}

onMounted(() => {
  setupNativeMessageListener()
  console.log('[SubWebView] 페이지 로드됨. ID:', webviewId.value)
})

onUnmounted(() => {
  // 클린업 (옵션)
  delete (window as any).onNativeMessage
})
</script>

<style scoped>
/* 추가적인 스타일링이 필요하면 여기에 작성 */
</style>
