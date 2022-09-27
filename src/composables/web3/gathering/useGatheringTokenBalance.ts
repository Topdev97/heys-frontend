import { watch } from 'vue'
import useTokenBalance from '../account/useTokenBalance'
import { GATHERING_ADDRESSES, NETWORKS } from '@/utils/consts'
import useConnectedAccount from '../account/useConnectedAccounts'
import { store } from '@/store'
import { formatBalance } from '@/utils'

export default function useGatheringTokenBalance() {
  const { account } = useConnectedAccount()

  const { balance, isLoading, ...other } = useTokenBalance(
    account,
    GATHERING_ADDRESSES['blockchain-gathering'],
    NETWORKS.MATIC_MUMBAI
  )

  watch(isLoading, newVal => {
    if (!newVal) {
      store.commit('setGatheringTokenBalance', formatBalance(balance.value))
    }
  })

  return { balance, ...other }
}
