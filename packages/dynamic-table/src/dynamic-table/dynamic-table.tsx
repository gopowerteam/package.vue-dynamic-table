import type { TableColumnsOptions } from '@/interfaces/table-column-options'
import type { FormItemsOptions } from '@/interfaces/form-item-options'
import type { LoadDataParams } from '@/interfaces/load-data-params'
import type { PaginationOptions } from '@/interfaces/pagination-options'
import { defineComponent, onMounted, unref, type PropType } from 'vue'

import { DataSearchForm } from '../data-form'
import DataTable from '../data-table'
import DataPage from '../data-page'
import { createFormSource } from './create-form-source'
import { createSearchItemOptions } from '@/data-form/create-search-item-options'
import { createTableSource } from './create-table-source'
import {
  events,
  type EditEventParamsters,
  type PreviewEventParamsters
} from '@/utils/events-helper'
import RenderTableView from '@/data-table/render-table-view'
import { useModal } from '@gopowerteam/vue-modal'
import renderTableForm from '@/data-table/render-table-form'

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
    searchForms: {
      type: Array as PropType<FormItemsOptions>,
      required: false
    },
    editForms: {
      type: Array as PropType<FormItemsOptions>,
      required: false
    },
    actionAlign: {
      type: String as PropType<'left' | 'right'>,
      required: false
    }
  },
  expose: ['tableSource', 'formSource', 'reload', 'edit', 'preview'],
  render() {
    return (
      <div>
        {(this.$slots.actions ||
          Object.keys(this.searchForms || {}).length > 0) && (
          <DataSearchForm
            dataSource={unref(this.searchSource)}
            forms={this.searchForms}
            loadData={this.reload}
            pagination={this.pagination}
            actionAlign={this.actionAlign}>
            {{
              actions: this.$slots.actions
            }}
          </DataSearchForm>
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
    const searchForms = createSearchItemOptions(
      props.columns,
      props.searchForms
    )
    // 创建Table数据源
    const [tableSource, updateTableSource] = createTableSource(props.columns)
    // 创建Form数据源
    const [searchFormSource] = createFormSource(searchForms)

    const modal = useModal()

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

    function editRecord(params: EditEventParamsters) {
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

    onMounted(() => {
      if (props.loadAuto) {
        onLoadData()
      }
    })

    return {
      tableSource,
      searchSource: searchFormSource,
      searchForms: searchForms,
      reload: onLoadData,
      preview: previewRecord,
      edit: editRecord
    }
  }
})
