import { createWebHistory, createRouter } from 'vue-router'
import { RouteRecordRaw } from 'vue-router'

import GatheringFeedPage from '../view/Gathering/GatheringFeedPage.vue'
import GatheringBackstagePage from '../view/Gathering/GatheringBackstagePage.vue'

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
    path: '/g/:gatheringSlug/backstage',
    name: 'GatheringBackstagePage',
    component: GatheringBackstagePage,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
