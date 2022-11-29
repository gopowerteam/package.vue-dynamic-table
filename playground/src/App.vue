<template>
  <ModalProvider>
    <div
      id="test"
      style="background: rgba(0, 0, 0, 0.1); margin: 100px">
      <data-table
        ref="table"
        :pagination="pageService"
        rowKey="id"
        :load-data="loadData"
        :search-forms="searchForms"
        action-align="right"
        :edit-forms="searchForms"
        :columns="columns">
        <template #actions>
          <button @click="() => table.reload()">reload</button>
          <div>1231</div>
          <div>1231</div>
          <div>1231</div>
        </template>
      </data-table>
    </div>
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
  DataRecord,
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

const table = useTable('table')

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

const searchForms: FormItemsOptions = [
  {
    key: 'phone',
    title: 'phone',
    rules: [{ required: true, message: '请输入名称' }],
    render: (r) => r.input()
  },
  {
    key: 'enable',
    title: '状态',
    render: (r) => r.switch({})
  },

  {
    key: 'test1',
    title: 'test1',
    rules: [{ required: true, message: '请输入名称' }],
    render: (r) =>
      r.select({
        default: 'b',
        options: new Map([
          ['a', 'aaa'],
          ['b', 'bbb']
        ])
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
    search: {
      rules: [{ required: true, message: '请输入名称' }],
      render: (r) => r.input({ placeholder: 'asd' })
    }
  },
  {
    key: 'realname',
    title: '真实姓名',
    search: {
      collapsed: true,
      render: (r) => r.input({ placeholder: 'asd' })
    }
  },

  {
    key: 'uid',
    title: 'uid',
    render: (r) =>
      r.view({
        exclude: ['id'],
        border: true,
        borderColor: 'red',
        buttons: [
          {
            text: '测试1',
            confirm: true,
            callback: (record) => {
              console.log(record)
            }
          }
        ]
      })
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
            confirmAppend: '#test',
            callback: (record) => {
              console.log(record)
            }
          },
          {
            text: '编辑',
            callback: (record) => {
              table.value.edit({
                record,
                submit: (data: DataRecord) => {
                  console.log(data)
                }
              })
            }
          }
        ]
      })
  }
]
</script>
