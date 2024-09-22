<script setup lang="ts">
import type Quarter from '@/enums/Quarter'
import Field from './Field.vue'

const props = defineProps<{ quarter: Quarter }>()

const income = defineModel('income')
const contribs = defineModel('contribs')
</script>

<template>
  <tr>
    <td>{{ props.quarter }} квартал</td>
    <td><Field v-model="income"></Field></td>
    <td><Field v-model="contribs"></Field></td>
  </tr>
</template>
