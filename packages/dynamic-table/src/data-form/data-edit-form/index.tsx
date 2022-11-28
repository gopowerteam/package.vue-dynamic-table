import type { DataRecord } from '@/interfaces/load-data-params'
import { useModal } from '@gopowerteam/vue-modal'
import { defineComponent, type PropType } from 'vue'
import type { VxeFormEvents, VxeTableDefines } from 'vxe-table'
import type { FormItemsOptions } from '../..'
import { renderEditFormActions } from '../render-form-actions'
import { renderFormItem } from '../render-form-item'

export default defineComponent({
  name: 'DataEditForm',
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
    submit: {
      type: Function as PropType<(data: DataRecord) => Promise<unknown>>,
      required: true
    },
    columns: {
      type: Number,
      default: 4
    }
  },
  setup(props, { slots }) {
    const modal = useModal()
    const formItems = props.forms.map((form) => renderFormItem(form))
    const formActions = renderEditFormActions(slots?.actions)
    const formRules = props.forms.reduce<
      Record<string, VxeTableDefines.ValidatorRule[]>
    >((r, form) => {
      if (form.rules) {
        r[form.key] = form.rules
      }
      return r
    }, {})

    // 提交表单
    const onSubmit: VxeFormEvents.Submit = async () => {
      await props.submit(props.dataSource)
      modal.close(false)
      await props.loadData()
    }

    return () => (
      <div style="margin-bottom:15px;">
        <vxe-form
          custom-layout
          data={props.dataSource}
          rules={formRules}
          onSubmit={onSubmit}>
          <div style="display:flex;flex-wrap:wrap">
            {formItems.map((item) => (
              <div style={`width:${((1 / props.columns) * 100).toFixed(2)}%;`}>
                {item}
              </div>
            ))}
          </div>
          <div style="display:flex;justify-content:flex-end">{formActions}</div>
        </vxe-form>
      </div>
    )
  }
})
