import { renderButtonColumn } from './button'
import { renderDateColumn } from './date'
import { renderDictColumn } from './dict'
import { renderPhoneColumn } from './phone'
import { renderTextColumn } from './text'
import { renderViewColumn } from './view'
import { renderJSONColumn } from './json'
import { renderImageColumn } from './image'
import { renderRenderColumn } from './render'

export function getTableColumnRenders<T>() {
  return {
    text: renderTextColumn<T>,
    phone: renderPhoneColumn<T>,
    dict: renderDictColumn<T>,
    date: renderDateColumn<T>,
    button: renderButtonColumn<T>,
    view: renderViewColumn<T>,
    json: renderJSONColumn<T>,
    image: renderImageColumn<T>,
    render: renderRenderColumn<T>
  }
}
