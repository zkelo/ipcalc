<script setup lang="ts">
import type PeriodData from '@/interfaces/PeriodData'
import { computed } from 'vue'

const props = defineProps<{ periods: PeriodData[] }>()

const income = computed(() => {
  let sum: number = 0
  props.periods.forEach((period) => (sum += period.income.value))
  return sum
})
</script>

<template>
  {{ income }}
</template>
