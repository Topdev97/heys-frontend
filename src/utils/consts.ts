import { NetworkInfo } from './types'

const env = import.meta.env

export const DEPLOYED_NETWORK: number = env.DEPLOYED_NETWORK
  ? Number(env.VITE_DEPLOYED_NETWORK)
  : 80001

export const CONFIG = {
  API_ADDRESS: env.VITE_API_ADDRESS,
}

export const TOKENS = {
  137: {
    MATIC: {
      address: '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE',
      decimals: 18,
      denom: 'MATIC',
    },
  },
  80001: {
    MATIC: {
      address: '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE',
      decimals: 18,
      denom: 'MATIC',
    },
  },
}

export const NETWORKS = {
  MATIC: 137,
  MATIC_MUMBAI: 80001,
}

export const RPC_URLS: Record<number, string> = {
  80001: 'https://rpc-mumbai.maticvigil.com',
}

export const RPC_URL = RPC_URLS[DEPLOYED_NETWORK]

export const GATHERING_ADDRESSES = {
  'blockchain-gathering': '0x10593824C9E42aae471BAA008a746D9D1C6E06bE',
}

export const USDC_ADDRESSES = {
  USDC: '0xaBBc68F5B8882f6c74E8D9F30F21737AA586d46d',
}
