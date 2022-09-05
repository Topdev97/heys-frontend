import { NETWORKS, TOKENS } from '../../utils/consts'

export default async function changeNetwork() {
  let chainId: number = Number(NETWORKS.MATIC_MUMBAI)
  let chainIdHex: string = Number(NETWORKS.MATIC_MUMBAI).toString(16)

  if (ethereum.networkVersion !== chainId) {
    try {
      await ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: '0x' + chainIdHex }],
      })
    } catch (err: any) {
      console.log('err.code', err)
      if (err.code === 4902) {
        await ethereum.request({
          method: 'wallet_addEthereumChain',
          params: [
            {
              chainName: 'Mumbai Testnet',
              chainId: chainIdHex,
              nativeCurrency: { name: 'MATIC', decimals: 18, symbol: 'MATIC' },
              rpcUrls: ['https://matic-mumbai.chainstacklabs.com'],
            },
          ],
        })
      }
    }
  }
}
