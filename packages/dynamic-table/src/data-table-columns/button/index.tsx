import { createRenderer } from '@/utils/create-renderer'
import { VXETable } from 'vxe-table'

export function renderButtonColumn<T>(options: RenderButtonColumnOptions<T>) {
  const render = (record: T) => {
    const buttons = (
      'buttons' in options ? options.buttons : [options]
    ) as RenderSingleButtonColumnOptions<T>[]

    const toBooleanValue = (
      value: boolean | ((record: T) => boolean) | undefined,
      defaultValue: boolean
    ) =>
      typeof value === 'function'
        ? value(record)
        : value === undefined
        ? defaultValue
        : value

    async function onCallback(button: RenderSingleButtonColumnOptions<T>) {
      // 计算Append容器修正位置
      const getAppendPosition = () => {
        const width = 420
        const height = 150
        if (!button.confirmAppend) {
          return {}
        }

        const container =
          typeof button.confirmAppend === 'string'
            ? document.querySelector<HTMLElement>(button.confirmAppend)
            : button.confirmAppend

        if (!container) {
          return {}
        }
        // 获取容器区域尺寸
        const clientVisibleWidth = container.clientWidth
        const clientVisibleHeight = container.clientHeight
        // 计算Left,Top
        const left = clientVisibleWidth / 2 - width / 2 + container.offsetLeft
        const top = clientVisibleHeight / 2 - height / 2 + container.offsetTop

        return {
          position: {
            left: left,
            top: top
          },
          width,
          height
        }
      }
      // 获取执行状态
      const executable =
        button.confirm === true
          ? (await VXETable.modal.confirm(
              button.confirmText || '您确定要执行该操作？',
              '确认',
              {
                // 获取显示位置
                ...getAppendPosition()
              }
            )) === 'confirm'
          : true

      if (executable) {
        button.callback(record)
      }
    }

    return (
      <>
        {buttons
          .filter((button) => toBooleanValue(button.show, true))
          .map((button) => (
            <vxe-button
              onClick={() => onCallback(button)}
              content={button.text}
              status={button.status || 'primary'}
              round={button.round}
              disabled={toBooleanValue(button.disabled, false)}
              type={button.plain === false ? 'button' : 'text'}></vxe-button>
          ))}
      </>
    )
  }

  return createRenderer('button', render)
}

export type RenderButtonColumnOptions<T> =
  | RenderSingleButtonColumnOptions<T>
  | RenderMultipleButtonColumnOptions<T>

export interface RenderSingleButtonColumnOptions<T> {
  text: string
  callback: (record: T) => void
  status?: 'primary' | 'success' | 'info' | 'warning' | 'danger'
  plain?: boolean
  round?: boolean
  show?: boolean | ((record: T) => boolean)
  disabled?: boolean | ((record: T) => boolean)
  confirm?: boolean
  confirmText?: string
  confirmAppend?: string | HTMLElement
}

export interface RenderMultipleButtonColumnOptions<T> {
  buttons?: RenderSingleButtonColumnOptions<T>[]
}
