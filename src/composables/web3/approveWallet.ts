import { ethers, BigNumber } from 'ethers'
import useMetaMaskProvider from './useMetaMaskProvider'
import USDCAbi from '@/abis/USDCAbi.json'
import { USDC_ADDRESSES, GATHERING_ADDRESSES } from '../../utils/consts'

export default async function approveWallet(amount: number) {
  const { provider } = useMetaMaskProvider()

  const signer = provider.getSigner()
  const usdcInstance = new ethers.Contract(
    USDC_ADDRESSES['USDC'],
    USDCAbi,
    signer
  )
  console.log('usdcInstance', usdcInstance)
  let approvedAmount = amount
  try {
    const tx = await usdcInstance.approve(
      GATHERING_ADDRESSES['gOTB'],
      BigNumber.from(approvedAmount)
    )
    console.log('tx', tx)
  } catch (error) {
    console.log('error', error)
  }
}
