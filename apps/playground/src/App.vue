<template>
  <ModalProvider>
    <div
      id="test"
      style="background: rgba(0, 0, 0, 0.1); margin: 100px">
      <data-table
        ref="table"
        v-model:radio="radio"
        v-model:checkbox="checkbox"
        :selection="{
          type: 'checkbox',
          width: 100,
          title: 'radio'
        }"
        row-key="id"
        :pagination="pageService"
        :load-data="loadData"
        :search-forms="searchForms"
        :edit-forms="searchForms"
        :columns="columns"
        action-align="right">
        <template #actions>
          <button @click="() => table.reload()">reload</button>
          <div>1231</div>
          <div>1231</div>
          <div>1231</div>
        </template>
      </data-table>
    </div>
  </ModalProvider>
  <div>checked: {{ checkbox }}</div>
</template>

<script setup lang="tsx">
import { ModalProvider } from '@gopowerteam/vue-modal'
import type {
  AdapterResponse,
  RequestPlugin,
  RequestSendOptions
} from '@gopowerteam/request'
import type {
  FormItemsOptions,
  LoadDataParams,
  PaginationOptions,
  TableColumnsOptions
} from '@gopowerteam/vue-dynamic-table'
import { useTable } from '@gopowerteam/vue-dynamic-table'
import type { Administrator } from './http/models/Administrator'
import { AdministratorService } from './http/services/AdministratorService'
import { onMounted, reactive, ref } from 'vue'

const administratorService = new AdministratorService()

class PageService implements RequestPlugin, PaginationOptions {
  private data = reactive({
    index: 1,
    size: 20,
    total: 0
  })

  get pageIndex() {
    return this.data.index
  }

  set pageIndex(value: number) {
    this.data.index = value
  }

  get pageSize() {
    return this.data.size
  }

  set pageSize(value: number) {
    this.data.size = value
  }

  get total() {
    return this.data.total
  }

  set total(value: number) {
    this.data.total = value
  }

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

  constructor(index = 1, size = 20) {
    this.pageIndex = index
    this.pageSize = size
  }

  reset(): void {
    this.pageIndex = 1
  }

  before(options: RequestSendOptions) {
    options.paramsQuery = {
      ...options.paramsQuery,
      page: this.pageIndex - 1,
      size: this.pageSize
    }
  }

  after(response: AdapterResponse) {
    this.total = response.data?.total
  }
}

const table = useTable('table')

const pageService = new PageService(1, 1)

const radio = ref('1')
const checkbox = ref(['1'])

function loadData({ search, update }: LoadDataParams) {
  administratorService.findAdministrator(search, [pageService]).then(() => {
    update(
      Array.from(Array(200), (_, i) => ({
        id: i,
        ...{
          phone: '18899992222',
          createdAt: '',
          uid: '001',
          amount: 123123,
          image:
            'https://gw.alicdn.com/tfs/TB1jwakrbH1gK0jSZFwXXc7aXXa-20-20.png___',
          category: { name: 'string1' },
          json: '{"test":123,"aaa":{"bbb":"asdas","ccc":"aasd"}}',
          text: '---test---'.repeat(5),
          tags: ['a', 'b', 'c']
        }
      }))
    )
  })
}

function dd({ row }: { row: any }) {
  return row.id === '1'
}

const searchForms: FormItemsOptions = [
  {
    key: 'a',
    title: 'a',
    rules: [{ required: true, message: '请输入名称22' }],
    render: (r) => r.render((data) => <input v-model={data.a}></input>)
  },
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
  },
  {
    key: 'test3',
    title: 'test3',
    render: (r) =>
      r.dateRange({
        type: 'date',
        clearable: true,
        disabledDate: (value, date) => {
          const [startDate] = value
          if (startDate) {
            return new Date(startDate).getMonth() !== date.getMonth()
          }

          return false
        }
      })
    // default: ['2023-01-01', '2023-01-03']
  },
  {
    key: 'test4',
    title: 'test4',
    render: (r) =>
      r.dateRange({
        type: 'date',
        clearable: true,
        disabledDate: (value, date) => {
          const [startDate] = value
          if (startDate) {
            return new Date(startDate).getMonth() !== date.getMonth()
          }

          return false
        }
      })
    // default: ['2023-01-01', '2023-01-03']
  }
]

const columns: TableColumnsOptions<Administrator> = [
  {
    key: 'id',
    title: '名称'
  },
  {
    key: 'amount',
    title: '名称',
    align: 'right',
    width: '200px',
    render: (r) => r.currency({ suffix: '元' })
  },
  {
    key: 'category',
    index: 'category.name',
    title: '分类'
  },
  // {
  //   key: 'render',
  //   title: 'Render',
  //   render: (r) => r.render(({ id }) => <div>id:{id}</div>)
  // },
  {
    key: 'createdAt',
    title: 'date',
    render: (r) => r.date()
  },
  {
    key: 'tags',
    title: 'tag',
    render: (r) =>
      r.tag({
        textColors: ['red', 'blue', 'green'],
        // textColors: (v, i) => 'red',
        backgroundColors: ['yellow'],
        // backgroundColors: (v, i) => 'red',
        border: 'yellow',
        radius: 2
      })
  },
  {
    key: 'json',
    title: 'JSON',
    preview: {
      span: 2
    },
    render: (r) => r.json({})
  },
  {
    key: 'phone',
    title: '手机号',
    render: (r) => r.phone({ safe: true, callable: true })
  },
  // {
  //   key: 'test2',
  //   title: 'test2',
  //   render: (r) => r.render(() => <div>{'123123123'.repeat(10)}</div>)
  // },
  {
    key: 'image',
    title: '图片',
    render: (r) =>
      r.image({
        rotate: 30,
        preview: true,
        parse: async (v) => {
          return v.replaceAll('___', '')
        }
      })
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
      r.preview({
        exclude: ['id'],
        border: true,
        borderColor: 'red',
        columns: 2,
        buttons: [
          {
            text: '测试1',
            confirm: true,
            callback: (record) => {
              // eslint-disable-next-line no-console
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
            icon: () => <span>icon</span>,
            text: 'aaa',
            confirm: true,
            confirmText: 'gogogo',
            confirmAppend: '#test',
            callback: (record) => {
              // eslint-disable-next-line no-console
              console.log(record)
            }
          },
          {
            text: '编辑',
            callback: (record) => {
              table.value.edit({
                title: '编辑',
                record,
                columns: 1,
                appendRowKey: true,
                submit: (data) => {
                  // eslint-disable-next-line no-console
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
