import type Period from '@/enums/Period'
import type Quarter from '@/enums/Quarter'
import type { Ref } from 'vue'

export default interface PeriodData {
  period: Period
  quarters: [Quarter, ...Quarter[]]
  income: Ref<number>
  contribs: Ref<number>
  tax: Ref<number>
  prepayment: Ref<number>
  payment: Ref<number>
}
