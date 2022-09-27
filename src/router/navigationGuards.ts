import { GATHERING_ADDRESSES, RPC_URL } from '@/utils/consts'
import { ethers } from 'ethers'

export async function gatheringBackstageGuard(next: any) {
  const provider = ethers.getDefaultProvider(RPC_URL)
  const account = await window.ethereum.request({ method: 'eth_accounts' }).then(r => r[0] ?? '')
  if (!account) {
    next('/error?type=not-connected')
  } else {
    const abi = ['function balanceOf(address account) view returns (uint256)']
    const tokenContract = new ethers.Contract(
      GATHERING_ADDRESSES['blockchain-gathering'],
      abi,
      provider
    )
    const balance = await tokenContract.balanceOf(account)
    if (Number(balance) > 0) {
      next()
    } else {
      next('/error?type=no-gathering-token-balance')
    }
  }
}
