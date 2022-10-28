import { renderDateColumn } from './date'
import { renderDictColumn } from './dict'
import { renderPhoneColumn } from './phone'
import { renderTextColumn } from './text'

export const tableColumnRenders = {
  text: renderTextColumn,
  phone: renderPhoneColumn,
  dict: renderDictColumn,
  date: renderDateColumn
}
