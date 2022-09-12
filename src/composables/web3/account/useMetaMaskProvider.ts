import { useQuery } from 'vue-query'
import { ethers } from 'ethers'

export default function useMetaMaskProvider() {
  let provider = null
  try {
    provider = new ethers.providers.Web3Provider(window.ethereum)
  } catch (_) {
    console.log('Meta mask not installed')
  }
  return {
    provider,
  }
}
