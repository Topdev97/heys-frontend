import { createApp } from 'vue'
import App from './App.vue'
import './index.css'
import { store } from './store'
import router from './router/router'
import { VueQueryPlugin, VueQueryPluginOptions } from 'vue-query'

// @ts-ignore
const app = createApp(App)

const vueQueryPluginOptions: VueQueryPluginOptions = {
  queryClientConfig: {
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
      },
    },
  },
}

app.use(VueQueryPlugin, vueQueryPluginOptions).use(router).use(store).mount('#app')
