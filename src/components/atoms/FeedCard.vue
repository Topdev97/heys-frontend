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
  <div
    class="p-8 mb-6 rounded min-h-16"
    :class="
      index % 2 === 0
        ? dark
          ? 'bg-grey5'
          : 'bg-grey1'
        : dark
        ? 'bg-grey4'
        : 'bg-grey0'
    "
  >
    <slot />
  </div>
</template>
