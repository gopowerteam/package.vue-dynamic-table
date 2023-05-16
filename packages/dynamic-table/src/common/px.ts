/**
 * 转换为 px 字符串
 * @param value
 * @param config
 * @returns
 */
export function toPxString(value: number | string): string {
  switch (true) {
    case typeof value === 'string': {
      const float = parseFloat(value.toString())
      return isNaN(float) ? value.toString() : `${float.toFixed(0)}px`
    }
    case typeof value === 'number':
      return `${(value as number).toFixed(0)}px`
    default:
      return 'auto'
  }
}

/**
 * 转换为 px 字符串
 * @param value
 * @param config
 * @returns
 */
export function toPxNumber(
  value: number | string | undefined
): number | undefined {
  switch (true) {
    case typeof value === 'undefined':
      return undefined
    case typeof value === 'string' && value.endsWith('px'): {
      return parseFloat((value as string).replace('px', ''))
    }
    case typeof value === 'string' && !value.endsWith('px'):
      return parseFloat((value as string).toString())
    case typeof value === 'number':
      return value as number
    default:
      return NaN
  }
}
