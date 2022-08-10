<template>
  <div class="text-gray-100">
    <div class="header-band pos-relative p-4 bg-thblue1 bg-gradient">
      <div class="fixed top-0 left-0 w-full h-1 z-50 bg-thblue2">
      </div>
      <div class="header-nav">
        <slot name="header-nav"></slot>
      </div>
      <div class="header-content">
        <slot name="header-content"></slot>
      </div>
    </div>
    <div class="command-band p-4 bg-thblue4">
      <slot name="command-band"></slot>
    </div>
    <div class="body-band py-4 px-0 sm:px-4 bg-grey6" style="min-height: 100vh">
      <slot name="content"></slot>
    </div>
    <div class="footer-band p-4 bg-grey6">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  components: {
  }
})
</script>
