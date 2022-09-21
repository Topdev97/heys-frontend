import { createApp } from 'vue'
import App from './App.vue'
import './index.css'
import { store } from './store'
import router from './router/router'
import { VueQueryPlugin } from 'vue-query'


// @ts-ignore
createApp(App).use(VueQueryPlugin).use(router).use(store).mount('#app')
