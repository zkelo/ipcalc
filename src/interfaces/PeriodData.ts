import type Period from '@/enums/Period'
import type Quarter from '@/enums/Quarter'

export default interface PeriodData {
  period: Period
  quarters: [Quarter, ...Quarter[]]
}
