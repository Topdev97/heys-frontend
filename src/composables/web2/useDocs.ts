import { CONFIG } from '@/utils/consts'
import { unref } from 'vue'
import { useQuery } from 'vue-query'

export default function useDocs(gatheringId, search, tags, page, sort, type) {
  const { data: docs, ...other } = useQuery(
    ['docs', gatheringId, search, tags, page, sort, type],
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
    }
  )

  return { docs, ...other }
}
