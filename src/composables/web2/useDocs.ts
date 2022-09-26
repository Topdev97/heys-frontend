import { CONFIG } from '@/utils/consts'
import { DocType } from '@/utils/types'
import { reactive, ref, unref, Ref, computed } from 'vue'
import { useQuery } from 'vue-query'

// types
export interface DocsFilters {
  page?: number
  search: string
  tags: string[]
  sort: string
  type: DocType
}

// consts
const gatheringId = 1

export default function useDocs(filters?: DocsFilters) {
  const { data: docs, ...other } = useQuery(['docs', gatheringId, filters], () => {
    console.log('Fetching docs')
    return fetch(`${CONFIG.API_ADDRESS}/api/doc/gathering/${gatheringId}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...filters,
      }),
    }).then(r => r.json())
  })

  return { docs, ...other }
}
