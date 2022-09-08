export interface Doc {
  id: number
  uid: string
  title: string
  url: string
}

export interface DocContract {
  id: number
  uid: string
  title: string
  url: string
}

export interface Tag {
  id: number
  title: string
  text: string
}

export interface MarketData {
  marketCap: string
  marketValuation: string
  volume: string
  price: string
}

export interface Network {
  chainName: string
  chainId: string
  subgraph: string
  coingeckoPlatform: string
  vault: string
  RPC: string
}

export interface NetworkInfo {
  [key: string]: Network
}
