<script lang="ts" setup>
import { ref, watchEffect } from 'vue'
import { useRoute } from 'vue-router'
import { formatBalance, formatNumber, truncateAddress } from '../../utils'
import useConnectedAccount from '../../composables/web3/useConnectedAccounts'
import useMetaMaskProvider from '../../composables/web3/useMetaMaskProvider'
import useNativeBalance from '../../composables/web3/useNativeBalance'
import approveWallet from '../../composables/web3/approveWallet'
import changeNetwork from '../../composables/web3/changeNetwork'
import addToken from '../../composables/web3/addToken'

import useTokenBalance from '../../composables/web3/useNativeBalance'
import { TOKENS } from '../../utils/consts'

// consts
const route = useRoute()
const gatheringSlug = route.params.gatheringSlug.toString()

// composables

// state
const { provider } = useMetaMaskProvider()
const { account } = useConnectedAccount()
const { balance } = useNativeBalance(account, '80001') // '137' = Matic mainnet
// const { balance } = useTokenBalance(accounts, TOKENS['137'].MATIC.address, '137')

// methods
async function connectWallet() {
  if (!provider) {
    alert('Please install or enable MetaMask first')
    // } else if (window.ethereum.networkVersion !== '137') {
    //   alert('Change network to Polygon')
  } else {
    const accounts = await provider?.send('eth_requestAccounts', [])
    if (accounts?.length > 0) location.reload()
  }
}
</script>

<template>
  <div class="flex">
    <div
      class="inline-block mr-3 text-sm rounded-full border border-white cursor-pointer hover:bg-white/10 active:bg-white/20"
    >
      <router-link
        v-if="account"
        :to="{ path: `/g/${gatheringSlug}/govern`, query: { tab: 'Finance' } }"
      >
        <div class="inline-block">
          <span v-if="balance?._isBigNumber" class="ml-2">
            {{
              `${formatNumber(formatBalance(balance))} ${
                TOKENS['80001'].MATIC.denom
              }`
            }}
          </span>
          <span v-else class="ml-2">
            {{ balance }}
          </span>
        </div>
        <div
          class="inline-block py-1 px-2 ml-1 bg-thgreen4 rounded-full border-r border-white"
          @click="disconnectWallet"
        >
          {{ truncateAddress(account) }}
        </div>
      </router-link>
      <button
        v-else
        title="Connect wallet"
        class="py-1 px-3 rounded border-none shadow-none"
        @click="connectWallet"
      >
        Connect wallet
      </button>
    </div>
    <button
      title="Approve-button"
      class="py-1 px-3 mr-4 rounded-full border border-white"
      @click="approveWallet(50)"
    >
      Approve
    </button>

    <button
      title="Approve-button"
      class="py-1 px-3 mr-4 rounded-full border border-white"
      @click="changeNetwork"
    >
      Add Network
    </button>
    <button
      title="Approve-button"
      class="py-1 px-3 mr-4 rounded-full border border-white"
      @click="addToken"
    >
      Add USDC
    </button>
  </div>
</template>
