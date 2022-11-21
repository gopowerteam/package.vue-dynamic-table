import { RenderColumnType } from '@/utils/create-renderer'
import { getColumnValue } from '@/utils/get-column-value'
import { defineComponent, type PropType } from 'vue'
import type { TableColumnsOptions } from '..'
import { toRenderTemplate } from './render-table-column'

export default defineComponent({
  props: {
    record: {
      type: Object,
      required: true
    },
    options: {
      type: Array as PropType<TableColumnsOptions>,
      required: true
    },
    columns: {
      type: Number,
      required: true
    },
    labelWidth: {
      type: Number
    }
  },
  setup(props) {
    const columns = props.options
      .map((column) => ({
        options: column,
        render: toRenderTemplate(column)
      }))
      .filter(({ render }) => {
        if (render && render[RenderColumnType]) {
          return !['view', 'button'].includes(render[RenderColumnType])
        } else {
          return true
        }
      })

    return () => (
      <div style="display:flex;flex-wrap:wrap;">
        {columns.map((column) => (
          <div style={`width:${((1 / props.columns) * 100).toPrecision(2)}%;`}>
            <div style="padding:10px;">
              <span
                style={`margin-right:10px;${
                  props.labelWidth ?? `min-width:${props.labelWidth}`
                }`}>
                {column.options.title}:
              </span>
              <span>
                {column.render?.default
                  ? column.render?.default({ row: props.record })
                  : getColumnValue(props.record, column.options)}
              </span>
            </div>
          </div>
        ))}
      </div>
    )
  }
})
