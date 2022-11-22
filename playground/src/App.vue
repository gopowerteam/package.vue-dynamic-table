<template>
  <ModalProvider>
    <data-table
      ref="table"
      :pagination="pageService"
      rowKey="id"
      :load-data="loadData"
      :forms="forms"
      :columns="columns">
      <template #actions>
        <button @click="() => table.reload()">reload</button>
        <div>1231</div>
        <div>1231</div>
        <div>1231</div>
      </template>
    </data-table>
  </ModalProvider>
</template>

<script setup lang="ts">
import { ModalProvider } from '@gopowerteam/vue-modal'
import type { RequestPlugin } from '@gopowerteam/request'
import type {
  R,
  A
} from '@gopowerteam/request/dist/request-adapter.interface-bd32c0be'
import type {
  FormItemsOptions,
  LoadDataParams,
  PaginationOptions,
  TableColumnsOptions
} from '@gopowerteam/vue-dynamic-table'
import { useTable } from '@gopowerteam/vue-dynamic-table'
import { ref, type Ref } from 'vue'
import type { Administrator } from './http/models/Administrator'
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
      update(
        data.map((x) => {
          ;(x as any)['phone'] = '18899992222'
          ;(x as any)['createdAt'] = ''
          ;(x as any)['uid'] = '001'
          return x
        })
      )
    })
}

const forms: FormItemsOptions = [
  {
    key: 'test1',
    title: 'test1',
    render: (r) =>
      r.select({
        default: 'b',
        options: new Map([
          ['a', 'aaa'],
          ['b', 'bbb']
        ]),
        autoSumbit: true
      })
  },
  {
    key: 'test2',
    title: 'test2',
    render: (r) => r.date({ type: 'year' })
  }
]

const columns: TableColumnsOptions<Administrator> = [
  {
    key: 'id',
    title: '名称'
  },
  {
    key: 'createdAt',
    title: 'date',
    render: (r) => r.date()
  },
  {
    key: 'phone',
    title: '手机号',
    render: (r) => r.phone({ safe: true, callable: true })
  },
  {
    key: 'username',
    title: '用户名',
    render: (r) =>
      r.text({
        color: 'red',
        text: '1'
      }),
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
  },
  {
    key: 'uid',
    title: 'uid',
    render: (r) => r.view({ border: true, borderColor: 'red' })
  },
  {
    key: 'action',
    title: '操作',
    render: (r) =>
      r.button({
        buttons: [
          {
            text: '测试1',
            confirm: true,
            confirmText: 'gogogo',
            callback: (record) => {
              console.log(record)
            }
          },
          {
            text: '测试2',
            callback: (record) => {
              console.log(record)
            }
          }
        ]
      })
  }
]

const table = useTable('table')
</script>
