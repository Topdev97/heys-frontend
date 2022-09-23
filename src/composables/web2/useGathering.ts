import { ref, computed } from 'vue'
import useGatherings from '@/composables/web2/useGatherings'
import gatheringSlug from '@/composables/utils/useGatheringSlug'
import { useQuery } from 'vue-query'

export default function useCurrentGathering() {
  const { gatherings } = useGatherings()

  const enabled = computed(() => {
    return !!gatherings.value
  })

  const { data: currentGathering } = useQuery(
    ['gathering', gatheringSlug],
    () => {
      console.log('Getting gathering')
      return gatherings.value?.find(gathering => gathering.slug === gatheringSlug.value)
    },
    {
      enabled,
    }
  )

  return { currentGathering }
}
