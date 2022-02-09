import '@/assets/scss/app.scss'
import { createPinia } from 'pinia'
import { createApp } from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'
import router from './router'


loadFonts()

const Viu = createApp(App)
  .use(vuetify)
  .use(router)
  .use(createPinia())
  .mount('#app')


