import { useQuery } from 'vue-query'
import { computed, unref } from 'vue'

import { formatBalance } from '@/utils'

import useCurrentGathering from '@/composables/web2/useGathering'
import { gatheringInstanceRPC } from '@/composables/web3/gathering/useGatheringContract'

export default function useGatheringSupply() {
  const { currentGathering } = useCurrentGathering()

  const enabled = computed(() => {
    return Boolean(unref(currentGathering.value?.slug)) && Boolean(gatheringInstanceRPC)
  })

  const { data: totalSupply, ...other } = useQuery(
    ['gateringSupply', currentGathering.value?.slug],
    async () => {
      console.log('Checking gathering supply')

      return formatBalance(await gatheringInstanceRPC.totalSupply())
    },
    {
      enabled,
    }
  )

  return { totalSupply, ...other }
}
