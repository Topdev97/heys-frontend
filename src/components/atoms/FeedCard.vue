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
    class="mb-6 min-h-16 p-8 rounded"
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
