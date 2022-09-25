<script lang="ts" setup>
import { ref, watchEffect, computed } from 'vue'
import FeedCard from '@/components/atoms/FeedCard.vue'

import { DEPLOYED_NETWORK } from '@/utils/consts'

import useGatheringSupply from '@/composables/web3/gathering/useGatheringSupply'
import useVote from '@/composables/web3/gathering/useVote'
import useVotes from '@/composables/web3/gathering/useVotes'
import useGatheringTokenBalance from '@/composables/web3/gathering/useGatheringTokenBalance'
import useConnecteNetwork from '@/composables/web3/account/useConnectedNetwork'
import requestNetworkSwitch from '@/composables/web3/account/useChangeNetwork'

// state
const loadingVoting = ref(false)
const switchedNetwork = ref(false)
const votingData = ref({
  docId: -1,
  vote: 3
})

// composables
const { totalSupply, refetch: refetchGatheringSupply } = useGatheringSupply()
const { docsToVoteOn, isLoading: isLoadingVotes, refetch: refetchVotes } = useVotes()
const { refetch: refetchGatheringTokenBalance } = useGatheringTokenBalance()
const { connectedChainId } = useConnecteNetwork()

// computed
const votesFiltered = computed(() => {
  return docsToVoteOn.value?.docsToVoteOnVotes
    .filter(doc => 
      !totalSupply.value
      || doc.totalRejectVotesWeight < (totalSupply.value * (50 / 100))
    )
})

// methods
async function processVote() {
  console.log('voting on a doc')
  loadingVoting.value = true
  try {
    const tx = await useVote(votingData.value.docId, votingData.value.vote)
      .catch((err: any) => console.log(err))
    if (!tx) throw new Error('Vote transaction error')
    const res = await tx.tx.wait().catch((err: any) => console.log(err))
    if (!res) throw new Error('Vote transaction response error')
    console.log('res data', res)
    refetchVotes.value()
    refetchGatheringSupply.value()
    refetchGatheringTokenBalance.value()
  } catch {
    loadingVoting.value = false
  }
  loadingVoting.value = false
}

async function vote(docId: number, vote: number) {
  // vote
  // 1: approve, 2: reject, 3: abstain
  
  votingData.value = {
    docId,
    vote
  }
  console.log(connectedChainId.value)
  switchedNetwork.value = false
  if (connectedChainId.value !== DEPLOYED_NETWORK) {
    const confirmNetworkChange = confirm('Change network to Polygon')
    if (confirmNetworkChange) {
      const res = await requestNetworkSwitch()
      if (res === 2 || res === 3) {
        switchedNetwork.value = true
      }
    }
  } else {
    await processVote()
  }
}

// lifecycle
watchEffect(
  async () => {
    if (switchedNetwork.value && connectedChainId.value === DEPLOYED_NETWORK) {
      switchedNetwork.value = false
      await processVote()
    }
  }
)
</script>
<template>
  <div>
    <div v-if="!isLoadingVotes">
      <small class="block mb-6 w-full text-center">
        gBG total supply: {{ totalSupply }}
      </small>
      <small v-if="loadingVoting" class="block mt-4 mb-4 w-full text-center"> Loading... </small>

      <FeedCard
        v-for="(doc, did) in votesFiltered"
        :key="`vote-${did}`"
        :index="did"
        dark
      >
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
