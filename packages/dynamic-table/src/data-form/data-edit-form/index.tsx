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

    autoReload: {
      type: Boolean,
      required: true
    },
    /**
     * 分页配置
     */
    submit: {
      type: Function as PropType<(data: DataRecord) => Promise<unknown>>,
      required: true
    },
    /**
     * 每行列数
     */
    columns: {
      type: Number,
      default: 3
    },
    /**
     * 标题宽度
     */
    titleWidth: {
      type: [String, Number],
      default: '100'
    },
    /**
     * 标题对齐
     */
    titleAlign: {
      type: String as PropType<'left' | 'right' | 'center'>,
      default: 'right'
    },
    /**
     * 标题冒号
     */
    titleColon: {
      type: Boolean,
      default: false
    }
  },
  setup(props, { slots }) {
    const modal = useModal()
    const formItems = props.forms.map((form) =>
      renderFormItem(form, 24 / props.columns)
    )
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

      if (props.autoReload) {
        await props.loadData()
      }
    }

    return () => (
      <div>
        <vxe-form
          title-width={props.titleWidth}
          title-align={props.titleAlign}
          title-colon={props.titleColon}
          custom-layout
          data={props.dataSource}
          rules={formRules}
          onSubmit={onSubmit}>
          {formItems}
          <vxe-form-item span={24}>
            <div style="display:flex;justify-content:flex-end">
              {formActions}
            </div>
          </vxe-form-item>
        </vxe-form>
      </div>
    )
  }
})
