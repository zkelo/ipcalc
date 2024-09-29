<script setup lang="ts">
import Table from './Table.vue'
import Column from '@/enums/Column'
import type PeriodData from '@/interfaces/PeriodData'
import Period from '@/enums/Period'
import type QuarterData from '@/interfaces/QuarterData'
import { computed, ref, type ComputedRef, type Ref } from 'vue'
import Quarter from '@/enums/Quarter'

const props = defineProps<{
  quarters: { [key in Quarter]: QuarterData }
  periods: { [key in Period]: PeriodData }
}>()

const columns: Column[] = [
  Column.Period,
  Column.Income,
  Column.Contribs,
  Column.Tax,
  Column.Prepayment,
  Column.Payment
]

const overincome: Ref<number> = ref<number>(0)
const overincomePercent: Ref<number> = ref<number>(0)

const income: { [key in Period]: ComputedRef<number> } = {
  [Period.ThreeMonths]: computed((): number => calcPeriodProp('income', Period.ThreeMonths)),
  [Period.HalfYear]: computed((): number => calcPeriodProp('income', Period.HalfYear)),
  [Period.NineMonths]: computed((): number => calcPeriodProp('income', Period.NineMonths)),
  [Period.Year]: computed((): number => calcPeriodProp('income', Period.Year))
}

const contribs: { [key in Period]: ComputedRef<number> } = {
  [Period.ThreeMonths]: computed((): number => calcPeriodProp('contribs', Period.ThreeMonths)),
  [Period.HalfYear]: computed((): number => calcPeriodProp('contribs', Period.HalfYear)),
  [Period.NineMonths]: computed((): number => calcPeriodProp('contribs', Period.NineMonths)),
  [Period.Year]: computed((): number => calcPeriodProp('contribs', Period.Year))
}

function calcPeriodProp(prop: 'income' | 'contribs', ...periods: Period[]): number {
  let result: number = 0
  periods.forEach((period: Period): void => {
    const quarters: Quarter[] = props.periods[period].quarters
    quarters.forEach((quarter: Quarter): number => (result += props.quarters[quarter][prop].value))
  })
  return result
}
</script>

<template>
  <Table :columns="columns">
    <tr v-for="(item, period) in props.periods" :key="period">
      <td>{{ item.period }}</td>
      <td>{{ income[item.period] }}</td>
      <td>{{ contribs[item.period] }}</td>
      <td>{{ item.tax }}</td>
      <td>{{ item.prepayment }}</td>
      <td>{{ item.payment }}</td>
    </tr>
    <tr>
      <td colspan="5"><strong>Доход свыше 300 тыс. руб.</strong></td>
      <td colspan="1">{{ overincome }}</td>
    </tr>
    <tr>
      <td colspan="5"><strong>1% от дохода свыше 300 тыс. руб.</strong></td>
      <td colspan="1">{{ overincomePercent }}</td>
    </tr>
  </Table>
</template>
