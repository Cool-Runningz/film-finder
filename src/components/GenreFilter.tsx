import { Select } from '@/catalyst/Select'
import { Field, Label } from '@/catalyst/Fieldset'
import type { Genre } from '@/types/movie'

interface GenreFilterProps {
  genres: Genre[] | undefined
  selectedGenre: string
  onGenreChange: (value: string) => void
}

export default function GenreFilter({
  genres,
  selectedGenre,
  onGenreChange,
}: GenreFilterProps) {
  return (
    <div className="flex justify-between items-center">
      <Field>
        <Label>Filter by Genre</Label>
        <Select
          className="max-w-fit"
          value={selectedGenre}
          onChange={(e) => onGenreChange(e.target.value)}
        >
          <option value="">All Genres</option>
          {genres?.map((genre) => (
            <option key={genre.id} value={genre.title}>
              {genre.title}
            </option>
          ))}
        </Select>
      </Field>
    </div>
  )
}
