import { defineComponent, unref, type PropType } from 'vue'
import type { DataRecord, FormItemOptions } from '..'
import { DataEditForm } from '@/data-form'
import { createFormSource } from '@/dynamic-table/create-form-source'

export default defineComponent({
  props: {
    record: {
      type: Object,
      required: true
    },
    items: {
      type: Array as PropType<FormItemOptions[]>,
      required: true
    },
    columns: {
      type: Number,
      default: 3
    },
    labelWidth: {
      type: Number
    },
    padding: {
      type: Number,
      default: () => 10
    },
    loadData: {
      type: Function as PropType<() => void>,
      required: true
    },
    submit: {
      type: Function as PropType<(data: DataRecord) => Promise<unknown>>,
      required: true
    }
  },
  setup(props, context) {
    const [dataSource] = createFormSource(props.items)

    return () => (
      <DataEditForm
        dataSource={unref(dataSource)}
        forms={props.items}
        loadData={props.loadData}
        submit={props.submit}>
        {{
          actions: context.slots.actions
        }}
      </DataEditForm>
    )
  }
})
