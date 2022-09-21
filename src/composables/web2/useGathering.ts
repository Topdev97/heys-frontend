import { CONFIG } from '@/utils/consts'
import { unref } from 'vue'
import { useQuery } from 'vue-query'

export default function useGathering(slug) {
  const { data: gathering, ...other } = useQuery(['docs', slug], () => {
    return fetch(`${CONFIG.API_ADDRESS}/api/gathering`, {
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
