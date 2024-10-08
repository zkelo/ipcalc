import type Period from '@/enums/Period'
import type PeriodData from '@/interfaces/PeriodData'

declare type Periods = { [key in Period]: PeriodData }

export default Periods
