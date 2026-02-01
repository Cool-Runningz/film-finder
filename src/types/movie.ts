export interface Genre {
  id: string
  title: string
  movies?: { id: string }[]
}

export interface GenresResponse {
  data: Genre[]
}

export interface Movie {
  id: string
  title: string
  posterUrl?: string
  rating?: string
  summary?: string
  duration?: string
  directors?: string[]
  mainActors?: string[]
  datePublished?: string
  ratingValue?: number
  bestRating?: number
  worstRating?: number
  writers?: string[]
  genres?: Genre[]
}

export interface MoviesResponse {
  data: Movie[]
  totalPages: number
}
