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
      default: 3
    },
    labelWidth: {
      type: Number
    },
    padding: {
      type: Number,
      default: () => 10
    },
    border: {
      type: Boolean,
      default: true
    },
    borderColor: {
      type: String,
      default: '#7f7f7f'
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

    // 生成Rows
    const rows = columns.reduce<typeof columns[]>((r, item) => {
      const tr =
        r.length && r[r.length - 1].length < props.columns
          ? r[r.length - 1]
          : []

      if (tr.length === 0) {
        r.push(tr)
      }

      tr.push(item)

      return r
    }, [])

    // Label样式
    const labelStyle = [
      'margin-right:10px;',
      'color:rgba(0,0,0,0.7)',
      props.labelWidth ? `min-width:${props.labelWidth}` : ''
    ]

    // Value样式
    const valueStyle = ['word-break:break-all;']

    // 单元格样式
    const cellStyle = [
      `padding:${props.padding}px;`,
      props.border ? `border: 1px solid ${props.borderColor};` : '',
      'border-collapse: collapse;'
    ]

    // 表格样式
    const tableStyle = [
      'width:100%;',
      'margin:10px 0;',
      props.border ? `border: 1px solid ${props.borderColor};` : '',
      'border-collapse: collapse;'
    ]

    const toStyle = (style: (string | undefined)[]) =>
      style.filter(Boolean).join('')

    return () => (
      <table
        cellpadding="0"
        cellspacing="0"
        style={toStyle(tableStyle)}>
        {rows.map((items) => (
          <tr>
            {items.map((item) => (
              <td style={toStyle(cellStyle)}>
                <span style={toStyle(labelStyle)}>{item.options.title}:</span>
                <span style={toStyle(valueStyle)}>
                  {item.render?.default
                    ? item.render?.default({ row: props.record })
                    : getColumnValue(props.record, item.options)}
                </span>
              </td>
            ))}
          </tr>
        ))}
      </table>
    )
  }
})
