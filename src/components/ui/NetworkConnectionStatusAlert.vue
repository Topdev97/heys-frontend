<script lang="ts" setup>
import useMetaMaskProvider from '@/composables/web3/account/useMetaMaskProvider'
import requestNetworkSwitch from '@/composables/web3/account/useChangeNetwork'
import useCheckNetworkConnectionStatus, {
  NetworkConnectionStatus,
} from '@/composables/web3/account/useNetworkConnectionStatus'

// composables
const { provider } = useMetaMaskProvider()
const { networkConnectionStatus } = useCheckNetworkConnectionStatus()

// methods
async function connectWallet() {
  await provider?.value?.send('eth_requestAccounts', [])
}
</script>
<template>
  <div class="flex flex-col">
    <!-- <p class="text-center">Network Status</p> -->
    <div v-if="NetworkConnectionStatus[networkConnectionStatus] === 'no-provider'">
      Install or enable MetaMask
    </div>
    <div
      v-else-if="NetworkConnectionStatus[networkConnectionStatus] === 'not-connected'"
      class="flex flex-col"
    >
      <button
        class="py-2 mx-auto mt-5 mb-4 w-1/2 text-xl text-white bg-green-900 hover:bg-green-800 active:bg-green-700 rounded duration-200"
        :style="{ 'min-width': '285px' }"
        @click="connectWallet"
      >
        Connect your wallet
      </button>
    </div>
    <div
      v-else-if="NetworkConnectionStatus[networkConnectionStatus] === 'connected-wrong-network'"
      class="flex flex-col"
    >
      <button
        class="py-2 mx-auto mt-5 mb-4 w-1/2 text-xl text-white bg-green-900 hover:bg-green-800 active:bg-green-700 rounded duration-200"
        :style="{ 'min-width': '285px' }"
        @click="requestNetworkSwitch"
      >
        Switch to Polygon
      </button>
    </div>
  </div>
</template>
