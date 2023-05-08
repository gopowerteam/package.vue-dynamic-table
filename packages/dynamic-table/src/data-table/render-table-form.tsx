import { defineComponent, unref, type PropType, provide } from 'vue'
import type { DataRecord, FormItemOptions } from '..'
import { DataEditForm } from '@/data-form'
import { createFormSource } from '@/dynamic-table/create-form-source'

export default defineComponent({
  props: {
    record: {
      type: Object,
      required: true
    },
    rowKey: {
      type: String,
      required: true
    },
    appendRowKey: {
      type: Boolean,
      default: false
    },
    items: {
      type: Array as PropType<FormItemOptions[]>,
      required: true
    },
    columns: {
      type: Number,
      default: 3
    },
    padding: {
      type: Number,
      default: () => 10
    },
    loadData: {
      type: Function as PropType<() => void>,
      required: true
    },
    autoReload: {
      type: Boolean,
      default: false
    },
    submit: {
      type: Function as PropType<(data: DataRecord) => Promise<unknown>>,
      required: true
    },
    tableId: {
      type: String,
      required: true
    },
    /**
     * 标题宽度
     */
    labelWidth: {
      type: [String, Number],
      default: '100'
    },
    /**
     * 标题对齐
     */
    labelAlign: {
      type: String as PropType<'left' | 'right' | 'center'>,
      default: 'right'
    },
    /**
     * 标题冒号
     */
    labelColon: {
      type: Boolean,
      default: false
    }
  },
  setup(props, context) {
    const [dataSource, updateDataSource] = createFormSource(props.items)
    provide('id', props.tableId)

    // 获取初始化数据
    const record = Object.entries(dataSource.value).reduce(
      (r, [key]) => ((r[key] = props.record[key] || null), r),
      {} as DataRecord
    )

    if (props.appendRowKey) {
      record[props.rowKey] = props.record[props.rowKey]
    }

    // 更新数据源
    updateDataSource(record)

    return () => (
      <div style="padding:20px 10px 0">
        <DataEditForm
          dataSource={unref(dataSource)}
          forms={props.items}
          loadData={props.loadData}
          autoReload={props.autoReload}
          columns={props.columns}
          labelWidth={props.labelWidth}
          labelAlign={props.labelAlign}
          labelColon={props.labelColon}
          submit={props.submit}>
          {{
            actions: context.slots.actions
          }}
        </DataEditForm>
      </div>
    )
  }
})
