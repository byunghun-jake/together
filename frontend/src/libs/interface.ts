export interface FormDataList {
  [key: string]: FormDataListItem
}

export interface FormDataListItem {
  label: string
  type: string
  value: string
  placeholder: string
  errors: {
    [key: string]: string
  }
  validator?: (param: ValidateParam) => ValidateData
  message?: string
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
