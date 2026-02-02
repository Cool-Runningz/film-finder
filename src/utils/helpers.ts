export function getPageNumbers(current: number, total: number) {
  const pages: (number | 'gap')[] = []
  if (total <= 8) {
    for (let i = 1; i <= total; i++) pages.push(i)
  } else {
    pages.push(1)
    if (current > 4) pages.push('gap')
    const start = Math.max(2, current - 3)
    const end = Math.min(total - 1, start + 5)
    for (let i = start; i <= end; i++) pages.push(i)
    if (end < total - 1) pages.push('gap')
    pages.push(total)
  }
  return pages
}

export function parseDuration(duration: string): string {
  const match = duration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/)
  if (!match) return duration

  const hours = match[1] ? `${match[1]}h ` : ''
  const minutes = match[2] ? `${match[2]}m` : ''
  const seconds = match[3] ? ` ${match[3]}s` : ''

  return `${hours}${minutes}${seconds}`.trim()
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}
