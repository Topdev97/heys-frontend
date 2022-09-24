import useTokenBalance from '../account/useTokenBalance'
import { GATHERING_ADDRESSES, NETWORKS } from '@/utils/consts'
import useConnectedAccount from '../account/useConnectedAccounts'

export default function useGatheringTokenBalance() {
  const { account } = useConnectedAccount()

  const { balance, ...other } = useTokenBalance(
    account,
    GATHERING_ADDRESSES['blockchain-gathering'],
    NETWORKS.MATIC_MUMBAI
  )

  return { balance, ...other }
}
