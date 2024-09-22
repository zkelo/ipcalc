<script setup lang="ts">
import { ref, type Ref } from 'vue'
import Table from './components/Table.vue'
import Field from './components/Field.vue'
import CalcRow from './components/CalcRow.vue'
import ResultRow from './components/ResultRow.vue'
import Quarter from './enums/Quarter'
import Column from './enums/Column'
import BillPeriod from './enums/BillPeriod'

const rate: Ref = ref<Number>(6)
const contribs: Ref = ref<Number>(49500)

const dataColumns: Array<Column> = [Column.Period, Column.Income, Column.Contribs]
const resultColumns: Array<Column> = [...dataColumns, Column.Tax, Column.Prepayment, Column.Payment]
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
        <CalcRow :quarter="Quarter.First"></CalcRow>
        <CalcRow :quarter="Quarter.Second"></CalcRow>
        <CalcRow :quarter="Quarter.Third"></CalcRow>
        <CalcRow :quarter="Quarter.Fourth"></CalcRow>
      </Table>
    </div>
    <div class="column is-full">
      <h2 class="title is-2">Результат</h2>
      <Table :columns="resultColumns">
        <ResultRow :period="BillPeriod.ThreeMonths"></ResultRow>
        <ResultRow :period="BillPeriod.HalfYear"></ResultRow>
        <ResultRow :period="BillPeriod.NineMonths"></ResultRow>
        <ResultRow :period="BillPeriod.Year"></ResultRow>
        <tr>
          <td colspan="4"><strong>Доход свыше 300 тыс. руб.</strong></td>
          <td colspan="2"></td>
        </tr>
        <tr>
          <td colspan="4"><strong>1% от дохода свыше 300 тыс. руб.</strong></td>
          <td colspan="2"></td>
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
