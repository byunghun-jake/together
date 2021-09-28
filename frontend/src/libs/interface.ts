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

export interface Party {
  id: number
  provider: string
  title: string
  desc: string
  logoUrl: string
  member: {
    totalCount: number
    joinCount: number
  }
  endDate: string
  restDays: number
  pricePerDay: number
  totalCount: number
}

export type Provider = '넷플릭스' | '왓챠' | '웨이브' | ''
type Rule = '19세 이상' | '계정양도 불가' | '공유 금지' | '환불 불가'
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
