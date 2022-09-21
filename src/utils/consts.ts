import { NetworkInfo } from './types'

const env = import.meta.env

export const ACTIVE_NETWORK: number = env.VITE_ACTIVE_NETWORK
  ? Number(env.VITE_ACTIVE_NETWORK)
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

export const RPC_URL = RPC_URLS[ACTIVE_NETWORK]

export const GATHERING_ADDRESSES = {
  gBG: '0xc341333737C6CDec94D40B839b43684eA9B0e5D8',
}

export const USDC_ADDRESSES = {
  USDC: '0x8798236AdD4e22a1D029C2B8d9b0D585618496Ca',
}
