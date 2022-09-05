<script lang="ts" setup>
interface Props {
  text: string
  selected?: boolean
}

defineProps<Props>()
</script>

<template>
  <div
    class="flex-center leading-10 min-w-[5rem] mx-2 cursor-pointer hover:brightness-90 active:brightness-75 select-none transition duration-200"
    :class="selected && 'border-b-2 border-b-link text-link'"
  >
    {{ text }}
  </div>
</template>
