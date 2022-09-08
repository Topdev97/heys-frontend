import { computed } from 'vue'
import { useRoute } from 'vue-router'

const gatheringSlug = computed(() => {
  const route = useRoute()
  return route?.params.gatheringSlug?.toString() ?? 'example'
})

export default gatheringSlug