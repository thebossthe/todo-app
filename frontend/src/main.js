import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './style.css'
import './assets/main.css'
import './assets/styles/tailwind.css'

const app = createApp(App)

app.use(router)
app.mount('#app')
