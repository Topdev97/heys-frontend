<script lang="ts" setup>
import { DEPLOYED_NETWORK } from '@/utils/consts'
import useConnectedAccount from '@/composables/web3/account/useConnectedAccounts'
import useConnecteNetwork from '@/composables/web3/account/useConnectedNetwork'
import useMetaMaskProvider from '@/composables/web3/account/useMetaMaskProvider'
import requestNetworkSwitch from '@/composables/web3/account/useChangeNetwork'

// composables
const { provider } = useMetaMaskProvider()
console.log('provider', provider)
const { account } = useConnectedAccount()
const { connectedChainId } = useConnecteNetwork()

// methods
async function connectWallet() {
  await provider?.value?.send('eth_requestAccounts', [])
}
</script>
<template>
  <div class="flex flex-col">
    <!-- <p class="text-center">Network Status</p> -->
    <div v-if="!provider">Install or enable MetaMask</div>
    <div v-else-if="!account" class="flex flex-col">
      <!-- <div class="text-center">Connect your account first</div> -->
      <button
        class="py-2 mx-auto mt-5 mb-4 w-1/2 text-white bg-green-900 hover:bg-green-800 active:bg-green-700 rounded duration-200"
        :style="{ 'font-size': '1.0rem!important', 'min-width': '285px' }"
        @click="connectWallet"
      >
        Connect
      </button>
    </div>
    <div v-else-if="connectedChainId === DEPLOYED_NETWORK">Correct network</div>
    <div v-else>
      <div>Please switch to 80001</div>
      <button class="btn-dark" @click="requestNetworkSwitch">Switch</button>
    </div>
  </div>
</template>
