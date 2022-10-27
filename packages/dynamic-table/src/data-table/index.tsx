import type { TableColumnsOptions } from '@/interfaces/table-column-options'
import type { DataRecord } from '@/interfaces/load-data-params'
import { defineComponent, type PropType } from 'vue'
import { createTableColumn } from './create-table-column'

export default defineComponent({
  name: 'DataTable',
  props: {
    /**
     * 数据源
     */
    dataSource: {
      type: Array as PropType<DataRecord[]>,
      required: true
    },
    /**
     * 列配置
     */
    columns: {
      type: Array as PropType<TableColumnsOptions>,
      required: true
    }
  },
  setup(props) {
    const columns = props.columns.map(createTableColumn)
    return () => <vxe-table data={props.dataSource}>{columns}</vxe-table>
  }
})
