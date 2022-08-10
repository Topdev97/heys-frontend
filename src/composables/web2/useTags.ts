import { unref } from 'vue'
import { useQuery } from 'vue-query'

export default function useDocs(sort) {

  const { data: tags, ...other } = useQuery(
    ['docs', sort],
    () => {
      return fetch('/api/tags/get', {
        method: 'POST',
        body: JSON.stringify({
          sort: sort.value,
        })
      })
        .then(r => r.json())
        .then(r => r.tags)
    }
  )

  return { tags, ...other }
}
