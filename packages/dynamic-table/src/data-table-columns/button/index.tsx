import type { DataRecord } from '@/interfaces'

export function renderButtonColumn(options: RenderButtonColumnOptions) {
  return (record: DataRecord) => {
    const buttons = (
      'buttons' in options ? options.buttons : [options]
    ) as RenderSingleButtonColumnOptions[]

    const toBooleanValue = (
      value: boolean | ((record: DataRecord) => boolean) | undefined,
      defaultValue: boolean
    ) =>
      typeof value === 'function'
        ? value(record)
        : value === undefined
        ? defaultValue
        : value

    return (
      <>
        {buttons
          .filter((button) => toBooleanValue(button.show, true))
          .map((button) => (
            <vxe-button
              onClick={() => button.callback(record)}
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

export type RenderButtonColumnOptions =
  | RenderSingleButtonColumnOptions
  | RenderMultipleButtonColumnOptions

export interface RenderSingleButtonColumnOptions {
  text: string
  callback: (record: DataRecord) => void
  status?: 'primary' | 'success' | 'info' | 'warning' | 'danger'
  plain?: boolean
  round?: boolean
  show?: boolean | ((record: DataRecord) => boolean)
  disabled?: boolean | ((record: DataRecord) => boolean)
}

export interface RenderMultipleButtonColumnOptions {
  buttons?: RenderSingleButtonColumnOptions[]
}
