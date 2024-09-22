<script setup lang="ts">
import BillPeriod from '@/enums/BillPeriod'
import { computed } from 'vue'

const props = defineProps<{ period: BillPeriod }>()

const title = computed(() => props.period + ' мес.')
</script>

<template>
  <tr>
    <td :title="title">{{ period }}</td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
  </tr>
</template>
