<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8 bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
      
      <!-- 헤더 (로고 및 타이틀) -->
      <div class="text-center">
        <div class="mx-auto h-16 w-16 bg-zinc-900 text-white rounded-2xl flex items-center justify-center shadow-lg mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-8 h-8">
            <path stroke-linecap="round" stroke-linejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
          </svg>
        </div>
        <h2 class="text-3xl font-extrabold text-gray-900 tracking-tight">
          환영합니다
        </h2>
        <p class="mt-2 text-sm text-gray-500 font-medium">
          계속하려면 로그인해 주세요
        </p>
      </div>

      <!-- 로그인 폼 -->
      <form class="mt-8 space-y-6" @submit.prevent="handleLogin">
        <div class="space-y-4">
          <!-- 이메일 입력 -->
          <div>
            <label for="user-id" class="block text-sm font-medium text-gray-700 mb-1">아이디</label>
            <input 
              id="user-id" 
              v-model="userId"
              type="text" 
              required 
              class="appearance-none relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-400 text-gray-900 rounded-xl focus:outline-none focus:ring-2 focus:ring-zinc-800 focus:border-transparent transition-shadow sm:text-sm" 
              placeholder="아이디를 입력하세요" 
            />
          </div>
          
          <!-- 비밀번호 입력 -->
          <div>
            <label for="password" class="block text-sm font-medium text-gray-700 mb-1">비밀번호</label>
            <input 
              id="password" 
              v-model="password"
              type="password" 
              autocomplete="current-password" 
              required 
              class="appearance-none relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-400 text-gray-900 rounded-xl focus:outline-none focus:ring-2 focus:ring-zinc-800 focus:border-transparent transition-shadow sm:text-sm" 
              placeholder="••••••••" 
            />
          </div>
        </div>
        <!-- 로그인 버튼 -->
        <div>
          <button 
            type="submit" 
            class="group relative w-full flex justify-center py-3.5 px-4 border border-transparent text-sm font-bold rounded-xl text-white bg-zinc-900 hover:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-zinc-900 transition-all active:scale-[0.98] shadow-md"
          >
            <!-- 자물쇠 아이콘 -->
            <span class="absolute left-0 inset-y-0 flex items-center pl-3">
              <svg class="h-5 w-5 text-zinc-500 group-hover:text-zinc-400 transition-colors" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd" />
              </svg>
            </span>
            로그인
          </button>
        </div>
      </form>
      <!-- 하단 문구 -->


    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

// 입력 폼과 연동되는 데이터
const userId = ref('');
const password = ref('');

// 로그인 처리 함수
const handleLogin = async () => {
  if (!userId.value || !password.value) {
    alert('아이디와 비밀번호를 모두 입력해주세요.');
    return;
  }

  try {
    const response = await fetch('http://localhost:8080/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        userId: userId.value,
        password: password.value
      })
    });

    const data = await response.json();

    if (data.success) {
      // 서버에서 전달받은 토큰 저장 (임시로 localStorage 활용)
      localStorage.setItem('accessToken', data.accessToken);
      localStorage.setItem('refreshToken', data.refreshToken);
      
      alert(data.message);
      
      // 메인 홈 화면('/')으로 이동
      router.push('/');
    } else {
      alert(data.message || '로그인에 실패했습니다.');
    }
  } catch (error) {
    console.error('Login error:', error);
    alert('서버와 통신하는 중 문제가 발생했습니다. 백엔드가 켜져있는지 확인해주세요.');
  }
};
</script>

<style scoped>
/* Tailwind CSS를 사용하므로 별도의 커스텀 스타일은 최소화했습니다. */
</style>
