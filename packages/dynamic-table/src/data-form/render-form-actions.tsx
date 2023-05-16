import { useModal } from '@gopowerteam/vue-modal'
import { inject, type Slot } from 'vue'
import type { FormItemOptions } from '..'
import { useEvents } from '@/utils/use-events'
import { VxeButton } from 'vxe-table'

/**
 * Submit Button
 * @returns
 */
function submitButton() {
  return () => (
    <VxeButton
      type="submit"
      status="primary"
      content="提交"></VxeButton>
  )
}

function resetButton() {
  return () => (
    <VxeButton
      type="reset"
      content="重置"></VxeButton>
  )
}

function cancelButton() {
  return () => {
    const modal = useModal()

    return (
      <VxeButton
        type="button"
        content="取消"
        onClick={() => modal.close(false)}></VxeButton>
    )
  }
}

function exportButton(callback: () => void) {
  return () => {
    return () => (
      <VxeButton
        onClick={callback}
        type="button"
        content="导出"></VxeButton>
    )
  }
}

/**
 * 渲染FormItem
 * @param render
 * @returns
 */
function renderFormItem(
  render:
    | (() => () => JSX.Element)[]
    | (() => () => JSX.Element)
    | (() => Slot),
  collapseAction?: boolean
) {
  return (
    <vxe-form-item collapse-node={collapseAction}>
      {{
        default: Array.isArray(render)
          ? () => <>{render.map((r) => r()())}</>
          : render()
      }}
    </vxe-form-item>
  )
}

function renderActionItems(actions?: Slot) {
  if (actions) {
    return actions().map((item) => renderFormItem(() => () => item))
  }
}

export function renderEditFormActions(actions?: Slot) {
  return (
    <div style="display:flex;justify-content:between;">
      <div style="display:flex;justify-content:flex-start;">
        {actions && renderActionItems(actions)}
      </div>
      <div style="display:flex;justify-content:flex-end;">
        {renderFormItem([submitButton, cancelButton], false)}
      </div>
    </div>
  )
}

export function renderSearchFormActions(
  forms: FormItemOptions[],
  actionAlign: 'left' | 'right',
  exportable: boolean,
  actions?: Slot
) {
  const hasCollapsed = forms.some((form) => form.collapsed)

  const defaultActions = [submitButton, resetButton]

  if (exportable) {
    const id = inject('id') as string
    const events = useEvents(id)
    const button = exportButton(() => events.emit('export'))
    defaultActions.push(button)
  }

  return (
    <>
      {forms && forms.length > 0 && (
        <>{renderFormItem(defaultActions, hasCollapsed)}</>
      )}
      {actions && (
        <>
          <div
            class="divider"
            style="height:1px;margin:10px 0;background-color:rgba(0,0,0,0.1)"></div>
          <div
            style={`display:flex;justify-content:${
              actionAlign === 'left' ? 'flex-start' : 'flex-end'
            }`}>
            {actions && renderActionItems(actions)}
          </div>
        </>
      )}
    </>
  )
}
