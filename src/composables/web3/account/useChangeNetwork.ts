import { ACTIVE_NETWORK } from '@/utils/consts'

export default async function requestNetworkSwitch() {
  const chainId = ACTIVE_NETWORK
  const chainIdHex: string = ACTIVE_NETWORK.toString(16)

  if (ethereum.networkVersion !== chainId) {
    try {
      await ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: '0x' + chainIdHex }],
      })
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
      } else {
        console.log('err.code', err)
      }
    }
  }
}
