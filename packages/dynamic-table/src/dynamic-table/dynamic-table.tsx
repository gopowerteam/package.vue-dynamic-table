import type { TableColumnsOptions } from '@/interfaces/table-column-options'
import type { FormItemsOptions } from '@/interfaces/form-item-options'
import type { LoadDataParams } from '@/interfaces/load-data-params'
import type { PaginationOptions } from '@/interfaces/pagination-options'
import { defineComponent, onMounted, unref, type PropType } from 'vue'

import DataForm from '../data-form'
import DataTable from '../data-table'
import DataPage from '../data-page'
import { createFormSource } from './create-form-source'
import { createFormItemOptions } from '@/data-form/create-form-item-options'
import { createTableSource } from './create-table-source'
import { events } from '@/utils/events-helper'

export default defineComponent({
  name: 'DynamicTable',
  props: {
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
      type: Array as PropType<TableColumnsOptions>,
      required: true
    },
    forms: {
      type: Array as PropType<FormItemsOptions>,
      required: false
    }
  },
  expose: ['tableSource', 'formSource'],
  setup(props, { slots }) {
    // 获取Form配置
    const forms = createFormItemOptions(props.columns, props.forms)
    // 创建Table数据源
    const [tableSource, updateTableSource] = createTableSource(props.columns)
    // 创建Form数据源
    const [formSource] = createFormSource(forms)

    events.on('reload', () => {
      onLoadData()
    })

    /**
     * 加载表单数据
     */
    const onLoadData = () => {
      const formData = { ...unref(formSource) }

      Object.keys(formData).forEach((key) => {
        if (formData[key] === null) {
          delete formData[key]
        }
      })

      props.loadData({ form: formData, update: updateTableSource })
    }

    onMounted(() => {
      if (props.loadAuto) {
        onLoadData()
      }
    })

    return () => {
      return (
        <div>
          {Object.keys(forms || {}).length > 0 && (
            <DataForm
              dataSource={unref(formSource)}
              forms={forms}
              loadData={onLoadData}
              pagination={props.pagination}>
              {{
                actions: slots.actions
              }}
            </DataForm>
          )}
          <DataTable
            dataSource={unref(tableSource)}
            columns={props.columns}></DataTable>

          {props.pagination && (
            <DataPage
              loadData={onLoadData}
              pagination={props.pagination}></DataPage>
          )}
        </div>
      )
    }
  }
})
