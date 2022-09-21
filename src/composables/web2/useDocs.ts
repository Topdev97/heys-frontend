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
    console.log(searchParams)
    currentSearchParams.value = searchParams
  }

  console.log(currentSearchParams.value?.search)
  const { data: docs, ...other } = useQuery(
    ['docs', gatheringId],
    () => {
      console.log(123)
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
