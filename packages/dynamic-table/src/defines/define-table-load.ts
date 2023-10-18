import type { LoadDataParams } from '@/interfaces'

export function defineTableLoad(load: (params: LoadDataParams) => void) {
  return load
}
