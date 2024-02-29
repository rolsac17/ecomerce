export const format =  (value: number) => {
  const formatter = new Intl.NumberFormat('es-GT', {
    style: 'currency',
    currency: 'GTQ',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })
  return formatter.format(value);
}