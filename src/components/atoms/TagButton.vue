<script lang="ts" setup>
import TagIcon from '@/components/atoms/TagIcon.vue'

import { Tag } from '@/utils/types'

interface Props {
  tag: Tag
  selected?: boolean
}

defineProps<Props>()
</script>
<template>
  <button
    class="py-1 px-3 my-1 mx-1 text-sm bg-thgreen8 btn-white d-inline-block"
    :class="selected && 'border-thgreen2 hover:border-thgreen2'"
  >
    <TagIcon :title="tag.text" />
    <span class="ml-1">
      {{ tag.text }}
    </span>
  </button>
</template>
