const formatter: Intl.NumberFormat = Intl.NumberFormat()

export default function format(n: number) {
  return formatter.format(n)
}
