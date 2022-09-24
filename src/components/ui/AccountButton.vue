<script lang="ts" setup>
import { formatBalance, formatNumber, truncateAddress } from '@/utils'
import useConnectedAccount from '@/composables/web3/account/useConnectedAccounts'
import useMetaMaskProvider from '@/composables/web3/account/useMetaMaskProvider'
import useGatheringTokenBalance from '@/composables/web3/gathering/useGatheringTokenBalance'

// composables
const { provider } = useMetaMaskProvider()
const { account } = useConnectedAccount()
const { balance } = useGatheringTokenBalance()

// methods
async function connectWallet() {
  if (!provider) {
    alert('Please install or enable MetaMask first')
  } else {
    const accounts = await provider.value?.send('eth_requestAccounts', [])
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
