import { DocDataBase } from '@/utils/types'

import { gatheringInstanceMM } from '@/composables/web3/gathering/useGatheringContract'

export default async function useAddDocWeb3(newDocData: DocDataBase) {
  console.log('Adding doc web3')

  const tx = await gatheringInstanceMM
    .addDoc(newDocData.docUid, newDocData.docType)
    .catch((err: any) => console.log('error', err))

  console.log('tx data', tx)

  return { tx }
}
