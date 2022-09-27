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

router.beforeEach(async (to, from, next) => {
  if (to.name === 'GatheringBackstagePage') {
    await gatheringBackstageGuard(next)
  } else {
    next()
  }
})

export default router
