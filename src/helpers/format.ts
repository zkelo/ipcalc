const formatter: Intl.NumberFormat = Intl.NumberFormat()

export default function (n: number): string {
  return formatter.format(n)
}
