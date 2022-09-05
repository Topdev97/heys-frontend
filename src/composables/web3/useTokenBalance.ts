import { useQuery } from 'vue-query'
import { ethers } from 'ethers'
import { computed, unref } from 'vue'
import useMetaMaskProvider from './useMetaMaskProvider'

export default function useTokenBalance(
  account: any,
  tokenAddress: string,
  network: string
) {
  const provider = useMetaMaskProvider()

  const acc = unref(account)
  console.log(acc)
  const isEnabled = computed(() => {
    return Boolean(unref(account))
  })

  const { data: balance, ...other } = useQuery(
    ['tokenBalance', !!provider, tokenAddress, acc],
    () => {
      if (!provider) {
        return 'Not connected'
      } else if (window.ethereum.networkVersion !== network) {
        return 'Wrong network'
      } else if (!acc) {
        return ''
      } else {
        const abi = [
          'function balanceOf(walletAddress) view returns (uint256)',
          'function decimals() view returns (uint256)',
        ]
        const tokenContract = new ethers.Contract(tokenAddress, abi, provider)
        return tokenContract.balanceOf(account)
      }
    },
    {
      enabled: isEnabled,
    }
  )

  return { balance, ...other }
}
