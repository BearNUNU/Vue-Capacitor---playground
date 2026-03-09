import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.example.app',
  appName: 'vue-capacitor-playground',
  webDir: 'dist',
  plugins: {
    StatusBar: {
      visible: true,
      overlaysWebView: false
    }
  }
};

export default config;
