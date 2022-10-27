<template>
  <vxe-pager
    v-model:current-page="currentPage"
    v-model:page-size="pageSize"
    perfect
    :total="total"
    :page-sizes="pagination.pageSizeOpts"
    :layouts="pagination.pageLayouts"
    @page-change="onPageChange">
  </vxe-pager>
</template>

<script setup lang="ts">
import type { PaginationOptions } from '@/interfaces'

const props = defineProps<{
  pagination: PaginationOptions
  loadData: () => void
}>()

const currentPage = props.pagination.pageIndex
const pageSize = props.pagination.pageSize
const total = props.pagination.total

function onPageChange({ currentPage }: { currentPage: number }) {
  props.pagination.pageIndex.value = currentPage
  // 加载数据
  props.loadData()
}
</script>

<script lang="ts">
export default {
  name: 'DataPage'
}
</script>
