<script lang="ts" setup>
import { formatBalance } from '@/utils'

import useGatheringTokenBalance from '@/composables/web3/gathering/useGatheringTokenBalance'
import useCurrentGathering from '@/composables/web2/useGathering'

interface NavLink {
  label: string
  path: string
}

interface Props {
  navLink: NavLink
}

defineProps<Props>()

const { currentGathering } = useCurrentGathering()
const { balance } = useGatheringTokenBalance()
</script>
<template>
  <div
    class="justify-center pt-6 pb-7 mx-auto max-w-screen-md min-h-[12rem] text-center d-flex align-center"
    :class="currentGathering ? '' : 'invisible'"
  >
    <h1 class="font-medium">{{ currentGathering?.name }}</h1>
    <h2 class="mb-2 text-xl">{{ currentGathering?.description }}</h2>
    <!-- <div class="mb-2">
      <span>gBG</span> • <span>Price: $0.003</span> •
      <span>Market cap: $21m</span>
    </div> -->
    <div v-if="formatBalance(balance) > 0">
      <router-link :to="{ path: navLink.path }" class="link-dark">
        {{ navLink.label }}
      </router-link>
    </div>
  </div>
</template>
