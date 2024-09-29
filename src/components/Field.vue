<script setup lang="ts">
const props = defineProps<{ label?: String }>()
const value = defineModel()
</script>

<template>
  <div class="field">
    <label v-if="props.label" class="label">{{ props.label }}</label>
    <div class="control">
      <input type="number" class="input" v-model="value" min="0" />
    </div>
  </div>
</template>
