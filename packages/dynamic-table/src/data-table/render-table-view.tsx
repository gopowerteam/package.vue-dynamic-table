import type { RenderSingleButtonColumnOptions } from '@/data-table-columns/button'
import { RenderColumnType } from '@/utils/create-renderer'
import { getColumnValue } from '@/utils/get-column-value'
import { defineComponent, type PropType } from 'vue'
import type { DataRecord, TableColumnsOptions } from '..'
import { toRenderTemplate } from './render-table-column'
import { VXETable } from 'vxe-table'

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
    },
    exclude: {
      type: Array as PropType<Array<string>>,
      default: []
    },
    buttons: {
      type: Array as PropType<RenderSingleButtonColumnOptions<DataRecord>[]>,
      default: []
    }
  },
  setup(props) {
    const columns = props.options
      .map((column) => ({
        options: column,
        render: toRenderTemplate(column)
      }))
      .filter(({ options }) => !props.exclude?.includes(options.key))
      .filter(({ render }) => {
        if (render?.[RenderColumnType]) {
          return !['button'].includes(render[RenderColumnType])
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

    const renderButtons = () => {
      const toBooleanValue = (
        value: boolean | ((record: DataRecord) => boolean) | undefined,
        defaultValue: boolean
      ) =>
        typeof value === 'function'
          ? value(props.record)
          : value === undefined
          ? defaultValue
          : value

      async function onCallback(
        button: RenderSingleButtonColumnOptions<DataRecord>
      ) {
        // 获取执行状态
        const executable =
          button.confirm === true
            ? (await VXETable.modal.confirm(
                button.confirmText || '您确定要执行该操作？',
                '确认'
              )) === 'confirm'
            : true

        if (executable) {
          button.callback(props.record)
        }
      }

      return (
        <div style="display:flex;justify-content:flex-end;">
          {props.buttons
            .filter((button) => toBooleanValue(button.show, true))
            .map((button) => (
              <vxe-button
                onClick={() => onCallback(button)}
                content={button.text}
                status={button.status || 'primary'}
                round={button.round}
                disabled={toBooleanValue(button.disabled, false)}
                type={button.plain === false ? 'text' : 'button'}></vxe-button>
            ))}
        </div>
      )
    }

    return () => (
      <>
        <table
          class="VIEW_COLUMN_TABLE"
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
        {props.buttons?.length > 0 && renderButtons()}
      </>
    )
  }
})
