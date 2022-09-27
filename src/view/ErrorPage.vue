<script lang="ts" setup>
import LogoIcon from '@/components/atoms/LogoIcon.vue'

import { useRoute } from 'vue-router'

// consts
const route = useRoute()
</script>
<template>
  <div class="text-gray-100">
    <div class="p-4 h-[100vh] bg-thblue1 header-band pos-relative bg-gradient">
      <div class="fixed top-0 left-0 z-50 w-full h-1 bg-thblue2"></div>
      <div class="header-nav">
        <div class="flex justify-between items-center">
          <router-link
            :to="{ path: '/' }"
            class="opacity-90 active:opacity-75 transition duration-200 hover:scale-105"
            title="heystacks"
          >
            <LogoIcon />
          </router-link>
        </div>
      </div>
      <div class="flex flex-col justify-center items-center h-full header-content">
        <h1>Error</h1>
        <h4 v-if="route.query.type === 'not-connected'">Install and connect to MetaMask</h4>
        <h4 v-if="route.query.type === 'no-gathering-token-balance'">
          You don't have access to this gathering's backstage
        </h4>
      </div>
    </div>
  </div>
</template>
