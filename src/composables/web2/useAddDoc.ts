import { CONFIG } from '@/utils/consts'
import { DocDataBase } from '@/utils/types'

export default function addDocWeb2(newDocData: DocDataBase) {
  console.log('Adding doc web2')
  return fetch(`${CONFIG.API_ADDRESS}/api/doc`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      gatheringId: 1,
      ...newDocData,
    }),
  })
    .then(r => r.json())
    .catch(err => console.log(err))
}
