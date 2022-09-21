import { useQuery } from 'vue-query'
import { ethers } from 'ethers'
import { computed, unref } from 'vue'
import useMetaMaskProvider from './useMetaMaskProvider'

export default function useNativeBalance(account: any, network: number) {
  const { provider } = useMetaMaskProvider()

  const isEnabled = computed(() => {
    return !!unref(account)
  })

  const { data: balance, ...other } = useQuery(
    ['nativeBalance', !!provider, account],
    () => {
      console.log('Checking native token balance')
      if (!provider?.value) {
        return 'Not connected'
      } else if (Number(window.ethereum.networkVersion) !== network) {
        return 'Wrong network'
      } else {
        return provider.value?.getBalance(unref(account))
      }
    },
    {
      enabled: isEnabled,
    }
  )

  return { balance, ...other }
}
