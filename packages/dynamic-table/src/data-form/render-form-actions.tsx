import { useModal } from '@gopowerteam/vue-modal'
import type { FormItemOptions } from '..'
import { useEvents } from '@/utils/use-events'
import { VxeButton } from 'vxe-table'
import { inject, type Slot } from 'vue'

/**
 * Submit Button
 * @returns
 */
function submitButton(text = '提交') {
  return () => () =>
    (
      <VxeButton
        type="submit"
        status="primary"
        content={text}></VxeButton>
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

function exportButton() {
  const id = inject('id') as string
  const events = useEvents(id)

  return (
    <VxeButton
      circle
      icon="vxe-icon-download"
      onClick={() => events.emit('export')}
      type="button"></VxeButton>
  )
}

function refreshButton() {
  return (
    <vxe-button
      type="submit"
      icon="vxe-icon-refresh"
      circle></vxe-button>
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

export function renderEditFormActions(actions?: Slot) {
  return (
    <div style="display:flex;justify-content:between;">
      <div style="display:flex;justify-content:flex-start;">
        {actions && renderActionItems(actions)}
      </div>
      <div style="display:flex;justify-content:flex-end;">
        {renderFormItem([submitButton('提交'), cancelButton], false)}
      </div>
    </div>
  )
}

export function renderSearchFormActions(
  forms: FormItemOptions[],
  actionsPosition: 'left' | 'right',
  exportable: boolean,
  refreshable: boolean,
  actions?: Slot
) {
  const hasCollapsed = forms.some((form) => form.collapsed)

  const defaultActions = []

  if (forms && forms.length > 0) {
    defaultActions.push(submitButton('搜索'), resetButton)
  }

  const showActionBar = [exportable, refreshable, actions].some(Boolean)

  return (
    <>
      {((forms && forms.length > 0) || exportable) && (
        <>{renderFormItem(defaultActions, hasCollapsed)}</>
      )}
      {showActionBar && (
        <>
          <div
            class="divider"
            style="height:1px;margin:10px 0;background-color:rgba(0,0,0,0.1)"></div>
          <div
            style={`padding:5px 0 10px 0;display:flex;justify-content:space-between;align-items:center;flex-direction:${
              actionsPosition === 'right' ? 'row' : 'row-reverse;'
            }`}>
            <div class="tools">
              {exportable && exportButton()}
              {refreshable && refreshButton()}
            </div>
            <div class="actions">{actions && renderActionItems(actions)}</div>
          </div>
        </>
      )}
    </>
  )
}
