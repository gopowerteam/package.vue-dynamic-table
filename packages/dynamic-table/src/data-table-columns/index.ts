import { renderButtonColumn } from './button'
import { renderDateColumn } from './date'
import { renderDictColumn } from './dict'
import { renderPhoneColumn } from './phone'
import { renderTextColumn } from './text'
import { renderPreviewColumn } from './preview'
import { renderImageColumn } from './image'
import { renderRenderColumn } from './render'
import { renderTagColumn } from './tag'
import { renderCurrencyColumn } from './currency'

export function getTableColumnRenders<T>() {
  return {
    tag: renderTagColumn<T>,
    text: renderTextColumn<T>,
    phone: renderPhoneColumn<T>,
    dict: renderDictColumn<T>,
    date: renderDateColumn<T>,
    button: renderButtonColumn<T>,
    preview: renderPreviewColumn<T>,
    image: renderImageColumn<T>,
    currency: renderCurrencyColumn<T>,
    render: renderRenderColumn<T>
  }
}
