<script lang="ts" setup>
import useGathering from '@/composables/web2/useGathering'
import gatheringSlug from '@/composables/utils/useGatheringSlug'
import { ChartBarIcon } from '@heroicons/vue/solid'

interface NavLink {
  label: string
  path: string
}

interface Props {
  navLink: NavLink
}

defineProps<Props>()

const { gathering } = useGathering(gatheringSlug.value)
</script>

<template>
  <div
    class="justify-center pt-6 pb-8 mx-auto max-w-screen-md text-center d-flex align-center"
  >
    <h1 class="font-medium">{{ gathering?.name }}</h1>
    <h2 class="mb-2 text-xl">{{ gathering?.description }}</h2>
    <div class="mb-2">
      <span>gBG</span> • <span>Price: $0.003</span> •
      <span>Market cap: $21m</span>
    </div>
    <div>
      <router-link :to="{ path: navLink.path }" class="link-dark">
        {{ navLink.label }}
      </router-link>
    </div>
  </div>
</template>
