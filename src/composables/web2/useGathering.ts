import { unref } from 'vue'
import { useQuery } from 'vue-query'

export default function useGathering(slug) {
  const { data: gathering, ...other } = useQuery(['docs', slug], () => {
    return fetch('/api/spaces/get', {
      method: 'POST',
      body: JSON.stringify({
        slug: slug,
      }),
    })
      .then(r => r.json())
      .then(r => r.spaces[0] ?? {})
  })

  return { gathering, ...other }
}
