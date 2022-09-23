import { CONFIG } from '@/utils/consts'
import { unref } from 'vue'
import { useQuery } from 'vue-query'

export default function useGathering(slug: any) {
  const { data: gatherings, ...other } = useQuery(['gatherings', slug], () => {
    return fetch(`${CONFIG.API_ADDRESS}/api/gathering`, {
      method: 'GET',
    })
      .then(r => r.json())
      .then(data => data.filter((item: any) => item.slug == slug))
  })
  return { gatherings, ...other }
}
