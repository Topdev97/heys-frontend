import { CONFIG } from '@/utils/consts'
import { unref } from 'vue'
import { useQuery } from 'vue-query'

export default function useTags(gatheringId, sort) {
  const { data: tags, ...other } = useQuery(['tags', gatheringId, sort], () => {
    return fetch(`${CONFIG.API_ADDRESS}/api/tag/gathering/${gatheringId}`, {
      method: 'GET',
    }).then(r => r.json())
  })

  return { tags, ...other }
}
