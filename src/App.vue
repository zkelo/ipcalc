<script setup lang="ts">
import { ref, type Ref } from 'vue'
import Field from './components/Field.vue'
import CalcTable from './components/CalcTable.vue'
import ResultTable from './components/ResultTable.vue'
import type QuarterData from './interfaces/QuarterData'
import Quarter from './enums/Quarter'
import Period from './enums/Period'
import type PeriodData from './interfaces/PeriodData'

const rate: Ref<Number> = ref<Number>(6)
const yearContribs: Ref<Number> = ref<Number>(49500)

const quarters: QuarterData[] = [Quarter.First, Quarter.Second, Quarter.Third, Quarter.Fourth].map(
  (quarter: Quarter) => ({ quarter, income: ref<Number>(0), contribs: ref<Number>(0) })
)

const periods: { [key in Period]: PeriodData } = {
  [Period.ThreeMonths]: {
    period: Period.ThreeMonths,
    income: ref<Number>(0),
    tax: ref<Number>(0),
    contribs: ref<Number>(0),
    prepayment: ref<Number>(0),
    payment: ref<Number>(0)
  },
  [Period.HalfYear]: {
    period: Period.HalfYear,
    income: ref<Number>(0),
    tax: ref<Number>(0),
    contribs: ref<Number>(0),
    prepayment: ref<Number>(0),
    payment: ref<Number>(0)
  },
  [Period.NineMonths]: {
    period: Period.NineMonths,
    income: ref<Number>(0),
    tax: ref<Number>(0),
    contribs: ref<Number>(0),
    prepayment: ref<Number>(0),
    payment: ref<Number>(0)
  },
  [Period.Year]: {
    period: Period.Year,
    income: ref<Number>(0),
    tax: ref<Number>(0),
    contribs: ref<Number>(0),
    prepayment: ref<Number>(0),
    payment: ref<Number>(0)
  }
}

function distrib() {
  const contrib: Number = +yearContribs.value / 4
  quarters.forEach((quarter) => (quarter.contribs.value = contrib))
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
