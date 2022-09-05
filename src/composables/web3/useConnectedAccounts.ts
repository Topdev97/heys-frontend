import { useQuery } from 'vue-query'
import useMetaMaskProvider from './useMetaMaskProvider'

export default function useConnectedAccount() {
  const { provider } = useMetaMaskProvider()

  const { data: account, ...other } = useQuery(
    ['connectedAccounts', !!provider],
    () => {
      if (provider) {
        return ethereum
          .request({ method: 'eth_accounts' })
          .then(r => r[0] ?? '')
      } else {
        return ''
      }
    }
  )

  return { account, ...other }
}
