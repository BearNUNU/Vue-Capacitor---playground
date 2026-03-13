import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import { overrideNativeBridge } from './utils/nativeOverrides'

// 네이티브 브릿지/웹 브라우저 인터페이스 전역 오버라이드 초기화
overrideNativeBridge()

const app = createApp(App)
app.use(router)
app.mount('#app')
