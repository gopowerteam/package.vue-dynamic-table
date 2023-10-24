import { useModal } from '@gopowerteam/vue-modal'
import type { DataRecord, FormItemOptions } from '..'
import { useEvents } from '@/utils/use-events'
import { inject, type Slot } from 'vue'
import { Button } from '@arco-design/web-vue'
import { IconDownload, IconRefresh } from '@arco-design/web-vue/es/icon'
/**
 * Submit Button
 * @returns
 */
function submitButton(text = '提交') {
  return () => () => (
    <Button
      style={{ margin: '0 5px' }}
      htmlType="submit"
      type="primary">
      {text}
    </Button>
  )
}

function resetButton() {
  return () => (
    <Button
      style={{ margin: '0 5px' }}
      htmlType="reset"
      type="secondary">
      重置
    </Button>
  )
}

function cancelButton() {
  return () => {
    const modal = useModal()

    return (
      <Button
        style={{ margin: '0 5px' }}
        htmlType="button"
        onClick={() => modal.close(false)}>
        取消
      </Button>
    )
  }
}

function exportButton() {
  const id = inject('id') as string
  const events = useEvents(id)

  return (
    <Button
      shape="circle"
      style={{ margin: '0 5px' }}
      onClick={() => events.emit('export')}
      htmlType="button">
      {{
        icon: () => <IconDownload></IconDownload>
      }}
    </Button>
  )
}

function refreshButton() {
  return (
    <Button
      style={{ margin: '0 5px' }}
      htmlType="submit"
      shape="circle">
      {{
        icon: () => <IconRefresh></IconRefresh>
      }}
    </Button>
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
  forms: FormItemOptions<DataRecord>[],
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
            style="width:100%;height:1px;margin:10px 0;background-color:rgba(0,0,0,0.1)"></div>
          <div
            style={`width:100%;padding:5px 0 10px 0;display:flex;justify-content:space-between;align-items:center;flex-direction:${
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
