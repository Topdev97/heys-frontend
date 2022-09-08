import { unref } from 'vue'
import { useQuery } from 'vue-query'

export default function useDocs(search, tags, page, sort, type, searchOption, gatheringSlug) {
  const { data: docs, ...other } = useQuery(
    ['docs', search, tags, page, sort, type, searchOption, gatheringSlug],
    () => {
      return fetch('/api/documents/get', {
        method: 'POST',
        body: JSON.stringify({
          search: search.value,
          tags: tags.value,
          page: page.value,
          sort: sort.value,
          type: type.value,
          searchOption: searchOption.value,
          space: gatheringSlug.value,
        }),
      }).then(r => r.json())
    }
  )

  return { docs, ...other }
}
