import { createWebHistory, createRouter } from 'vue-router'
import { RouteRecordRaw } from 'vue-router'

import GatheringFeedPage from '../view/Gathering/GatheringFeedPage.vue'
import GatheringGovernPage from '../view/Gathering/GatheringGovernPage.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: GatheringFeedPage,
  },
  {
    path: '/g/:gatheringSlug',
    name: 'GatheringFeedPage',
    component: GatheringFeedPage,
  },
  {
    path: '/g/:gatheringSlug/govern',
    name: 'GatheringGovernPage',
    component: GatheringGovernPage,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
