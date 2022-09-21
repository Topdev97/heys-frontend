import { CONFIG } from '@/utils/consts'
import { DocType } from '@/utils/types'
import { reactive, ref, unref, Ref, computed } from 'vue'
import { useQuery } from 'vue-query'

// types
export interface DocFetchParams {
  search: string
  tags: string[]
  page: number
  sort: string
  type: DocType
}

// consts
const gatheringId = 1

// state
const currentSearchParams = ref<DocFetchParams | null>(null)

// computed
const enableQuery = computed(() => !!currentSearchParams.value)

export default function useDocs(searchParams?: DocFetchParams) {
  if (searchParams) {
    currentSearchParams.value = searchParams
  }

  const { data: docs, ...other } = useQuery(
    ['docs', gatheringId],
    () => {
      return fetch(`${CONFIG.API_ADDRESS}/api/doc/gathering/${gatheringId}`, {
        method: 'GET',
        // body: JSON.stringify({
        //   search: search.value,
        //   tags: tags.value,
        //   page: page.value,
        //   sort: sort.value,
        //   type: type.value,
        // }),
      }).then(r => r.json())
    },
    {
      enabled: enableQuery,
    }
  )

  return { docs, ...other }
}
