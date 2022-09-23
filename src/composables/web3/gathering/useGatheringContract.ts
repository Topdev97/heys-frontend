import { ethers } from 'ethers'
import { Contract } from 'ethers-multicall'

import gatheringAbi from '@/abis/GatheringAbi.json'
import { GATHERING_ADDRESSES } from '@/utils/consts'

import useMetaMaskProvider from '@/composables/web3/account/useMetaMaskProvider'
import useRPCProvider from '../account/useRPCProvider'

export const gatheringInstanceMulti = new Contract(
  GATHERING_ADDRESSES['blockchain-gathering'],
  gatheringAbi.filter(abi => abi.type === 'function')
)

const { provider } = useMetaMaskProvider()
const signer = provider?.value?.getSigner()

export const gatheringInstanceMM = new ethers.Contract(
  GATHERING_ADDRESSES['blockchain-gathering'],
  gatheringAbi.filter(abi => abi.type === 'function'),
  signer
)

const { provider: providerRPC } = useRPCProvider()

export const gatheringInstanceRPC = new ethers.Contract(
  GATHERING_ADDRESSES['blockchain-gathering'],
  gatheringAbi.filter(abi => abi.type === 'function'),
  providerRPC
)
