import { Input, InputGroup } from '@/catalyst/Input'
import { MagnifyingGlassIcon } from '@heroicons/react/16/solid'

interface SearchInputProps {
  value: string
  onChange: (value: string) => void
}

export default function SearchInput({ value, onChange }: SearchInputProps) {
  return (
    <InputGroup >
      <MagnifyingGlassIcon />
      <Input 
        className='min-w-3xs' 
        name="search" 
        placeholder="Search&hellip;" 
        aria-label="Search" 
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </InputGroup>
  )
}