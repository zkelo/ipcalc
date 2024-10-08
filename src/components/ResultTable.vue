<script setup lang="ts">
import Table from './Table.vue'
import Column from '@/enums/Column'
import Period from '@/enums/Period'
import { computed, type ComputedRef } from 'vue'
import Quarter from '@/enums/Quarter'
import type Quarters from '@/types/Quarters'
import type Periods from '@/types/Periods'
import format from '@/helpers/format'

const OVERINCOME_AMOUNT: number = 300_000
const OVERINCOME_MULTIPLIER: number = 0.01

const props = defineProps<{
  quarters: Quarters
  periods: Periods
  rate: number
}>()

const columns: Column[] = [
  Column.Period,
  Column.Income,
  Column.Contribs,
  Column.Tax,
  Column.Prepayment
]

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

const tax: { [key in Period]: ComputedRef<number> } = {
  [Period.ThreeMonths]: computed((): number => calcTax(Period.ThreeMonths)),
  [Period.HalfYear]: computed((): number => calcTax(Period.HalfYear)),
  [Period.NineMonths]: computed((): number => calcTax(Period.NineMonths)),
  [Period.Year]: computed((): number => calcTax(Period.Year))
}

const prepayment: { [key in Period]: ComputedRef<number> } = {
  [Period.ThreeMonths]: computed((): number => calcPrepayment(Period.ThreeMonths)),
  [Period.HalfYear]: computed((): number => calcPrepayment(Period.HalfYear)),
  [Period.NineMonths]: computed((): number => calcPrepayment(Period.NineMonths)),
  [Period.Year]: computed((): number => calcPrepayment(Period.Year))
}

const overincome: ComputedRef<number> = computed(
  (): number => income[Period.Year].value - OVERINCOME_AMOUNT
)

const overincomePercent: ComputedRef<number> = computed(
  (): number => overincome.value * OVERINCOME_MULTIPLIER
)

function calcPeriodProp(prop: 'income' | 'contribs', period: Period): number {
  let result: number = 0

  const quarters: Quarter[] = props.periods[period].quarters
  quarters.forEach((quarter: Quarter): number => (result += props.quarters[quarter][prop].value))

  return result
}

function calcTax(period: Period): number {
  const rate: number = +props.rate / 100
  const tax: number = income[period].value * rate
  return tax
}

function calcPrepayment(period: Period): number {
  let prevPrepayment: number = 0
  for (const key in Period) {
    const name = Period[key as keyof typeof Period]
    if (name === period) {
      break
    }

    prevPrepayment += prepayment[name].value
  }

  const result: number = tax[period].value - contribs[period].value - prevPrepayment
  return result < 0 ? 0 : result
}
</script>

<template>
  <Table :columns="columns">
    <tr v-for="(item, period) in props.periods" :key="period">
      <td>{{ item.period }}</td>
      <td>{{ format(income[item.period].value) }}</td>
      <td>{{ format(contribs[item.period].value) }}</td>
      <td>{{ format(tax[item.period].value) }}</td>
      <td>{{ format(prepayment[item.period].value) }}</td>
    </tr>
    <tr>
      <td colspan="4"><strong>Доход свыше 300 тыс. руб.</strong></td>
      <td colspan="1">{{ format(overincome) }}</td>
    </tr>
    <tr>
      <td colspan="4"><strong>1% от дохода свыше 300 тыс. руб.</strong></td>
      <td colspan="1">{{ format(overincomePercent) }}</td>
    </tr>
  </Table>
</template>
