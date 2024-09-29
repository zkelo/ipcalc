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
  [Period.ThreeMonths]: computed((): number => periodsIncome(Period.ThreeMonths)),
  [Period.HalfYear]: computed((): number => periodsIncome(Period.HalfYear)),
  [Period.NineMonths]: computed((): number => periodsIncome(Period.NineMonths)),
  [Period.Year]: computed((): number => periodsIncome(Period.Year))
}

function periodsIncome(...periods: Period[]): number {
  let income: number = 0
  periods.forEach((period: Period): void => {
    const quarters = props.periods[period].quarters
    quarters.forEach((quarter: Quarter): number => (income += props.quarters[quarter].income.value))
  })
  return income
}
</script>

<template>
  <Table :columns="columns">
    <tr v-for="(item, period) in props.periods" :key="period">
      <td>{{ item.period }}</td>
      <td>{{ income[item.period] }}</td>
      <td>{{ item.contribs }}</td>
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
