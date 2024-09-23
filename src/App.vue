<script setup lang="ts">
import { ref, type Ref } from 'vue'
import Table from './components/Table.vue'
import Field from './components/Field.vue'
import CalcRow from './components/CalcRow.vue'
import ResultRow from './components/ResultRow.vue'
import Quarter from './enums/Quarter'
import Column from './enums/Column'
import Period from './enums/BillPeriod'
import type QuarterData from './interfaces/QuarterData'
import type PeriodData from './interfaces/PeriodData'

const rate: Ref = ref<Number>(6)
const contribs: Ref = ref<Number>(49500)

const dataColumns: Column[] = [Column.Period, Column.Income, Column.Contribs]
const resultColumns: Column[] = [...dataColumns, Column.Tax, Column.Prepayment, Column.Payment]

const quarters: QuarterData[] = [Quarter.First, Quarter.Second, Quarter.Third, Quarter.Fourth].map(
  (quarter: Quarter) => ({ quarter, income: ref<Number>(0), contribs: ref<Number>(0) })
)

const periods: PeriodData[] = [
  Period.ThreeMonths,
  Period.HalfYear,
  Period.NineMonths,
  Period.Year
].map((period: Period) => ({
  period,
  income: ref<Number>(0),
  tax: ref<Number>(0),
  contribs: ref<Number>(0),
  prepayment: ref<Number>(0),
  payment: ref<Number>(0)
}))
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
      <Field label="Годовые взносы, руб." v-model="contribs"></Field>
      <div class="field mt-2">
        <div class="control">
          <button class="button">Распределить взносы</button>
        </div>
      </div>
    </div>
    <div class="column is-full">
      <h2 class="title is-2">Данные</h2>
      <Table :columns="dataColumns">
        <CalcRow
          v-for="(item, key) in quarters"
          :key="key"
          :quarter="item.quarter"
          v-model:income="item.income"
          v-model:contribs="item.contribs"
        ></CalcRow>
      </Table>
    </div>
    <div class="column is-full">
      <h2 class="title is-2">Результат</h2>
      <Table :columns="resultColumns">
        <ResultRow v-for="(item, key) in periods" :key="key" :data="item"></ResultRow>
        <tr>
          <td colspan="5"><strong>Доход свыше 300 тыс. руб.</strong></td>
          <td colspan="1"></td>
        </tr>
        <tr>
          <td colspan="5"><strong>1% от дохода свыше 300 тыс. руб.</strong></td>
          <td colspan="1"></td>
        </tr>
      </Table>
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
