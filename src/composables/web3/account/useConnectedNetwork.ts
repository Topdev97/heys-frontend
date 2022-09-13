import { ref } from 'vue'
import { useQuery } from 'vue-query'
import useMetaMaskProvider from '@/composables/web3/account/useMetaMaskProvider'

const refetchNetworkIndex = ref(0)

if (window.ethereum) { 
  ethereum.on('chainChanged', () => {
    refetchNetworkIndex.value += 1
  })
}

export default function useConnectedNetwork() {
  const { provider } = useMetaMaskProvider()

  const { data: connectedChainId, ...other } = useQuery(
    ['connectedNetwork', !!provider, refetchNetworkIndex],
    () => {
      if (provider) {
        return Number(window.ethereum?.networkVersion)
      } else {
        return 0
      }
    }
  )

  return { connectedChainId, ...other }
}
