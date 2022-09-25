import { DEPLOYED_NETWORK } from '@/utils/consts'

enum NetworkSwitchResponse {
  'error' = 0,
  'cancelled' = 1,
  'switched' = 2,
  'added_and_switched' = 3,
}

export default async function requestNetworkSwitch(): Promise<NetworkSwitchResponse> {
  const chainId = DEPLOYED_NETWORK
  const chainIdHex: string = DEPLOYED_NETWORK.toString(16)

  if (ethereum.networkVersion !== chainId) {
    try {
      await ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: '0x' + chainIdHex }],
      })

      return 2
    } catch (err: any) {
      if (err.code === 4902) {
        await ethereum.request({
          method: 'wallet_addEthereumChain',
          params: [
            {
              chainName: 'Mumbai Testnet',
              chainId: '0x' + chainIdHex,
              nativeCurrency: { name: 'MATIC', decimals: 18, symbol: 'MATIC' },
              rpcUrls: ['https://matic-mumbai.chainstacklabs.com'],
            },
          ],
        })

        return 3
      } else {
        console.log('err.code', err)
        return 1
      }
    }
  }
  return 0
}
