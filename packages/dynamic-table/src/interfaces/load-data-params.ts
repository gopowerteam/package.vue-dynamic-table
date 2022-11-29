export type DataRecord = { [key: string]: any }
export type DataProp = { [key: string]: any }

/**
 * 分页接口
 */
export interface PageService {
  page: number
  size: number
}

/**
 * 数据加载参数
 */
export type LoadDataParams = {
  search: DataRecord
  page?: PageService
  update: (data: DataRecord[]) => void
}
