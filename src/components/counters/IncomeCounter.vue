<script setup lang="ts">
import type PeriodData from '@/interfaces/PeriodData'
import { computed } from 'vue'

const props = defineProps<{ periods: PeriodData[] }>()

const income = computed(() => {
  let sum: Number = 0
  props.periods.forEach((period) => (sum = sum.valueOf() + period.income.value.valueOf()))
  return sum
})
</script>

<template>
  {{ income }}
</template>
