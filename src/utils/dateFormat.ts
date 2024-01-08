export const dateFormat = (date: any, lang = 'en') => {
  return new Intl.DateTimeFormat(lang, {
    dateStyle: 'long',
  }).format(typeof date === 'string' ? new Date(date) : date)
}
