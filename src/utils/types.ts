export enum DocType {
  'all' = -1,
  'document' = 0,
  'spreadsheets' = 1,
  'presentation' = 2,
}

export interface DocDataBase {
  url: string
  description: string
  tags: string[]
}

export interface DocDataFull extends DocDataBase {
  id: number
  title: string
  slug: string
  docUid: string
  docId: number
  docType: DocType
  upvotes: number
  views: number
  reads: number
  clicks: number
  permissions: any // todo
  meta: any // todo
  payments: any // todo
  contentDate: number
  content: string
  createdAt: number
  updatedAt: number
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
