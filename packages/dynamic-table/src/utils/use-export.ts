import { Workbook, type Column, type Worksheet } from 'exceljs'
import type {
  DataRecord,
  ExportColumnOptions,
  TableColumnsOptions
} from '@/interfaces'
import { h, render } from 'vue'
import { getColumnValue } from './get-column-value'
import { toRenderTemplate } from '@/data-table/render-table-column'
import dayjs from 'dayjs'

function createWorkBook() {
  return new Workbook()
}

function createWorkSheet(workbook: Workbook, name = 'Sheet1') {
  const sheet = workbook.addWorksheet(name, {
    headerFooter: { firstHeader: 'Hello Exceljs', firstFooter: 'Hello World' }
  })

  return sheet
}

function setWorkSheetColumns(worksheet: Worksheet, columns: Column[]) {
  worksheet.columns = columns
}

function setWorkSheetRows(worksheet: Worksheet, rows: any[]) {
  worksheet.addRows(rows)
}

async function exportExcelFromJSON<T = any>({
  columns,
  rows,
  filename
}: {
  columns: Column[]
  rows: T[]
  filename?: string
}) {
  const workbook = createWorkBook()
  const worksheet = createWorkSheet(workbook)
  setWorkSheetColumns(worksheet, columns)
  setWorkSheetRows(worksheet, rows)

  const buffer = await workbook.xlsx.writeBuffer()
  const blob = new Blob([buffer])

  saveAs(blob, filename || `${dayjs().format('YYYY-MM-DD HH:mm:ss')}.xlsx`)
}

function saveAs(obj: Blob, filename: string) {
  const tmpLink = document.createElement('a')
  tmpLink.download = filename || 'download'
  tmpLink.href = URL.createObjectURL(obj)
  tmpLink.click()

  setTimeout(() => {
    URL.revokeObjectURL(tmpLink.href)
  }, 1000)
}

export function getTableRowValue(
  columns: TableColumnsOptions<any>,
  record: DataRecord
): Record<string, any> {
  const row: Record<string, any> = {}
  const exportColumns = columns
    .filter((column) => column.exportable !== false)
    .map((column) => ({
      options: column,
      render: toRenderTemplate(column),
      content:
        typeof column.exportable === 'object'
          ? column.exportable.content
          : undefined
    }))

  exportColumns.forEach((column) => {
    const renderTemplate = column.render?.template
    const getRowValue = () => {
      switch (true) {
        case !!column.content:
          return column.content && column.content(record)
        case !!renderTemplate: {
          const container = document.createElement('div')
          const node = h(
            () => renderTemplate && renderTemplate({ row: record })
          )
          render(node, container)
          return node.el?.innerText
        }
        default:
          return getColumnValue(record, column.options)
      }
    }

    row[column.options.key] = getRowValue()
  })

  return row
}

function exportExcel(
  columns: TableColumnsOptions,
  source: DataRecord[],
  filename?: string
) {
  const exportColumns = columns
    .filter((column) => column.exportable !== false)
    .map((column) => ({
      key: column.key,
      header:
        (column.exportable as ExportColumnOptions)?.header || column.title,
      width: (column.exportable as ExportColumnOptions)?.width || column.width
    }))

  const exportRows = source.map((record) => {
    return getTableRowValue(columns, record)
  })
  exportExcelFromJSON({
    columns: exportColumns as any,
    rows: exportRows,
    filename
  })
}

export function useExport() {
  return {
    // exportExcel,
    exportExcel
  }
}
