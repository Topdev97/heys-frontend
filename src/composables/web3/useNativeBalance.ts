import { useQuery } from 'vue-query'
import { ethers } from 'ethers'
import { computed, unref } from 'vue'
import useMetaMaskProvider from './useMetaMaskProvider'

export default function useNativeBalance(
  account: any,
  network: number
) {
  const { provider } = useMetaMaskProvider()

  const isEnabled = computed(() => {
    return !!unref(account)
  })

  const { data: balance, ...other } = useQuery(
    ['nativeBalance', !!provider, account],
    () => {
      if (!provider) {
        return 'Not connected'
      } else if (Number(window.ethereum.networkVersion) !== network) {
        return 'Wrong network'
      } else {
        return provider.getBalance(unref(account))
      }
    },
    {
      enabled: isEnabled,
    }
  )

  return { balance, ...other }
}
