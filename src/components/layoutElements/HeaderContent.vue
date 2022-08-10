<script lang="ts" setup>
import { useRoute } from 'vue-router'
import useGathering from "../../composables/web2/useGathering";
import { ChartBarIcon } from '@heroicons/vue/solid'

const route = useRoute()
const gatheringSlug = route.params.gatheringSlug.toString()

interface NavLink {
  label: string
  path: string
}

interface Props {
  navLink: NavLink
}

defineProps<Props>()

const { gathering } = useGathering(gatheringSlug)
</script>

<template>
  <div class="d-flex justify-center align-center text-center max-w-screen-md mx-auto pt-6 pb-8">
    <h1 class="font-medium">{{ gathering?.name }}</h1>
    <h2 class="mb-2 text-xl">{{ gathering?.description }}</h2>
    <div class="mb-2">
      <span>gTES</span> •
      <span>Price: $0.003</span> •
      <span>Market cap: $21m</span> •
      <span>
        <ChartBarIcon
          class="h-5 link inline-block pb-1 ml-1 fill-thgreen1"
        />
      </span>
    </div>
    <div>
      <router-link
        :to="{ path: navLink.path }"
        class="link-dark"
      >
        {{ navLink.label }}
      </router-link>
    </div>
  </div>
</template>
