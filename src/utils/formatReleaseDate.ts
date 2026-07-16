export function formatReleaseDate(releaseDate: string): string {
  const dateParts = /^(\d{4})-(\d{2})-(\d{2})$/.exec(releaseDate);

  if (!dateParts) {
    return releaseDate;
  }

  const [, year, month, day] = dateParts;
  return `${day}/${month}/${year}`;
}
