import { renderDateItem } from './date'
import { renderInputItem } from './input'
import { renderSelectItem } from './select'

export const formItemRenders = {
  input: renderInputItem,
  select: renderSelectItem,
  date: renderDateItem
}
