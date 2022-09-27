<template>
  <div>
    <div class="p-4 text-gray-200 bg-thgreen2 header-band pos-relative bg-gradient">
      <div class="fixed top-0 left-0 z-50 w-full h-1 bg-thgreen5"></div>
      <div class="header-nav">
        <slot name="header-nav"></slot>
      </div>
      <div class="header-content">
        <slot name="header-content"></slot>
      </div>
    </div>
    <div class="p-4 min-h-[10rem] bg-thgreen7 command-band">
      <slot name="command-band"></slot>
    </div>
    <div class="py-4 text-black bg-white body-band" style="min-height: 100vh">
      <slot name="content"></slot>
    </div>
    <div class="p-4 bg-grey4 footer-band">
      <slot name="footer"></slot>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  components: {},
})
</script>
