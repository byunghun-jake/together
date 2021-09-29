export const getRestDays = (endDate: string): number => {
  return Math.floor(
    (new Date(endDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
  )
}

export const toCurrency = (price: number): string => {
  return `${String(price).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원`
}
