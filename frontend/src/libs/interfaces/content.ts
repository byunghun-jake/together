// export interface Content {
//   id: number
//   title: string
//   posterPath: string
//   simRate: number
//   providers: string[]
//   firstAirYear: number
//   rated: string
//   seasons: number
//   overview: string
// }

export interface Youtube {
  id: {
    kind: string
    videoId: string
  }
  snippet: {
    title: string
    thumbnails: {
      medium?: {
        url: string
      }
      high?: {
        url: string
      }
    }
  }
}

export interface Comment {
  id: number
  user: {
    nickName: string
    profileImg: string
  }
  comment: string
  like: number
  rating: number
}

export interface Genre {
  id: number
  name: string
  kName: string
  genreId: number
}

export type ProviderNameEn =
  | 'Netflix'
  | 'Watcha'
  | 'Naver Store'
  | 'wavve'
  | 'Crunchyroll'
  | 'Curiosity Stream'
  | 'Hoichoi'
  | 'Classix'
  | 'BroadwayHD'
  | 'Magellan TV'
  | 'WOW Presents Plus'
  | 'Amazon Prime Video'

interface Provider {
  id: number
  logoUrl: string
  name: ProviderNameEn
  pricePerDay: number
}

export interface Content {
  id: number
  movieId: number
  originalTitle: string
  title: string
  overview: string
  posterPath: string
  releaseDate: string
  providers: Provider[]
  recommends: {
    [key: string]: string
  }[]
  genres: Genre[]
}

export type ProviderFilter = {
  name: ProviderNameEn
  active: boolean
}[]
