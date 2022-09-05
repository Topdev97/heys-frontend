import { NETWORKS, USDC_ADDRESSES } from '../../utils/consts'
export default async function addToken() {
  let chainId: number = Number(NETWORKS.MATIC_MUMBAI)
  if (ethereum.networkVersion == chainId) {
    try {
      await ethereum.request({
        method: 'wallet_watchAsset',
        params: {
          type: 'ERC20',
          options: {
            address: USDC_ADDRESSES['USDC'],
            symbol: 'USDC',
            decimals: 18,
            image: 'https://etherscan.io/token/images/centre-usdc_28.png',
          },
        },
      })
    } catch (error) {
      console.log('error', error)
    }
  }
}
