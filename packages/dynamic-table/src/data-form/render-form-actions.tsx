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

export function renderFormActions(forms: FormItemOptions[], actions?: Slot) {
  const hasCollapsed = forms.some((form) => form.collapsed)

  return (
    <>
      {actions && renderActionItems(actions)}
      {renderFormItem([submitButton, resetButton], hasCollapsed)}
    </>
  )
}
