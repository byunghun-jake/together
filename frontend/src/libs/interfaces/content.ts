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
