<script setup lang="ts">
import type PeriodData from '@/interfaces/PeriodData'
import { computed } from 'vue'

const props = defineProps<{ data: PeriodData }>()

const title = computed(() => props.data.period + ' мес.')
</script>

<template>
  <tr>
    <td :title="title">{{ props.data.period }}</td>
    <td>{{ props.data.income }}</td>
    <td>{{ props.data.contribs }}</td>
    <td>{{ props.data.tax }}</td>
    <td>{{ props.data.prepayment }}</td>
    <td>{{ props.data.payment }}</td>
  </tr>
</template>
