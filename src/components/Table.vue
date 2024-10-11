<script setup lang="ts">
import type Column from '@/enums/Column'

const props = defineProps<{ columns: Column[] }>()
</script>

<template>
  <div class="table-container">
    <table class="table is-striped is-bordered is-hoverable">
      <thead>
        <tr>
          <th v-for="(column, key) in props.columns" :key="key">{{ column }}</th>
        </tr>
      </thead>
      <tbody>
        <slot></slot>
      </tbody>
    </table>
  </div>
</template>
