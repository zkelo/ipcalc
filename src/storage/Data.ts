import Quarter from '@/enums/Quarter'
import Setting, { SettingPostfix } from '@/enums/Setting'
import type Quarters from '@/types/Quarters'
import type QuarterSettingItem from '@/types/Data'

export default class Data {
  private static list: QuarterSettingItem[] = [
    [Quarter.First, Setting.firstQuarterIncome, SettingPostfix.Income],
    [Quarter.First, Setting.firstQuarterContribs, SettingPostfix.Contribs],
    [Quarter.Second, Setting.secondQuarterIncome, SettingPostfix.Income],
    [Quarter.Second, Setting.secondQuarterContribs, SettingPostfix.Contribs],
    [Quarter.Third, Setting.thirdQuarterIncome, SettingPostfix.Income],
    [Quarter.Third, Setting.thirdQuarterContribs, SettingPostfix.Contribs],
    [Quarter.Fourth, Setting.fourthQuarterIncome, SettingPostfix.Income],
    [Quarter.Fourth, Setting.fourthQuarterContribs, SettingPostfix.Contribs]
  ]

  public static parse(to: Quarters): void {
    Data.list.forEach(([quarter, setting, prop]: QuarterSettingItem) => {
      const value: number = +(localStorage.getItem(setting) || 0)
      to[quarter][prop].value = value
    })
  }

  public static save(from: Quarters): void {
    Data.list.forEach(([quarter, setting, prop]: QuarterSettingItem) => {
      const value: string = from[quarter][prop].value.toString()
      localStorage.setItem(setting, value)
    })
  }
}
