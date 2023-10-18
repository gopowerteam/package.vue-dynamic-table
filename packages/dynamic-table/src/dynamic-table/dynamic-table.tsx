import type { TableColumnsOptions } from '@/interfaces/table-column-options'
import type { FormItemsOptions } from '@/interfaces/form-item-options'
import type { LoadDataParams } from '@/interfaces/load-data-params'
import type { PaginationOptions } from '@/interfaces/pagination-options'
import { defineComponent, onMounted, unref, type PropType, provide } from 'vue'

import { DataSearchForm } from '../data-form'
import DataPage from '../data-page'
import { createFormSource } from './create-form-source'
import { createSearchItemOptions } from '@/data-form/create-search-item-options'
import { createTableSource } from './create-table-source'
import {
  type EditEventParamsters,
  type PreviewEventParamsters,
  useEvents
} from '@/utils/use-events'
import RenderTableView from '@/data-table/render-table-view'
import { useModal } from '@gopowerteam/vue-modal'
import renderTableForm from '@/data-table/render-table-form'
import { renderTableColumn } from '@/data-table/render-table-column'
import { useExport } from '@/utils/use-export'
import type { VxeTablePropTypes } from 'vxe-table'

export default defineComponent({
  name: 'DynamicTable',
  props: {
    selection: {
      type: [String, Object] as PropType<
        | 'radio'
        | 'checkbox'
        | {
            type: 'radio' | 'checkbox'
            width?: number
            title?: string
            selectable?: (record: any) => boolean
          }
      >,
      required: false
    },
    radio: {
      type: String as PropType<string | number>,
      required: false
    },
    checkbox: {
      type: Array as PropType<string[]>,
      required: false
    },
    // 是否进行自动加载数据
    loadAuto: {
      type: Boolean,
      required: false,
      default: true
    },
    // 加载数据源
    loadData: {
      type: Function as PropType<(params: LoadDataParams) => void>,
      required: true
    },
    // 数据主键
    rowKey: {
      type: String,
      required: true
    },
    // 分页配置
    pagination: {
      type: Object as PropType<PaginationOptions>,
      required: false
    },
    columns: {
      type: Array as PropType<TableColumnsOptions<any>>,
      required: true
    },
    searchForms: {
      type: Array as PropType<FormItemsOptions>,
      required: false
    },
    editForms: {
      type: Array as PropType<FormItemsOptions>,
      required: false
    },
    actionsPosition: {
      type: String as PropType<'left' | 'right'>,
      required: false
    },
    height: {
      type: Number,
      required: false
    },
    exportable: {
      type: [Boolean, Object] as PropType<boolean | { filename: string }>,
      required: false,
      default: () => false
    },
    refreshable: {
      type: Boolean,
      required: false,
      default: () => false
    },
    resizable: {
      type: Boolean,
      required: false,
      default: () => false
    },
    treeConfig: {
      type: [Boolean, Object] as PropType<
        boolean | VxeTablePropTypes.TreeConfig
      >,
      required: false,
      default: () => false
    }
  },
  emits: ['update:radio', 'update:checkbox'],
  expose: [
    'tableId',
    'tableSource',
    'formSource',
    'reload',
    'edit',
    'preview',
    'export',
    'getTableRows'
  ],
  render() {
    return (
      <div>
        {(this.$slots.actions ||
          Object.keys(this.searchForms || {}).length > 0 ||
          this.exportable) && (
          <DataSearchForm
            dataSource={unref(this.searchSource)}
            forms={this.searchForms}
            loadData={this.reload}
            pagination={this.pagination}
            actionsPosition={this.actionsPosition}
            exportable={!!this.exportable}
            refreshable={!!this.refreshable}>
            {{
              actions: this.$slots.actions
            }}
          </DataSearchForm>
        )}

        <vxe-table
          height={this.height}
          scroll-y={{
            enable: this.height === undefined,
            gt: this.height === undefined ? -1 : undefined
          }}
          onRadioChange={this.onRadioChange}
          onCheckboxChange={this.onCheckboxChange}
          onCheckboxAll={this.onCheckboxChange}
          data={unref(this.tableSource)}
          {...this.tableOptions}>
          {unref(this.tableColumns)}
        </vxe-table>

        {this.pagination && (
          <DataPage
            loadData={this.reload}
            pagination={this.pagination}></DataPage>
        )}
      </div>
    )
  },
  setup(props, { emit }) {
    const id = Math.random().toString(32).slice(2).toUpperCase()
    const modal = useModal()
    provide('id', id)

    const events = useEvents(id)

    // 表格配置
    const tableOptions: Record<string, any> = {
      tableId: id,
      rowConfig: {
        keyField: props.rowKey
      },
      columnConfig: {
        resizable: props.resizable
      },
      treeConfig: props.treeConfig
    }
    // 获取Form配置
    const searchForms = createSearchItemOptions(
      props.columns,
      props.searchForms
    )
    // 创建Table数据源
    const [tableSource, updateTableSource] = createTableSource(props.columns)
    // 创建Form数据源
    const [searchFormSource] = createFormSource(searchForms)
    // 创建Column列
    const tableColumns = [...props.columns.map(renderTableColumn)]

    // 监听Reload
    events.on('export', () => {
      const { exportExcel } = useExport()
      exportExcel(
        props.columns,
        tableSource.value,
        typeof props.exportable === 'object'
          ? props.exportable.filename
          : undefined
      )
    })
    // 监听Reload
    events.on('reload', () => {
      onLoadData()
    })

    // 监听Preview
    events.on('preview', ({ title, ...config }) => {
      modal.open({
        component: RenderTableView,
        title,
        width: '80%',
        props: {
          ...config,
          items: props.columns
        }
      })
    })

    // 监听Preview
    events.on('edit', ({ title, ...config }) => {
      if (!props.editForms || props.editForms.length === 0) {
        console.error('未配置编辑表单项')
        return
      }
      modal.open({
        component: renderTableForm,
        title,
        width: '80%',
        maskClosable: false,
        props: {
          ...config,
          tableId: id,
          rowKey: props.rowKey,
          items: props.editForms,
          loadData: () => onLoadData()
        }
      })
    })

    /**
     * 加载表单数据
     */
    const onLoadData = () => {
      const searchFormData = { ...unref(searchFormSource) }

      // 清空空数据项
      Object.keys(searchFormData).forEach((key) => {
        if (
          searchFormData[key] === null ||
          searchFormData[key] === undefined ||
          searchFormData[key] === ''
        ) {
          delete searchFormData[key]
        }
      })

      props.loadData({ search: searchFormData, update: updateTableSource })
    }

    function previewRecord(params: PreviewEventParamsters) {
      events.emit(
        'preview',
        Object.assign(
          {
            title: '数据详情'
          },
          params
        )
      )
    }

    function editRecord<T>(params: EditEventParamsters<T>) {
      events.emit(
        'edit',
        Object.assign(
          {
            title: '数据编辑'
          },
          params
        )
      )
    }

    function exportTable() {
      events.emit('export')
    }

    function onRadioChange({ rowid }: { rowid: string }) {
      emit('update:radio', rowid)
    }

    function onCheckboxChange({ records }: { records: any[] }) {
      emit(
        'update:checkbox',
        records.map((record: any) => record[props.rowKey])
      )
    }

    const selection =
      typeof props.selection === 'string'
        ? {
            type: props.selection
          }
        : props.selection

    switch (selection?.type) {
      case 'radio':
        {
          tableColumns.unshift(
            <vxe-column
              title={selection.title}
              type="radio"
              width={selection.width || 60}></vxe-column>
          )

          tableOptions.radioConfig = {
            checkRowKey: props.radio,
            checkMethod: selection?.selectable
          }
        }
        break
      case 'checkbox':
        {
          tableColumns.unshift(
            <vxe-column
              type="checkbox"
              title={selection.title}
              width={selection.width || 60}></vxe-column>
          )

          tableOptions.checkboxConfig = {
            checkRowKeys: props.checkbox,
            checkMethod: selection?.selectable
          }
        }
        break
    }

    onMounted(() => {
      if (props.loadAuto) {
        onLoadData()
      }
    })

    return {
      tableId: id,
      tableColumns,
      tableSource,
      tableOptions,
      formSource: searchFormSource,
      searchSource: searchFormSource,
      searchForms: searchForms,
      onRadioChange,
      onCheckboxChange,
      reload: onLoadData,
      preview: previewRecord,
      edit: editRecord,
      export: exportTable
    }
  }
})
