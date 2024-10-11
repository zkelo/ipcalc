import Quarter, { names } from '@/enums/Quarter'
import Setting, { SettingPostfix } from '@/enums/Setting'
import type QuarterData from '@/interfaces/QuarterData'
import { capitalize, watch } from 'vue'

function getSetting(quater: Quarter, postfix: SettingPostfix): Setting {
  const prop: string = capitalize(postfix)
  const key = `${names[quater]}Quarter${prop}`
  return Setting[key as keyof typeof Setting]
}

function generateWatcher(quarter: Quarter, postfix: SettingPostfix) {
  return (value: number): void => {
    const setting: Setting = getSetting(quarter, postfix)
    localStorage.setItem(setting, value.toString())
  }
}

const incomeWatcher = (quarter: Quarter) => generateWatcher(quarter, SettingPostfix.Income)
const contribsWatcher = (quarter: Quarter) => generateWatcher(quarter, SettingPostfix.Contribs)

export default (item: QuarterData): void => {
  watch(item.income, incomeWatcher(item.quarter))
  watch(item.contribs, contribsWatcher(item.quarter))
}
