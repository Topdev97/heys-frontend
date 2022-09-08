import { createApp } from 'vue'
import App from './App.vue'
import './index.css'
import { store } from './store'
import router from './router/router'
import { VueQueryPlugin, VueQueryPluginOptions } from 'vue-query'
// import 'vite-plugin-svg-icons/register';

/*const env: any = {
  apiURL: process.env.VUE_APP_API_COSMOS ?? '',
  rpcURL: process.env.VUE_APP_API_TENDERMINT ?? '',
  wsURL: process.env.VUE_APP_WS_TENDERMINT ?? '',
  prefix: process.env.VUE_APP_ADDRESS_PREFIX ?? '',
  chainID: process.env.VUE_APP_CHAIN_ID ?? '',
  chainName: process.env.VUE_APP_CHAIN_NAME ?? ''
}*/

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
