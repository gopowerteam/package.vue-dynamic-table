import { renderButtonColumn } from './button'
import { renderDateColumn } from './date'
import { renderDictColumn } from './dict'
import { renderPhoneColumn } from './phone'
import { renderTextColumn } from './text'
import { renderViewColumn } from './view'

export const tableColumnRenders = {
  text: renderTextColumn,
  phone: renderPhoneColumn,
  dict: renderDictColumn,
  date: renderDateColumn,
  button: renderButtonColumn,
  view: renderViewColumn
}

export function getTableColumnRenders<T>() {
  return {
    text: renderTextColumn,
    phone: renderPhoneColumn,
    dict: renderDictColumn,
    date: renderDateColumn,
    button: renderButtonColumn<T>,
    view: renderViewColumn
  }
}
