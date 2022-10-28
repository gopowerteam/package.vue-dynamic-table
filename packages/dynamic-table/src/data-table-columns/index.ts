import { renderPhoneColumn } from './phone'
import { renderTextColumn } from './text'

export const tableColumnRenders = {
  text: renderTextColumn,
  phone: renderPhoneColumn
}
