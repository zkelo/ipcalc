import type Quarter from '@/enums/Quarter'
import type QuarterData from '@/interfaces/QuarterData'

declare type Quarters = { [key in Quarter]: QuarterData }

export default Quarters
export declare type QuarterNames = { [key in Quarter]: string }
