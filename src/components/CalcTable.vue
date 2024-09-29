<script setup lang="ts">
import type QuarterData from '@/interfaces/QuarterData'
import Table from './Table.vue'
import CalcRow from './CalcRow.vue'
import Column from '@/enums/Column'
import type Quarter from '@/enums/Quarter'

const props = defineProps<{ quarters: { [key in Quarter]: QuarterData } }>()

const columns: Column[] = [Column.Period, Column.Income, Column.Contribs]
</script>

<template>
  <Table :columns="columns">
    <CalcRow
      v-for="(item, key) in props.quarters"
      :key="key"
      :quarter="item.quarter"
      v-model:income="item.income.value"
      v-model:contribs="item.contribs.value"
    ></CalcRow>
  </Table>
</template>
