import { renderButtonColumn } from './button'
import { renderDateColumn } from './date'
import { renderDictColumn } from './dict'
import { renderPhoneColumn } from './phone'
import { renderTextColumn } from './text'

export const tableColumnRenders = {
  text: renderTextColumn,
  phone: renderPhoneColumn,
  dict: renderDictColumn,
  date: renderDateColumn,
  button: renderButtonColumn
}
