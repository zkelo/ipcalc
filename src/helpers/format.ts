const formatter: Intl.NumberFormat = Intl.NumberFormat()

export default function (n: number) {
  return formatter.format(n)
}
