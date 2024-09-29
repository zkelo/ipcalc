<script setup lang="ts">
import Table from './Table.vue'
import Column from '@/enums/Column'
import type PeriodData from '@/interfaces/PeriodData'
import Period from '@/enums/Period'
import type QuarterData from '@/interfaces/QuarterData'
import { computed, ref, type ComputedRef, type Ref } from 'vue'

const props = defineProps<{
  quarters: QuarterData[]
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

const overincome: Ref<Number> = ref<Number>(0)
const overincomePercent: Ref<Number> = ref<Number>(0)

const income: { [key in Period]: ComputedRef<Ref<Number>> } = {
  [Period.ThreeMonths]: computed((): Ref<Number> => props.periods[Period.ThreeMonths].income),
  [Period.HalfYear]: computed((): Ref<Number> => props.periods[Period.HalfYear].income),
  [Period.NineMonths]: computed((): Ref<Number> => props.periods[Period.NineMonths].income),
  [Period.Year]: computed((): Ref<Number> => props.periods[Period.Year].income)
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
