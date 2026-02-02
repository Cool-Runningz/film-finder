'use client'

import { useState } from 'react'
import { useQueryState, parseAsString, parseAsInteger, debounce } from 'nuqs'
import { Text } from '@/catalyst/Text'
import MovieDetailsModal from './MovieDetailsModal'
import MovieCard from './MovieCard'
import PaginationSection from './PaginationSection'

import { useMovieApi } from '@/hooks/useMovieApi'
import { ITEMS_PER_PAGE } from '@/utils/constants'
import type { Movie, MoviesResponse, GenresResponse } from '@/types/movie'

import SearchInput from './SearchInput'
import SkeletonLoader from './SkeletonLoader'
import GenreFilter from './GenreFilter'

export default function MovieGrid() {
  // URL state management with nuqs
  const [search, setSearch] = useQueryState('search', parseAsString.withDefault('').withOptions({ clearOnDefault: true}))
  const [selectedGenre, setSelectedGenre] = useQueryState('genre', parseAsString.withDefault('').withOptions({ clearOnDefault: true }))
  const [page, setPage] = useQueryState('page', parseAsInteger.withDefault(1).withOptions({ clearOnDefault: true }))
  
  // Local React state
  const [isOpen, setIsOpen] = useState(false)
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null)

  //Data fetching
  const { data: genresResponse } = useMovieApi<GenresResponse>('/genres/movies') // Fetch genres
  const genreParam = selectedGenre ? `&genre=${selectedGenre}` : ''
  const searchParam = search ? `&search=${search}` : ''
  const { data: moviesResponse, isLoading: moviesLoading } = useMovieApi<MoviesResponse>(`/movies?page=${page}&limit=${ITEMS_PER_PAGE}${genreParam}${searchParam}`) // Fetch movies
  const { data: movieDetails, isLoading: movieDetailsLoading } = useMovieApi<Movie>(selectedMovie ? `/movies/${selectedMovie.id}` : null) // Fetch movie details when selectedMovie changes

  const handleViewDetails = (movie: Movie) => {
    setSelectedMovie(movie)
    setIsOpen(true)
  }

  const handleFavorite = (movie: Movie) => {
    // Handle favorite action - placeholder for future implementation
    console.log('Favorited movie:', movie.title)
  }

  const genres = genresResponse?.data
  const movies = moviesResponse?.data
  const totalPages = moviesResponse?.totalPages || 1

  return (
    <div className="bg-gray-50">
      <div> 
        <main>
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
            <div className="py-16 text-center">
              <h1 className="text-4xl font-bold tracking-tight text-gray-900">Film Finder</h1>
            </div>

            {/* Filters */}
            <section aria-labelledby="filter-heading" className="border-t border-gray-200 pt-6">
              <h2 id="filter-heading" className="sr-only">
                Product filters
              </h2>
              <div className='flex justify-between items-center'>
                <GenreFilter genres={genres} selectedGenre={selectedGenre} onGenreChange={(value: string) => { 
                  setSelectedGenre(value); 
                  setPage(1); 
                }} />

                  <div className='flex flex-col gap-y-3'>
                     {search.length > 0 && (
                     <Text>
                {movies?.length ? `${movies.length} results (page ${page} of ${totalPages})` : 'No movies found'}
              </Text>
                     )}
                <SearchInput value={search} onChange={(value) => { 
                   setSearch(value, {
          // Send immediate update if resetting, otherwise debounce at 500ms
          limitUrlUpdates: value === '' ? undefined : debounce(300)
        })
                  setPage(1); 
                }} />
</div>
                </div>
            </section>

            {/* Product grid */}
            <section aria-labelledby="products-heading" className="mt-8 pb-24">
              <h2 id="products-heading" className="sr-only">
                Movies
              </h2>

              <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8 mb-16">
                {moviesLoading
                  ? Array.from({ length: ITEMS_PER_PAGE }).map((_, i) => <SkeletonLoader key={i} />)
                  : movies?.map((movie) => (
                      <MovieCard
                        key={movie.id}
                        movie={movie}
                        onViewDetails={handleViewDetails}
                        onFavorite={handleFavorite}
                      />
                    ))}
              </div>

              {/* Pagination */}
              <PaginationSection
                currentPage={page}
                totalPages={totalPages}
                onPageChange={(newPage) => setPage(newPage)}
              />
            </section>  
          </div>
        </main>
      </div>
      <MovieDetailsModal isOpen={isOpen} setIsOpen={setIsOpen} movie={movieDetails} isLoading={movieDetailsLoading} />
    </div>
  )
}
