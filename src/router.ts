import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('./views/LoginView.vue')
  },
  {
    path: '/',
    name: 'Home',
    component: () => import('./views/MainView.vue')
  },
  {
    path: '/sub-webview',
    name: 'SubWebView',
    component: () => import('./views/SubWebViewTest.vue')
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// === 앱 진입 시 (또는 라우터 변경 시) 세션 쿠키 검증 ===
router.beforeEach(async (to, from, next) => {
  // 로그인 화면은 누구나 접근 가능하므로 그냥 통과시킵니다.
  if (to.path === '/login') {
    return next()
  }

  try {
    let fetchUrl = 'http://192.168.1.3:8080/api/auth/me';

    // 서브 웹뷰(NativeBridge가 주입되어 있음) 환경에서는 Capacitor 플러그인이 자동으로 연동되지 않아서, 
    // 브라우저의 기본 fetch가 사용되고 이로 인해 cross-origin HTTP SameSite 제한에 걸려 HttpOnly 쿠키가 제외됩니다. 
    // 안드로이드 Capacitor 내부 인터페이스인 /_capacitor_http_interceptor_ 경로를 통해 요청하면 
    // 네이티브 HttpURLConnection을 사용하여 쿠키를 포함하여 통신하고 SameSite 제약을 우회할 수 있습니다.
    if ((window as any).NativeBridge) {
      fetchUrl = `http://localhost/_capacitor_http_interceptor_?u=${encodeURIComponent(fetchUrl)}`;
      console.log(`[라우터] 서브 웹뷰 감지됨. 인터셉터 URL 우회:`, fetchUrl);
    }

    const response = await fetch(fetchUrl, {
      method: 'GET',
      credentials: 'include'
    })

    console.log(`[라우터] 응답 수신. 상태코드:`, response.status);
    const data = await response.json()
    console.log(`[라우터] 인증 응답 데이터:`, JSON.stringify(data));

    if (response.ok && data.success) {
      console.log(`[라우터] 인증 성공. ${to.path} 접속 허가`);
      next()
    } else {
      console.warn(`[라우터] 인증 실패 (서버에서 거절됨):`, data.message)
      next('/login')
    }
  } catch (error: any) {
    console.error(`[라우터] API 통신/네트워크 에러 발생:`, error)
    next('/login')
  }
})

export default router
