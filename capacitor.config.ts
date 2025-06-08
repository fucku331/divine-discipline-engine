
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.b49e1c2f91cf4c9bb5f7cedb3f2f6887',
  appName: 'divine-discipline-engine',
  webDir: 'dist',
  server: {
    url: 'https://b49e1c2f-91cf-4c9b-b5f7-cedb3f2f6887.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 3000,
      launchAutoHide: true,
      backgroundColor: '#1e1b4b',
      androidSplashResourceName: 'splash',
      androidScaleType: 'CENTER_CROP',
      showSpinner: false
    }
  }
};

export default config;
