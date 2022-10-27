function submitButton() {
  return (
    <vxe-button
      type="submit"
      status="primary"
      content="提交"></vxe-button>
  )
}

function resetButton() {
  return (
    <vxe-button
      type="reset"
      status="primary"
      content="重置"></vxe-button>
  )
}

function renderFormItem(render: () => JSX.Element) {
  return (
    <vxe-form-item>
      {{
        default: render
      }}
    </vxe-form-item>
  )
}

export function renderFormActions() {
  return (
    <>
      {renderFormItem(submitButton)}
      {renderFormItem(resetButton)}
    </>
  )
}
