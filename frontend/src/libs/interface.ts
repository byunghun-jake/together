export interface FormDataListItem {
  label: string
  type: string
  value: string
  placeholder: string
  errors: {
    [key: string]: string
  }
  validator?: (param: ValidateParam, password?: string) => ValidateData
  message?: string
}

export interface FormDataList {
  [key: string]: FormDataListItem
}

export interface ValidateParam {
  key: string
  value: string
  // form을 interface로 설정해 두어야 한다. 임시방편으로 unknown
  form: unknown
}

export interface ValidateData {
  key: string
  type: string
  status: boolean
  message?: string
}

// Content
export interface Genre {
  id: number
  name: string
  k_name: string
}
export interface Content {
  id: number
  title: string
  posterPath: string
  simRate: number
  providers: string[]
  firstAirYear: number
  rated: string
  seasons: number
  overview: string
}

export type Provider = '넷플릭스' | '왓챠' | '웨이브' | ''
export interface Party {
  id: number
  title: string
  desc: string
  memberLimit: number
  endDate: string
  pricePerDay: number
  providerName: Provider
  providerLogoUrl: string
  providerPricePerDay: number
  hostName: string
  membersCount: number
}

export type Validator = (key: string, value: string | number) => ValidateData

export interface PartyFormField {
  label: string
  type: 'text' | 'number' | 'date'
  value: string | number
  placeholder?: string
  errors: {
    [key: string]: string
  }
  validators?: Validator[]
  message?: string
}
export interface PartyForm {
  [key: string]: PartyFormField
}

export interface InputEvent<T = Element> {
  relatedTarget: EventTarget | null
  target: EventTarget & T
}

// User
type SNSProvider = 'Google' | 'Naver' | null

export type InputUser = {
  pk: number
  username?: string
  nickname?: string
  phone_number?: string
  email?: string
  favorite_genres?: {
    id: number
    name: string
    k_name: string
  }[]
}

export type OutputUser = {
  pk: number
  username?: string
  nickname?: string
  phoneNumber?: string
  email?: string
  favoriteGenres?: {
    id: number
    name: string
    kName: string
  }[]
}
