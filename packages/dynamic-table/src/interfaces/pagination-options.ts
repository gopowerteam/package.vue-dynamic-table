import type { Ref } from 'vue'

export interface PaginationOptions {
  pageIndex: Ref<number>
  pageSize: Ref<number>
  pageSizeOpts: number[]
  pageLayouts: Array<
    | 'PrevJump'
    | 'PrevPage'
    | 'JumpNumber'
    | 'NextPage'
    | 'NextJump'
    | 'Sizes'
    | 'FullJump'
    | 'Total'
  >
  total: Ref<number>
}
