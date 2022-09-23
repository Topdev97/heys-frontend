import { computed } from 'vue'
import { useRoute } from 'vue-router'

const gatheringSlug = computed(() => {
  const route = useRoute()
  console.log('Getting gathering slug')
  return route?.params.gatheringSlug?.toString() ?? 'blockchain-gathering'
})

export default gatheringSlug
