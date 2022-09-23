<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import FeedCard from '@/components/atoms/FeedCard.vue'
import { BigNumber, ethers } from 'ethers'
import { Provider } from 'ethers-multicall'
import { DocDataFull, DocContract } from '@/utils/types'
import { gatheringInstanceMulti } from '@/composables/web3/gathering/useGatheringContract'
import { RPC_URL } from '@/utils/consts'

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

// state
const votes = [
  {
    title: "The country calling 2022 the 'year of coffee'",
    description:
      "Coffee isn't just a drink in Saudi Arabia, it's an ancient tradition of hospitality – and as the country opens to tourism, it's also one of its most interesting draws.",
  },
  {
    title: 'Can humanity leave nature behind?',
    description:
      'In the face of environmental collapse, humanity may need to turn to artificial replacements for nature – how might we avoid the most dystopian of these futures?',
  },
]
const docsToVoteOnVotes = ref([] as DocVotesResponse[])
const docsToVoteOnData = ref([] as DocDataFull[])
const loading = ref(true)
const loadingVoting = ref(true)

// lifecycle
onMounted(async () => {
  // CHANGE TO QUERY

  const provider = ethers.getDefaultProvider(RPC_URL)
  const ethcallProvider = new Provider(provider)
  await ethcallProvider.init()

  // get list of ids of docs to vote on
  const docIdsCall = [gatheringInstanceMulti.docsToVoteOn()]
  const docIdsResponse = await ethcallProvider.all(docIdsCall)
  const docsToVoteOnIdList: number[] = docIdsResponse[0]

  // multiCall to get doc details for all of those
  const docsCalls = docsToVoteOnIdList.map(docId => gatheringInstanceMulti.docs(docId))
  docsToVoteOnVotes.value = await ethcallProvider.all(docsCalls).then(res =>
    res.map(
      (r, rid) =>
        ({
          docId: docsToVoteOnIdList[rid],
          docUid: r.docUid,
          approved: r.approved,
          submitter: r.submitter,
          totalApproveVotesWeight: r.totalApproveVotesWeight.toNumber(),
          totalRejectVotesWeight: r.totalRejectVotesWeight.toNumber(),
          totalAbstainVotesWeight: r.totalAbstainVotesWeight.toNumber(),
          totalVotesCount: r.totalVotesCount.toNumber(),
        } as DocVotesResponse)
    )
  )

  // get web2 data for each doc
  // TODO
  // docsToVoteOn.value = []

  loading.value = false
})

// methods
function vote(docId: number, vote: number) {
  // vote
  // 1: approve, 2: reject, 3: abstain
  console.log('voting on a doc')
  loadingVoting.value = true

  loadingVoting.value = false
}
</script>
<template>
  <div>
    <div v-if="!loading">
      <FeedCard v-for="(doc, did) in docsToVoteOnVotes" :key="`vote-${did}`" :index="did" dark>
        <h5 class="mb-2">{{ doc.docId }}. {{ doc.docUid }}</h5>
        <small class="mr-2"> Submitter: {{ doc.submitter }} </small>
        <p class="mb-2">{{ doc.approved }}</p>
        <div class="mb-4">
          <small class="mr-2"> Approved: {{ doc.totalApproveVotesWeight }} </small>
          <small class="mr-2"> Rejected: {{ doc.totalRejectVotesWeight }} </small>
          <small class="mr-2"> (Votes count: {{ doc.totalVotesCount }})</small>
        </div>
        <div>
          <button
            title="Approve"
            class="inline-block py-1 px-4 mr-4 min-w-[7rem] text-thgreen2 btn-white"
            @click="vote(doc.docId, 1)"
          >
            Approve
          </button>
          <button
            title="Reject"
            class="inline-block py-1 px-4 min-w-[7rem] text-red btn-white"
            @click="vote(doc.docId, 2)"
          >
            Reject
          </button>
        </div>
      </FeedCard>
    </div>
    <div v-else class="flex justify-center">Loading...</div>
  </div>
</template>
