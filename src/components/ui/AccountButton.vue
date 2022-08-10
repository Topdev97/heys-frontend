<script lang="ts" setup>
import { ref, watchEffect } from 'vue'
import { useRoute } from 'vue-router'
import { ethers } from 'ethers'
import {formatBalance, formatNumber, truncateAddress} from '../../utils'
import useConnectedAccount from "../../composables/web3/useConnectedAccounts";
import useMetaMaskProvider from "../../composables/web3/useMetaMaskProvider";
import useNativeBalance from '../../composables/web3/useNativeBalance';
import useTokenBalance from "../../composables/web3/useNativeBalance";
import {TOKENS} from "../../utils/consts";

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
  <div class="inline-block text-sm mr-3 hover:bg-white/10 active:bg-white/20 border border-white rounded-full cursor-pointer">
    <router-link
      v-if="account"
      :to="{ path: `/g/${gatheringSlug}/govern`, query: { tab: 'Finance' } }"
    >
      <div class="inline-block">
        <span
          v-if="balance?._isBigNumber"
          class="ml-2"
        >
          {{ `${formatNumber(formatBalance(balance))} ${TOKENS['80001'].MATIC.denom}` }}
        </span>
        <span
          v-else
          class="ml-2"
        >
          {{ balance }}
        </span>
      </div>
      <div
        class="inline-block rounded-full border-r border-white bg-thgreen4 px-2 py-1 ml-1"
        @click="disconnectWallet"
      >
        {{ truncateAddress(account) }}
      </div>
    </router-link>
    <button
      v-else
      title="Connect wallet"
      class="rounded px-3 py-1 border-none shadow-none"
      @click="connectWallet"
    >
      Connect wallet
    </button>
  </div>
</template>
