<script lang="ts" setup>
interface Props {
  index?: number
  dark?: boolean
}

withDefaults(defineProps<Props>(), {
  index: 0,
  dark: false,
})
</script>
<template>
  <div :class="index % 2 === 0 ? (dark ? 'bg-grey6' : 'bg-grey1') : dark ? 'bg-grey4' : 'bg-white'">
    <div class="p-8 rounded min-h-16 max-w-screen-md mx-auto">
      <slot />
    </div>
  </div>
</template>
