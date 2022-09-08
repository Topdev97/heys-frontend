import { Contract } from 'ethers-multicall'
import gatheringAbi from '@/abis/GatheringAbi.json'
import { GATHERING_ADDRESSES } from '@/utils/consts'

export default new Contract(
  GATHERING_ADDRESSES['gBG'],
  gatheringAbi.filter(abi => abi.type === 'function')
)
