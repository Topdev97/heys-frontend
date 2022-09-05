import { BigNumber, ethers } from 'ethers'

export function truncateAddress(address: string): string {
  return `${address.slice(0, 5)}...${address.slice(address.length - 4)}`
}

export function formatBalance(balance: any): number {
  return balance?._isBigNumber ? Number(ethers.utils.formatEther(balance)) : 0
}

export function formatNumber(amount: number, digits?: number): string {
  return amount.toLocaleString(undefined, {
    maximumFractionDigits: digits ?? 2,
  })
}
