<script setup lang="ts">
import { ref, type Ref } from 'vue'
import Field from './components/Field.vue'
import CalcTable from './components/CalcTable.vue'
import ResultTable from './components/ResultTable.vue'
import type QuarterData from './interfaces/QuarterData'
import Quarter from './enums/Quarter'
import Period from './enums/Period'
import type PeriodData from './interfaces/PeriodData'

const rate: Ref<number> = ref<number>(6)
const yearContribs: Ref<number> = ref<number>(49500)

const quarters: { [key in Quarter]: QuarterData } = {
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

const periods: { [key in Period]: PeriodData } = {
  [Period.ThreeMonths]: {
    period: Period.ThreeMonths,
    quarters: [Quarter.First],
    income: ref<number>(0),
    tax: ref<number>(0),
    contribs: ref<number>(0),
    prepayment: ref<number>(0)
  },
  [Period.HalfYear]: {
    period: Period.HalfYear,
    quarters: [Quarter.First, Quarter.Second],
    income: ref<number>(0),
    tax: ref<number>(0),
    contribs: ref<number>(0),
    prepayment: ref<number>(0)
  },
  [Period.NineMonths]: {
    period: Period.NineMonths,
    quarters: [Quarter.First, Quarter.Second, Quarter.Third],
    income: ref<number>(0),
    tax: ref<number>(0),
    contribs: ref<number>(0),
    prepayment: ref<number>(0)
  },
  [Period.Year]: {
    period: Period.Year,
    quarters: [Quarter.First, Quarter.Second, Quarter.Third, Quarter.Fourth],
    income: ref<number>(0),
    tax: ref<number>(0),
    contribs: ref<number>(0),
    prepayment: ref<number>(0)
  }
}

function distrib() {
  const contrib: number = +yearContribs.value / 4
  const list: QuarterData[] = Object.values(quarters)
  list.forEach((quarter: QuarterData): number => (quarter.contribs.value = contrib))
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
      <ResultTable :quarters :periods></ResultTable>
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
