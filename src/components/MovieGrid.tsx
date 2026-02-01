'use client'

import { useState } from 'react'
import { Select } from '@/catalyst/Select'
import { Field, Label } from '@/catalyst/Fieldset'
import { Pagination, PaginationPrevious, PaginationNext, PaginationList, PaginationPage, PaginationGap } from '@/catalyst/Pagination'

import { useMovieApi } from '@/hooks/useMovieApi'
import { ITEMS_PER_PAGE } from '@/utils/constants'
import { getPageNumbers } from '@/utils/helpers'
import placedholderImage from '@/images/unsplash-movie-image-placeholder.jpg'

import SearchInput from './SearchInput'
import SkeletonLoader from './SkeletonLoader'

//TODO: Extract types to a separate file
//TODO: Extract other components (like MovieCard) to separate files
interface Genre {
  id: string
  title: string
  movies: { id: string }[]
}

interface GenresResponse {
  data: Genre[]
}

interface Movie {
  id: string
  title: string
  posterUrl?: string
  rating?: string
}

interface MoviesResponse {
  data: Movie[]
  total: number
  totalPages: number
}

export default function MovieGrid() {
  const [selectedGenre, setSelectedGenre] = useState<string>('')
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState<string>('')

    const { data: genresResponse, error: genresError, isLoading: genresLoading } = useMovieApi<GenresResponse>('/genres/movies') // Fetch genres
    const genreParam = selectedGenre ? `&genre=${selectedGenre}` : ''
    const searchParam = search ? `&search=${search}` : ''
    const { data: moviesResponse, error: moviesError, isLoading: moviesLoading } = useMovieApi<MoviesResponse>(`/movies?page=${page}&limit=${ITEMS_PER_PAGE}${genreParam}${searchParam}`) // Fetch movies

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
                <Field>
                  <Label>Filter by Genre</Label>
                <Select className='max-w-fit' value={selectedGenre} onChange={(e) => { setSelectedGenre(e.target.value); setPage(1); }}>
                  <option value="">All Genres</option>
                  {genres?.map((genre) => (
                    <option key={genre.id} value={genre.title}>
                      {genre.title}
                    </option>
                  ))}
                </Select>
                </Field>

                  <div className=''>
                     {search.length > 0 && (
                     <span className="text-sm text-gray-700 mb-3">
                {movies?.length ? `${movies.length} movies found` : 'No movies found'}
              </span>
                     )}
                <SearchInput value={search} onChange={(value) => { setSearch(value); setPage(1); }} />
</div>
                </div>
            </section>

            {/* Product grid */}
            <section aria-labelledby="products-heading" className="mt-8 pb-24">
              <h2 id="products-heading" className="sr-only">
                Movies
              </h2>

              <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
                {moviesLoading
                  ? Array.from({ length: ITEMS_PER_PAGE }).map((_, i) => <SkeletonLoader key={i} />)
                  : movies?.map((movie) => (
                      <article key={movie.id} className="group">
                        <img
                          alt={movie.title}
                          src={movie.posterUrl || placedholderImage}
                          className="aspect-square w-full rounded-lg object-cover group-hover:opacity-75 sm:aspect-[2/3]"
                        />
                        <div className="mt-4 flex items-center justify-between text-base font-medium text-gray-900">
                          <h3>{movie.title}</h3>
                        </div>
                        <p className="mt-1 text-sm italic text-gray-500">{movie.rating || 'No rating'}</p>
                      </article>
                    ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <Pagination className="mt-8">
                  <PaginationPrevious onClick={() => page > 1 && setPage(page - 1)} />
                  <PaginationList>
                    {getPageNumbers(page, totalPages).map((item, index) =>
                      item === 'gap' ? (
                        <PaginationGap key={`gap-${index}`} />
                      ) : (
                        <PaginationPage
                          key={item}
                          current={item === page}
                          onClick={() => setPage(item)}
                        >
                          {item}
                        </PaginationPage>
                      )
                    )}
                  </PaginationList>
                  <PaginationNext onClick={() => page < totalPages && setPage(page + 1)} />
                </Pagination>
              )}
            </section>  
          </div>
        </main>
      </div>
    </div>
  )
}
