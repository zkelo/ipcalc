import type Period from '@/enums/BillPeriod'
import type { Ref } from 'vue'

export default interface PeriodData {
  period: Period
  income: Ref<Number>
  contribs: Ref<Number>
  tax: Ref<Number>
  prepayment: Ref<Number>
  payment: Ref<Number>
}
