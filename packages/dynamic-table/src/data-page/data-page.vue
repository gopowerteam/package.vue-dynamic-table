<template>
  <vxe-pager
    v-model:current-page="pagination.pageIndex"
    v-model:page-size="pagination.pageSize"
    perfect
    :total="pagination.total"
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

function onPageChange({ currentPage }: { currentPage: number }) {
  props.pagination.pageIndex = currentPage
  // 加载数据
  props.loadData()
}
</script>

<script lang="ts">
export default {
  name: 'DataPage'
}
</script>
