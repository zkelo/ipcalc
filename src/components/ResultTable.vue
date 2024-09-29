<script setup lang="ts">
import Table from './Table.vue'
import ResultRow from './ResultRow.vue'
import Column from '@/enums/Column'
import type PeriodData from '@/interfaces/PeriodData'
import type Period from '@/enums/Period'

const props = defineProps<{ periods: { [key in Period]: PeriodData } }>()

const columns: Column[] = [
  Column.Period,
  Column.Income,
  Column.Contribs,
  Column.Tax,
  Column.Prepayment,
  Column.Payment
]
</script>

<template>
  <Table :columns="columns">
    <ResultRow v-for="(item, period) in props.periods" :key="period" :data="item"></ResultRow>
    <tr>
      <td colspan="5"><strong>Доход свыше 300 тыс. руб.</strong></td>
      <td colspan="1"></td>
    </tr>
    <tr>
      <td colspan="5"><strong>1% от дохода свыше 300 тыс. руб.</strong></td>
      <td colspan="1"></td>
    </tr>
  </Table>
</template>
