import type { DataRecord } from '@/interfaces/load-data-params'
import { defineComponent, type PropType } from 'vue'
import type { FormItemsOptions, PaginationOptions } from '..'
import { createFormItem } from './create-form-item'

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
      type: Array as PropType<DataRecord>,
      required: true
    },
    /**
     * 表单配置
     */
    loadData: {
      type: Function as PropType<() => void>,
      required: false
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
    const formItems = props.forms.map(createFormItem)

    // 提交表单
    const onSubmit = () => {
      //TODO: 待处理
    }

    // 重置表弟
    const onReset = () => {
      //TODO: 待处理
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
        </vxe-form>
      )
    }
  }
})
