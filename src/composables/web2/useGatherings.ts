import { CONFIG } from '@/utils/consts'
import { Gathering } from '@/utils/types'
import { useQuery } from 'vue-query'

export default function useGatherings() {
  const { data: gatherings, ...other } = useQuery(['gatherings'], () => {
    console.log('Fetching gatherings')
    return fetch(`${CONFIG.API_ADDRESS}/api/gathering`, {
      method: 'GET',
    })
      .then(r => r.json() as Promise<Gathering[]>)
  })
  return { gatherings, ...other }
}
