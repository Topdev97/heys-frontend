import { gatheringInstanceMM } from '@/composables/web3/gathering/useGatheringContract'

export default async function useVote(docId: number, vote: number) {
  console.log('Voting on a doc')

  const tx = await gatheringInstanceMM
    .voteOnDoc(docId, vote)
    .catch((err: any) => console.log('error', err))

  console.log('tx data', tx)

  return { tx }
}
