import type { DataRecord } from '@/interfaces/load-data-params'
import { defineComponent, type PropType } from 'vue'
import type { VxeFormEvents, VxeTableDefines } from 'vxe-table'
import type { FormItemsOptions, PaginationOptions } from '../..'
import { renderSearchFormActions } from '../render-form-actions'
import { renderFormItem } from '../render-form-item'

export default defineComponent({
  name: 'DataSearchForm',
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
    },
    /**
     * 操作按钮对齐方向
     */
    actionsPosition: {
      type: String as PropType<'left' | 'right'>,
      default: 'left'
    },
    exportable: {
      type: Boolean
    },
    refreshable: {
      type: Boolean
    }
  },
  setup(props, { slots }) {
    const formItems = props.forms.map((form) => renderFormItem(form))

    const formActions = renderSearchFormActions(
      props.forms,
      props.actionsPosition,
      props.exportable,
      props.refreshable,
      slots?.actions
    )

    const formRules = props.forms.reduce<
      Record<string, VxeTableDefines.ValidatorRule[]>
    >((r, form) => {
      if (form.rules) {
        r[form.key] = form.rules
      }
      return r
    }, {})

    // 提交表单
    const onSubmit: VxeFormEvents.Submit = () => {
      props.pagination?.reset()
      props.loadData()
    }

    // 重置表弟
    const onReset: VxeFormEvents.Reset = () => {
      props.pagination?.reset()
    }

    return () => (
      <div>
        <vxe-form
          style={
            // 仅仅显示导出时，表单居右
            props.exportable && (!props.forms || props.forms.length === 0)
              ? 'text-align: right'
              : ''
          }
          custom-layout
          data={props.dataSource}
          rules={formRules}
          onSubmit={onSubmit}
          onReset={onReset}>
          {formItems}
          {formActions}
        </vxe-form>
      </div>
    )
  }
})
