export const convertNumberToString = (number: number) => {
  if (number < 10) return `000${number}`
  if (number < 100) return `00${number}`
  if (number < 1000) return `0${number}`

  return number.toString()
}
