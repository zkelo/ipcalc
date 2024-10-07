<script setup lang="ts">
import { computed, ref, type ComputedRef, type Ref } from 'vue'
import Field from './components/Field.vue'
import CalcTable from './components/CalcTable.vue'
import ResultTable from './components/ResultTable.vue'
import type QuarterData from './interfaces/QuarterData'
import Quarter from './enums/Quarter'
import Period from './enums/Period'
import type Quarters from './types/Quarters'
import type Periods from './types/Periods'

const rate: Ref<number> = ref<number>(6)
const yearContribs: Ref<number> = ref<number>(49500)

const quarters: Quarters = {
  [Quarter.First]: {
    quarter: Quarter.First,
    income: ref<number>(344_000),
    contribs: ref<number>(12_375)
  },
  [Quarter.Second]: {
    quarter: Quarter.Second,
    income: ref<number>(466_000),
    contribs: ref<number>(12_375)
  },
  [Quarter.Third]: {
    quarter: Quarter.Third,
    income: ref<number>(588_700),
    contribs: ref<number>(12_375)
  },
  [Quarter.Fourth]: {
    quarter: Quarter.Fourth,
    income: ref<number>(602_500),
    contribs: ref<number>(12_375)
  }
}

const periods: Periods = {
  [Period.ThreeMonths]: {
    period: Period.ThreeMonths,
    quarters: [Quarter.First]
  },
  [Period.HalfYear]: {
    period: Period.HalfYear,
    quarters: [Quarter.First, Quarter.Second]
  },
  [Period.NineMonths]: {
    period: Period.NineMonths,
    quarters: [Quarter.First, Quarter.Second, Quarter.Third]
  },
  [Period.Year]: {
    period: Period.Year,
    quarters: [Quarter.First, Quarter.Second, Quarter.Third, Quarter.Fourth]
  }
}

const quarterList: ComputedRef<QuarterData[]> = computed((): QuarterData[] =>
  Object.values(quarters)
)

function distrib(): void {
  const contrib: number = +yearContribs.value / 4
  quarterList.value.forEach((quarter: QuarterData): number => (quarter.contribs.value = contrib))
}
</script>

<template>
  <div class="columns is-multiline mt-1">
    <div class="column is-full">
      <h1 class="title is-1">Калькулятор ИП</h1>
      <span class="subtitle">
        Калькулятор для ИП на УСН Доходы без сотрудников и не платящих торговый сбор
      </span>
    </div>
    <div class="column is-one-fifth">
      <Field label="Налоговая ставка, %" v-model="rate"></Field>
    </div>
    <div class="column is-one-fifth">
      <Field label="Годовые взносы, руб." v-model="yearContribs"></Field>
      <div class="field mt-2">
        <div class="control">
          <button class="button" @click="distrib">Распределить взносы</button>
        </div>
      </div>
    </div>
    <div class="column is-full">
      <h2 class="title is-2">Данные</h2>
      <CalcTable :quarters></CalcTable>
    </div>
    <div class="column is-full">
      <h2 class="title is-2">Результат</h2>
      <ResultTable :quarters :periods :rate></ResultTable>
    </div>
    <div class="column is-full">
      <hr />
      <div>
        <span>Все введённые данные сохраняются только в вашем браузере</span>
      </div>
      <div>
        <span>&copy; 2024 <a href="https://zkelo.ru" target="_blank">ZKelo</a></span>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
@import 'bulma/bulma';
</style>
