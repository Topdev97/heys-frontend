import { Doc } from '@/utils/types'

import { gatheringInstanceMM } from '@/composables/web3/gathering/useGatheringContract'

export default async function useAddDocWeb3(newDoc: Doc) {
  let docType
  if (newDoc.url.includes('/docs/')) {
    docType = 1
  } else if (newDoc.url.includes('/sheets/')) {
    docType = 2
  } else if (newDoc.url.includes('/slides/')) {
    docType = 2
  }

  const tx = await gatheringInstanceMM
    .addDoc(newDoc.uid, docType)
    .catch((err: any) => console.log('error', err))

  console.log('tx', tx)

  return { tx }
}
