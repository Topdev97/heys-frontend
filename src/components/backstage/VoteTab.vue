<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import FeedCard from '@/components/atoms/FeedCard.vue'
import { ethers } from 'ethers'
import { Provider } from 'ethers-multicall'
import { DocDataFull, DocContract } from '@/utils/types'
import { gatheringInstanceMulti } from '@/composables/web3/gathering/useGatheringContract'
import { RPC_URL } from '@/utils/consts'

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
const docsToVoteOn = ref([] as DocDataFull[])
const loading = ref(true)

// lifecycle
onMounted(async () => {
  const provider = ethers.getDefaultProvider(RPC_URL)
  const ethcallProvider = new Provider(provider)
  await ethcallProvider.init()

  // get list of ids of docs to vote on
  const docIdsCall = [gatheringInstanceMulti.docsToVoteOn()]
  const response1 = await ethcallProvider.all(docIdsCall)
  const docsToVoteOnInt: number[] = response1[0].map(docId => docId.toNumber())

  // multiCall to get doc details for all of those
  const docsCalls = docsToVoteOnInt.map(docId => gatheringInstanceMulti.docs(docId))
  const response2: DocContract[] = await ethcallProvider.all(docsCalls)
  docsToVoteOn.value = response2

  // get web2 data for each doc
  // TODO
  // docsToVoteOn.value = []

  loading.value = false
})
</script>

<template>
  <div>
    <div v-if="!loading">
      <FeedCard v-for="(doc, did) in docsToVoteOn" :key="`vote-${did}`" :index="did" dark>
        <h5 class="mb-2">{{ doc.title }}</h5>
        <p class="mb-2">{{ doc }}</p>
        <div class="mb-4">
          <small class="mr-2"> Turnout: 35% </small>
          <small class="mr-2"> Approved: 5k (50% rate) </small>
          <small class="mr-2"> Pass threshold: 25k </small>
        </div>
        <div>
          <button
            title="Approve"
            class="inline-block py-1 px-4 mr-4 text-thgreen2 btn-white min-w-[7rem]"
          >
            Approve
          </button>
          <button title="Reject" class="inline-block py-1 px-4 text-red btn-white min-w-[7rem]">
            Reject
          </button>
        </div>
      </FeedCard>
    </div>
    <div v-else class="flex justify-center">Loading...</div>
  </div>
</template>
