<template>
  <data-table
    :pagination="pageService"
    rowKey="id"
    :load-data="loadData"
    :columns="columns"></data-table>
</template>

<script setup lang="ts">
import type { RequestPlugin } from '@gopowerteam/request'
import type {
  R,
  A
} from '@gopowerteam/request/dist/request-adapter.interface-bd32c0be'
import type {
  LoadDataParams,
  PaginationOptions,
  TableColumnsOptions
} from '@gopowerteam/vue-dynamic-table'
import { ref, type Ref } from 'vue'
import { AdministratorService } from './http/services/AdministratorService'
const administratorService = new AdministratorService()

class PageService implements RequestPlugin, PaginationOptions {
  pageIndex: Ref<number> = ref(1)
  pageSize: Ref<number> = ref(20)
  pageSizeOpts: number[] = [10, 20, 30, 40, 50]
  pageLayouts: (
    | 'PrevJump'
    | 'PrevPage'
    | 'JumpNumber'
    | 'NextPage'
    | 'NextJump'
    | 'Sizes'
    | 'FullJump'
    | 'Total'
  )[] = [
    'PrevJump',
    'PrevPage',
    'JumpNumber',
    'NextPage',
    'NextJump',
    'Sizes',
    'FullJump',
    'Total'
  ]
  total: Ref<number> = ref(0)

  constructor(index = 1, size = 20) {
    this.pageIndex.value = index
    this.pageSize.value = size
  }

  reset(): void {
    this.pageIndex.value = 1
  }

  before(options: R) {
    options.paramsQuery = {
      ...options.paramsQuery,
      page: this.pageIndex.value - 1,
      size: this.pageSize.value
    }
  }

  after(response: A, options: R) {
    this.total.value = response.data?.total
  }
}

const pageService = new PageService(1, 1)

function loadData({ form, update }: LoadDataParams) {
  administratorService
    .findAdministrator(form, [pageService])
    .then(({ data }) => {
      update(data)
    })
}

const columns: TableColumnsOptions = [
  {
    key: 'id',
    title: '名称'
  },
  {
    key: 'username',
    title: '用户名',
    form: {
      rules: [{ required: true, message: '请输入名称' }],
      render: (r) => r.input({ placeholder: 'asd' })
    }
  },
  {
    key: 'realname',
    title: '真实姓名',
    form: {
      collapsed: true,
      render: (r) => r.input({ placeholder: 'asd' })
    }
  }
]
</script>
