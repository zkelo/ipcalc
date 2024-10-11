enum SettingPrefix {
  FirstQurter = 'firstQuarter',
  SecondQuarter = 'secondQuarter',
  ThirdQuarter = 'thirdQuarter',
  FourthQuarter = 'fourthQuarter'
}

export enum SettingPostfix {
  Income = 'income',
  Contribs = 'contribs'
}

enum Setting {
  firstQuarterIncome = `${SettingPrefix.FirstQurter}_${SettingPostfix.Income}`,
  firstQuarterContribs = `${SettingPrefix.FirstQurter}_${SettingPostfix.Contribs}`,
  secondQuarterIncome = `${SettingPrefix.SecondQuarter}_${SettingPostfix.Income}`,
  secondQuarterContribs = `${SettingPrefix.SecondQuarter}_${SettingPostfix.Contribs}`,
  thirdQuarterIncome = `${SettingPrefix.ThirdQuarter}_${SettingPostfix.Income}`,
  thirdQuarterContribs = `${SettingPrefix.ThirdQuarter}_${SettingPostfix.Contribs}`,
  fourthQuarterIncome = `${SettingPrefix.FourthQuarter}_${SettingPostfix.Income}`,
  fourthQuarterContribs = `${SettingPrefix.FourthQuarter}_${SettingPostfix.Contribs}`
}

export default Setting
