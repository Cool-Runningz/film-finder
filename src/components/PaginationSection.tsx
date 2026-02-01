
import { Pagination, PaginationPrevious, PaginationNext, PaginationList, PaginationPage, PaginationGap } from '@/catalyst/Pagination'
import { getPageNumbers } from '@/utils/helpers'

interface PaginationSectionProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

export default function PaginationSection({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationSectionProps) {
  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1)
    }
  }

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1)
    }
  } 

  // Don't render if there's only one page or no pages
  if (totalPages <= 1) {
    return null
  }

  return (
    <Pagination>
      <PaginationPrevious 
        onClick={handlePrevious} 
        disabled={currentPage === 1} 
      />
      <PaginationList>
        {getPageNumbers(currentPage, totalPages).map((item, index) =>
          item === 'gap' ? (
            <PaginationGap key={`gap-${index}`} />
          ) : (
            <PaginationPage
              key={item}
              current={item === currentPage}
              onClick={() => onPageChange(item)}
            >
              {item}
            </PaginationPage>
          )
        )}
      </PaginationList>
      <PaginationNext 
        onClick={handleNext} 
        disabled={currentPage === totalPages} 
      />
    </Pagination>
  )
}
