import { DEPLOYED_NETWORK } from '@/utils/consts'
import useConnectedAccount from '@/composables/web3/account/useConnectedAccounts'
import useConnecteNetwork from '@/composables/web3/account/useConnectedNetwork'
import useMetaMaskProvider from '@/composables/web3/account/useMetaMaskProvider'
import { computed, Ref } from 'vue'

export enum NetworkConnectionStatus {
  'no-provider',
  'not-connected',
  'connected-wrong-network',
  'connected',
}

export default function useCheckNetworkConnectionStatus() {
  const { provider } = useMetaMaskProvider()
  const { account } = useConnectedAccount()
  const { connectedChainId } = useConnecteNetwork()

  const networkConnectionStatus: Ref<NetworkConnectionStatus> = computed(() => {
    if (!provider.value) return NetworkConnectionStatus['no-provider']
    if (!account.value) return NetworkConnectionStatus['not-connected']
    if (connectedChainId.value !== DEPLOYED_NETWORK)
      return NetworkConnectionStatus['connected-wrong-network']
    return NetworkConnectionStatus['connected']
  })

  return {
    networkConnectionStatus,
  }
}
