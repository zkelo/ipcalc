<script setup lang="ts">
import Table from './Table.vue'
import CalcRow from './CalcRow.vue'
import Column from '@/enums/Column'
import type Quarters from '@/types/Quarters'

const props = defineProps<{ quarters: Quarters }>()

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
