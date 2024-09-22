<script setup lang="ts">
import Quarter from '@/enums/Quarter'
import Field from './Field.vue'

const props = defineProps<{ quarter: Quarter }>()
</script>

<template>
  <tr>
    <td>{{ props.quarter }} квартал</td>
    <td><Field></Field></td>
    <td><Field></Field></td>
  </tr>
</template>
