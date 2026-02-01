
import { Button } from '@/catalyst/Button'
import { StarIcon } from '@heroicons/react/16/solid'
import placeholderImage from '@/images/unsplash-movie-image-placeholder.jpg'
import type { Movie } from '@/types/movie'

interface MovieCardProps {
  movie: Movie
  onViewDetails?: (movie: Movie) => void
  onFavorite?: (movie: Movie) => void
}

export default function MovieCard({
  movie,
  onViewDetails,
  onFavorite,
}: MovieCardProps) {
  return (
    <article className="group">
      <img
        alt={movie.title}
        src={movie.posterUrl || placeholderImage}
        className="aspect-square w-full rounded-lg object-cover group-hover:opacity-75 sm:aspect-2/3"
      />
      <div className="mt-4 flex items-center justify-between text-base font-medium text-gray-900">
        <h3>{movie.title}</h3>
      </div>
      <p className="mt-1 text-sm italic text-gray-500">{movie.rating || 'No rating'}</p>
      
      {/* Action buttons */}
      <div className="mt-2 flex justify-between space-x-2">
          <Button className="w-full cursor-pointer" onClick={() =>  onViewDetails?.(movie)}>
            View Details
          </Button>
          <Button className="w-full cursor-pointer" outline onClick={() =>  onFavorite?.(movie)}>
            <span className="flex items-center">
              <StarIcon className="w-4 h-4 mr-1" />
              Favorite
            </span>
          </Button>
      </div>
    </article>
  )
}
