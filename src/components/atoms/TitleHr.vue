<script lang="ts" setup>
interface Props {
  title: string
}

withDefaults(defineProps<Props>(), {
  title: '',
})
</script>
<template>
  <div class="max-w-screen-md mx-auto">
    <div class="flex items-center pt-6 sm:pt-12 pb-12 mx-auto w-2/3">
      <div class="flex-grow border-t-2 border-gray-200"></div>
      <span class="px-4 mb-0 font-extrabold uppercase">{{ title }}</span>
      <div class="flex-grow border-t-2 border-gray-200"></div>
    </div>
  </div>
</template>
