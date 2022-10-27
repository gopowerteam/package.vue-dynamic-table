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

export default defineComponent({
  name: 'DynamicTable',
  props: {
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
  setup(props) {
    // 获取Form配置
    const forms = createFormItemOptions(props.columns, props.forms)
    // 创建Table数据源
    const [tableSource, updateTableSource] = createTableSource(props.columns)
    // 创建Form数据源
    const [formSource] = createFormSource(forms)

    /**
     * 加载表单数据
     */
    const onLoadData = () => {
      props.loadData({ form: unref(formSource), update: updateTableSource })
    }

    onMounted(() => {
      onLoadData()
    })

    return () => {
      return (
        <div>
          {Object.keys(forms || {}).length > 0 && (
            <DataForm
              dataSource={unref(formSource)}
              forms={forms}
              loadData={onLoadData}
              pagination={props.pagination}></DataForm>
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
