import { useModal } from '@gopowerteam/vue-modal'
import type { Slot } from 'vue'
import type { FormItemOptions } from '..'

/**
 * Submit Button
 * @returns
 */
function submitButton() {
  return () => (
    <vxe-button
      type="submit"
      status="primary"
      content="提交"></vxe-button>
  )
}

function resetButton() {
  return () => (
    <vxe-button
      type="reset"
      content="重置"></vxe-button>
  )
}

function cancelButton() {
  return () => {
    const modal = useModal()

    return (
      <vxe-button
        type="button"
        content="取消"
        onClick={() => modal.close(false)}></vxe-button>
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
  actions?: Slot
) {
  const hasCollapsed = forms.some((form) => form.collapsed)

  return (
    <>
      {forms && forms.length > 0 && (
        <>{renderFormItem([submitButton, resetButton], hasCollapsed)}</>
      )}
      <div
        style={`display:flex;justify-content:${
          actionAlign === 'left' ? 'flex-start' : 'flex-end'
        }`}>
        {actions && renderActionItems(actions)}
      </div>
    </>
  )
}
