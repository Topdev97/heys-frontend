<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import FeedCard from "../../components/atoms/FeedCard.vue";
import { GATHERING_ADDRESSES } from '../../utils/consts';
import gatheringAbi from '@/abis/GatheringAbi.json'
import { ethers } from 'ethers'
import { Contract, Provider } from 'ethers-multicall'
import { Doc } from '../../utils/types';

// state
const votes = [
  { title: 'The country calling 2022 the \'year of coffee\'', description: 'Coffee isn\'t just a drink in Saudi Arabia, it\'s an ancient tradition of hospitality – and as the country opens to tourism, it\'s also one of its most interesting draws.' },
  { title: 'Can humanity leave nature behind?', description: 'In the face of environmental collapse, humanity may need to turn to artificial replacements for nature – how might we avoid the most dystopian of these futures?' },
]
const docsToVoteOn = ref([] as number[])

// lifecycle
onMounted(async () => {
  const provider = new ethers.providers.Web3Provider(window.ethereum)
  const ethcallProvider = new Provider(provider)
  await ethcallProvider.init()

  const gatheringInstance = new Contract(
    GATHERING_ADDRESSES['gOTB'],
    gatheringAbi.filter(abi => abi.type === 'function'),
  )

  const docIdsCall = [gatheringInstance.docsToVoteOn()]
  const response1 = await ethcallProvider.all(docIdsCall)
  const docsToVoteOnInt = response1[0].map(docId => docId.toNumber())
  docsToVoteOn.value = docsToVoteOnInt

  const docsCalls = docsToVoteOnInt.map(docId => gatheringInstance.docs(docId))
  const response2: Doc[] = await ethcallProvider.all(docsCalls)
  console.log(response2)
})

</script>

<template>
  <div>
    <FeedCard
      v-for="(vote, vid) in votes"
      :key="`vote-${vid}`"
      :index="vid"
      dark
    >
      <h5 class="mb-2">{{ vote.title }}</h5>
      <p class="mb-2">{{ vote.description }}</p>
      <div class="mb-4">
        <small class="mr-2">
          Turnout: 35%
        </small>
        <small class="mr-2">
          Approved: 5k (50% rate)
        </small>
        <small class="mr-2">
          Pass threshold: 25k
        </small>
      </div>
      <div>
        <button
          title="Approve"
          class="btn-white inline-block px-4 py-1 mr-4 min-w-[7rem] text-thgreen2"
        >
          Approve
        </button>
        <button
          title="Reject"
          class="btn-white inline-block px-4 py-1  min-w-[7rem] text-red"
        >
          Reject
        </button>
      </div>
    </FeedCard>
  </div>
</template>
