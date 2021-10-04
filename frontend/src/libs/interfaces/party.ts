export type Provider = '넷플릭스' | '왓챠' | '웨이브' | ''

export type ProviderNameEn = 'netflix' | 'wavve' | 'watcha'

export type ProviderFilter = {
  [key: string]: {
    name: ProviderNameEn
    active: boolean
  }
}
