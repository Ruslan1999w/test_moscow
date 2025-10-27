<template>
  <div style="padding: 24px; max-width: 1400px; margin: 0 auto;">
    <h2>Таблица цен на СТЕ</h2>
    <n-data-table
        :columns="columns"
        :data="data"
        :bordered=true
        :single-line=false
        :pagination="pagination"
        :row-props="getRowProps"
        size="medium"
    />
  </div>
</template>

<script setup lang="ts">
import { h, ref } from 'vue'
import {
  NDataTable,
  NSwitch,
  NDatePicker,
  NInputNumber
} from 'naive-ui'
import type { DataTableProps } from 'naive-ui'

import { mockSteData } from "../../mocks/steData.mock.ts";

function getRowProps(row: SteItem) {
  return {
    style: {
      backgroundColor: row.isActual ? 'transparent' : '#f9f9f9',
      color: row.isActual ? 'inherit' : '#999',
      fontStyle: row.isActual ? 'normal' : 'italic',
      opacity: row.isActual ? '1' : '0.7'
    }
  }
}

const pagination: DataTableProps['pagination'] = {
  pageSize: 5,
  showQuickJumper: true,
  onChange: (page: number) => {
    console.log('Page:', page)
  }
}

interface SteItem {
  id: number
  steName: string
  isActual: boolean
  priceEndDate: number | null
  priceNotNds: number
  nds: number
  price: number
  fillEndDate: number | null
}

function normalizeTableData(rawData: Partial<SteItem>[]): SteItem[] {
  return rawData.map(item => {
    const priceNotNds = typeof item.priceNotNds === 'number' ? item.priceNotNds : 0
    const nds = (() => {
      const value = typeof item.nds === 'number' ? item.nds : 0
      return Math.max(0, Math.min(100, value))
    })()
    const price = priceNotNds + (priceNotNds * nds) / 100

    return {
      id: typeof item.id === 'number' && !isNaN(item.id) ? item.id : Math.random(), // возможны дубли, временное решение
      steName: typeof item.steName === 'string' && item.steName.trim() !== '' ? item.steName.trim() : '---',
      priceEndDate: typeof item.priceEndDate === 'number' && !isNaN(item.priceEndDate) ? item.priceEndDate : null,
      fillEndDate: typeof item.fillEndDate === 'number' && !isNaN(item.fillEndDate) ? item.fillEndDate : null,
      isActual: Boolean(item.isActual) ? item.isActual : false,

      priceNotNds,
      nds,
      price,
    }
  })
}

const data = ref<SteItem[]>(normalizeTableData(mockSteData))

function handleCellUpdate(id: number, field: keyof SteItem, value: unknown) {
  const item = data.value.find(row => row.id === id)

  if (!item) return;

  item[field] = value;

  if (field === 'priceNotNds' || field === 'nds') {
    item.price = item.priceNotNds + (item.priceNotNds * item.nds) / 100
  }

  console.log('Обновлённая строка:', {
    id: item.id,
    isActual: item.isActual,
    price: item.price,
    priceNotNds: item.priceNotNds,
    nds: item.nds,
    priceEndDate: item.priceEndDate
  })
}

function createColumns(): DataTableColumns<SteItem> {
  return [
    {
      key: 'steName',
      title: 'Наименование СТЕ',
      sorter: (a: SteItem, b: SteItem) => a.steName.localeCompare(b.steName)
    },
    {
      key: 'isActual',
      title: 'Актуально',
      sorter: (a: SteItem, b: SteItem) => Number(b.isActual) - Number(a.isActual),
      render: (row) =>
          h(NSwitch, {
            value: row.isActual,
            onUpdateValue: (value: boolean) => handleCellUpdate(row.id, 'isActual', value)
          })
    },
    {
      key: 'priceEndDate',
      title: 'Срок действия предоставленных сведений',
      render: (row: SteItem) =>
          h(NDatePicker, {
            type: 'date',
            value: row.priceEndDate,
            onUpdateValue: (value: number | null) => handleCellUpdate(row.id, 'priceEndDate', value),
            style: 'width: 100%'
          })
    },
    {
      key: 'priceNotNds',
      title: 'Цена, руб. без НДС',
      render: (row: SteItem) =>
          h(NInputNumber, {
            value: row.priceNotNds,
            onUpdateValue: (value: number | null) => {
              const finalValue = typeof value === 'number' ? value : 0
              handleCellUpdate(row.id, 'priceNotNds', finalValue)
            },
            style: 'width: 100%',
            placeholder: 'Введите цену'
          })
    },
    {
      key: 'nds',
      title: 'НДС, %',
      render: (row: SteItem) =>
          h(NInputNumber, {
            value: row.nds,
            onUpdateValue: (value: number | null) => {
              const finalValue = typeof value === 'number' ? Math.max(0, Math.min(100, value)) : 0
              handleCellUpdate(row.id, 'nds', finalValue)
            },
            style: 'width: 100%',
            min: 0,
            max: 100,
            placeholder: 'НДС (%)'
          })
    },
    {
      key: 'price',
      title: 'Цена, руб. с НДС',
      render: (row: SteItem) =>
          h('div', {
            style: 'font-weight: 500; color: #2c3e50;'
          }, `${row.price.toFixed(2)} ₽`)
    },
    {
      key: 'fillEndDate',
      title: 'Срок заполнения',
      render: (row: SteItem) => {
        if (!row.fillEndDate) return h('span', { style: 'color: #999;' }, '—')

        const date = new Date(row.fillEndDate)
        const formatted = date.toLocaleDateString('ru-RU')
        return h('span', {}, formatted)
      }
    }
  ]
}

const columns = createColumns()
</script>