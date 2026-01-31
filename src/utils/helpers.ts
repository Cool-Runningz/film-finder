export function getPageNumbers(current: number, total: number) {
  const pages: (number | 'gap')[] = [];
  if (total <= 8) {
    for (let i = 1; i <= total; i++) pages.push(i);
  } else {
    pages.push(1);
    if (current > 4) pages.push('gap');
    const start = Math.max(2, current - 3);
    const end = Math.min(total - 1, start + 5);
    for (let i = start; i <= end; i++) pages.push(i);
    if (end < total - 1) pages.push('gap');
    pages.push(total);
  }
  return pages;
}