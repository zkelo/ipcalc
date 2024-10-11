import type Quarter from '@/enums/Quarter'
import type { Ref } from 'vue'

export default interface QuarterData {
  quarter: Quarter
  income: Ref<number>
  contribs: Ref<number>
}
