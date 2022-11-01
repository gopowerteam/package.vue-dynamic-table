import { VXETable } from 'vxe-table'

export function renderButtonColumn<T>(options: RenderButtonColumnOptions<T>) {
  return (record: T) => {
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
      // 获取执行状态
      const executable =
        button.confirm === true
          ? (await VXETable.modal.confirm(
              button.confirmText || '您确定要执行该操作？'
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
}

export interface RenderMultipleButtonColumnOptions<T> {
  buttons?: RenderSingleButtonColumnOptions<T>[]
}
