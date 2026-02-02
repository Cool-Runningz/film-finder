import { Dialog, DialogTitle, DialogBody, DialogActions } from '@/catalyst/Dialog'
import { Button } from '@/catalyst/Button'
import { Text, Strong } from '@/catalyst/Text'
import type { Movie } from '@/types/movie'
import { parseDuration, formatDate } from '@/utils/helpers'

interface MovieDetailsModalProps {
  isOpen: boolean
  setIsOpen: (open: boolean) => void
  movie: Movie | null | undefined
  isLoading: boolean
}

export default function MovieDetailsModal({ isOpen, setIsOpen, movie, isLoading }: MovieDetailsModalProps) {
  if (isLoading || !movie) {
    return (
      <Dialog open={isOpen} onClose={setIsOpen} size="2xl">
        <DialogTitle>Loading...</DialogTitle>
        <DialogBody>
          <Text>Loading movie details...</Text>
        </DialogBody>
        <DialogActions>
          <Button onClick={() => setIsOpen(false)}>Close</Button>
        </DialogActions>
      </Dialog>
    )
  }

  return (
    <Dialog open={isOpen} onClose={setIsOpen} size="2xl">
      <DialogTitle>{movie.title}</DialogTitle>
      <DialogBody>
        <div className="flex flex-col md:flex-row gap-4">
          <img
            src={movie.posterUrl}
            alt={movie.title}
            className="w-full md:w-1/3 rounded-lg object-cover"
          />
          <div className="flex-1">
            <Text><Strong>Rating:</Strong> {movie.rating}</Text>
            <Text><Strong>Summary:</Strong> {movie.summary}</Text>
            <Text><Strong>Duration:</Strong> {parseDuration(movie.duration || '')}</Text>
            <Text><Strong>Directors:</Strong> {movie.directors?.join(', ')}</Text>
            <Text><Strong>Main Actors:</Strong> {movie.mainActors?.join(', ')}</Text>
            <Text><Strong>Release Date:</Strong> {formatDate(movie.datePublished || '')}</Text>
            <Text><Strong>Rating Value:</Strong> {movie.ratingValue} / {movie.bestRating}</Text>
            <Text><Strong>Writers:</Strong> {movie.writers?.join(', ')}</Text>
            <Text><Strong>Genres:</Strong> {movie.genres?.map(g => g.title).join(', ')}</Text>
          </div>
        </div>
      </DialogBody>
      <DialogActions>
        <Button className='cursor-pointer' onClick={() => setIsOpen(false)}>Close</Button>
      </DialogActions>
    </Dialog>
  )
}
