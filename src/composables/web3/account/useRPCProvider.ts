import { ethers } from 'ethers'
import { RPC_URL } from '@/utils/consts'

export default function useRPCProvider() {
  return {
    provider: ethers.getDefaultProvider(RPC_URL),
  }
}
