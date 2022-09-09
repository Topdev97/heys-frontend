import { useQuery } from 'vue-query'
import { ethers } from 'ethers'
import { computed, unref } from 'vue'
import { Network } from '@ethersproject/networks'

export default function useTokenBalance(account: any, tokenAddress: string, network: number) {
  const isEnabled = computed(() => {
    return Boolean(unref(account))
  })

  const { data: balance, ...other } = useQuery(
    ['tokenBalance', tokenAddress, account],
    async () => {
      if (!account.value) {
        return 'Not connected'
      } else {
        const provider = ethers.getDefaultProvider('https://rpc-mumbai.maticvigil.com')
        // const provider = new AlchemyProvider("maticmum")

        const abi = [
          'function balanceOf(address account) view returns (uint256)',
          'function decimals() view returns (uint256)',
        ]
        const tokenContract = new ethers.Contract(tokenAddress, abi, provider)

        return tokenContract.balanceOf(account.value)
      }
    },
    {
      enabled: isEnabled,
    }
  )

  return { balance, ...other }
}
