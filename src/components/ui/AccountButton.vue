<script lang="ts" setup>
import { ref, watchEffect } from 'vue'
import { formatBalance, formatNumber, truncateAddress } from '@/utils'
import useConnectedAccount from '@/composables/web3/useConnectedAccounts'
import useMetaMaskProvider from '@/composables/web3/useMetaMaskProvider'
import useNativeBalance from '@/composables/web3/useNativeBalance'
import changeNetwork from '@/composables/web3/useChangeNetwork'

import useTokenBalance from '@/composables/web3/useTokenBalance'
import { GATHERING_ADDRESSES, NETWORKS } from '@/utils/consts'

// composables

// state
const { provider } = useMetaMaskProvider()
const { account } = useConnectedAccount()
// const { balance } = useNativeBalance(account, NETWORKS.MATIC_MUMBAI) // '137' = Matic mainnet
const { balance } = useTokenBalance(account, GATHERING_ADDRESSES['gBG'], NETWORKS.MATIC_MUMBAI)

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
    <div class="inline-block mr-3 text-sm rounded-full border border-white">
      <div v-if="account">
        <div class="inline-block">
          <span v-if="balance?._isBigNumber" class="ml-2">
            {{ `${formatNumber(formatBalance(balance))} gBG` }}
          </span>
          <span
            v-else-if="balance === 'Wrong network'"
            class="ml-2 hover:opacity-75 active:opacity-50 cursor-pointer"
            @click="changeNetwork"
          >
            {{ balance }}
          </span>
          <span v-else class="ml-2">
            {{ balance }}
          </span>
        </div>
        <div class="inline-block py-1 px-2 ml-1 bg-thgreen4 rounded-full">
          {{ truncateAddress(account) }}
        </div>
      </div>
      <button
        v-else
        title="Connect wallet"
        class="py-1 px-3 rounded border-none shadow-none"
        @click="connectWallet"
      >
        Connect wallet
      </button>
    </div>
  </div>
</template>
