import { createWebHistory, createRouter } from 'vue-router'
import { RouteRecordRaw } from 'vue-router'

import { gatheringBackstageGuard } from './navigationGuards'

import GatheringFeedPage from '@/view/Gathering/GatheringFeedPage.vue'
import GatheringBackstagePage from '@/view/Gathering/GatheringBackstagePage.vue'
import ErrorPage from '@/view/ErrorPage.vue'

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
    beforeEnter: async (to, from, next) => {
      await gatheringBackstageGuard(next)
    },
  },
  {
    path: '/error',
    name: 'ErrorPage',
    component: ErrorPage,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
