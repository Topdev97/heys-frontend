import { ref } from 'vue'
import { useQuery } from 'vue-query'
import useMetaMaskProvider from '@/composables/web3/account/useMetaMaskProvider'

const refetchAccountIndex = ref(0)

if (window.ethereum) {
  ethereum.on('accountsChanged', () => {
    refetchAccountIndex.value += 1
  })
}

export default function useConnectedAccount() {
  const { provider } = useMetaMaskProvider()

  const { data: account, ...other } = useQuery(
    ['connectedAccounts', !!provider, refetchAccountIndex],
    () => {
      console.log('Checking connected accounts')
      if (provider?.value) {
        return ethereum.request({ method: 'eth_accounts' }).then(r => r[0] ?? '')
      } else {
        return ''
      }
    }
  )

  return { account, ...other }
}
