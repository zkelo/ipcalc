import type Period from '@/enums/Period'
import type PeriodData from '@/interfaces/PeriodData'

declare type BillingPeriods = { [key in Period]: PeriodData }

export default BillingPeriods
