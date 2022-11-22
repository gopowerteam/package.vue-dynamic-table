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
import RenderTableView from '@/data-table/render-table-view'
import { useModal } from '@gopowerteam/vue-modal'

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
  expose: ['tableSource', 'formSource', 'reload'],
  render() {
    return (
      <div>
        {Object.keys(this.forms || {}).length > 0 && (
          <DataForm
            dataSource={unref(this.formSource)}
            forms={this.formItems}
            loadData={this.reload}
            pagination={this.pagination}>
            {{
              actions: this.$slots.actions
            }}
          </DataForm>
        )}
        <DataTable
          dataSource={unref(this.tableSource)}
          columns={this.columns}></DataTable>

        {this.pagination && (
          <DataPage
            loadData={this.reload}
            pagination={this.pagination}></DataPage>
        )}
      </div>
    )
  },
  setup(props) {
    // 获取Form配置
    const forms = createFormItemOptions(props.columns, props.forms)
    // 创建Table数据源
    const [tableSource, updateTableSource] = createTableSource(props.columns)
    // 创建Form数据源
    const [formSource] = createFormSource(forms)

    const modal = useModal()

    events.on('reload', () => {
      onLoadData()
    })

    events.on('preview', ({ title, ...config }) => {
      modal.open({
        component: RenderTableView,
        title,
        width: '80%',
        props: {
          ...config,
          options: props.columns
        }
      })
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

    return {
      tableSource,
      formSource,
      formItems: forms,
      reload: onLoadData
    }
  }
})
