import type { QuarterNames } from '@/types/Quarters'

enum Quarter {
  First = 1,
  Second,
  Third,
  Fourth
}

export default Quarter
export const names: QuarterNames = {
  [Quarter.First]: 'first',
  [Quarter.Second]: 'second',
  [Quarter.Third]: 'third',
  [Quarter.Fourth]: 'fourth'
}
