import { useQuery } from 'vue-query'
import { computed, unref } from 'vue'
import useCurrentGathering from '@/composables/web2/useGathering'
import { gatheringInstanceRPC } from '@/composables/web3/gathering/useGatheringContract'
import useRPCProvider from '@/composables/web3/account/useRPCProvider'
import { BigNumber, ethers } from 'ethers'
import { Provider } from 'ethers-multicall'
import { gatheringInstanceMulti } from '@/composables/web3/gathering/useGatheringContract'
import { formatBalance } from '@/utils'

// types
export interface DocVotesResponse {
  docId: number
  docUid: number
  approved: boolean
  submitter: string
  totalApproveVotesWeight: number
  totalRejectVotesWeight: number
  totalAbstainVotesWeight: number
  totalVotesCount: number
}

export default function useVotes() {
  const { currentGathering } = useCurrentGathering()
  const { provider } = useRPCProvider()

  const enabled = computed(() => {
    return Boolean(unref(currentGathering.value?.slug)) && Boolean(gatheringInstanceRPC)
  })

  const { data: docsToVoteOn, ...other } = useQuery(
    ['docsToVoteOn', currentGathering.value?.slug],
    async () => {
      console.log('Fetching docs to vote on')

      const ethcallProvider = new Provider(provider)
      await ethcallProvider.init()

      // get list of ids of docs to vote on
      const docIdsCall = [gatheringInstanceMulti.docsToVoteOn()]
      const docIdsResponse = await ethcallProvider.all(docIdsCall)
      const docsToVoteOnIdList: number[] = docIdsResponse[0]

      // multiCall to get doc details for all of those
      const docsCalls = docsToVoteOnIdList.map(docId => gatheringInstanceMulti.docs(docId))
      const docsToVoteOnVotes = await ethcallProvider.all(docsCalls).then(res =>
        res.map(
          (r, rid) =>
            ({
              docId: docsToVoteOnIdList[rid],
              docUid: r.docUid,
              approved: r.approved,
              submitter: r.submitter,
              totalApproveVotesWeight: formatBalance(r.totalApproveVotesWeight),
              totalRejectVotesWeight: formatBalance(r.totalRejectVotesWeight),
              totalAbstainVotesWeight: formatBalance(r.totalAbstainVotesWeight),
              totalVotesCount: r.totalVotesCount.toNumber(),
            } as DocVotesResponse)
        )
      )

      // get web2 data for each doc
      // TODO
      // docsToVoteOn.value = []
      return {
        docsToVoteOnVotes,
      }
    },
    {
      enabled,
    }
  )

  return { docsToVoteOn, ...other }
}
