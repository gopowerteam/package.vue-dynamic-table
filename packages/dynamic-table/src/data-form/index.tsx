import type { DataRecord } from '@/interfaces/load-data-params'
import { defineComponent, type PropType } from 'vue'
import type { VxeFormEvents } from 'vxe-table'
import type { FormItemsOptions, PaginationOptions } from '..'
import { renderFormActions } from './render-form-actions'
import { renderFormItem } from './render-form-item'

export default defineComponent({
  name: 'DataForm',
  props: {
    /**
     * 列表配置
     */
    forms: {
      type: Array as PropType<FormItemsOptions>,
      required: true
    },
    /**
     * 数据源
     */
    dataSource: {
      type: Object as PropType<DataRecord>,
      required: true
    },
    /**
     * 表单配置
     */
    loadData: {
      type: Function as PropType<() => void>,
      required: true
    },
    /**
     * 分页配置
     */
    pagination: {
      type: Object as PropType<PaginationOptions>,
      required: false
    }
  },
  setup(props) {
    const formItems = props.forms.map((form) => renderFormItem(form))

    const formActions = renderFormActions(props.forms)

    // 提交表单
    const onSubmit: VxeFormEvents.Submit = () => {
      props.pagination?.reset()
      props.loadData()
    }

    // 重置表弟
    const onReset: VxeFormEvents.Reset = () => {
      props.pagination?.reset()
    }

    if (formItems.length === 0) {
      return <></>
    } else {
      return () => (
        <vxe-form
          data={props.dataSource}
          onSubmit={onSubmit}
          onReset={onReset}>
          {formItems}
          {formActions}
        </vxe-form>
      )
    }
  }
})
