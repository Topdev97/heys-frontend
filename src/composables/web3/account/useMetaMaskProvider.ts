import { ref } from 'vue'
import { useQuery } from 'vue-query'
import { ethers } from 'ethers'
import { Web3Provider } from "@ethersproject/providers";

const provider = ref<Web3Provider | null | undefined>(undefined)

export default function useMetaMaskProvider() {
  if (provider.value === null) {
    return {
      provider: null
    }
  }

  try {
    provider.value = new ethers.providers.Web3Provider(window.ethereum, 'any')
  } catch (_) {
    console.log('Meta mask not installed')
    provider.value = null
  }
  return {
    provider,
  }
}
