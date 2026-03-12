import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.example.app',
  appName: 'vue-capacitor-playground',
  webDir: 'dist',
  server: {
    androidScheme: 'http',
    cleartext: true, // http 통신이 기본적으로 차단이기에 이를 허용하는 설정
  },
  plugins: {
    StatusBar: {
      visible: true,
      overlaysWebView: false
    },
    CapacitorCookies: { // HttpOnly 쿠키를 사용하기 위한 설정
      enabled: true,
    },
    CapacitorHttp: { // Http 통신을 사용하기 위한 설정, fetch() & axios의 통신을 인터셉트한다.
      enabled: true,
    }
  }
};

export default config;
