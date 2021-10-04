export interface Token {
  accessToken: string
  refreshToken: string
}

export type InputUser = {
  id: number
  username?: string
  nick_name?: string
  phone_number?: string
  email?: string
  favorite_genres?: {
    id: number
    name: string
    k_name: string
  }[]
}

export type OutputUser = {
  id: number
  username?: string
  nickName?: string
  phoneNumber?: string
  email?: string
  favoriteGenres?: {
    id: number
    name: string
    kName: string
  }[]
}
