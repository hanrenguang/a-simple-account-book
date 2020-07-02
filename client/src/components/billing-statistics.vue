<template>
  <div class="statistics-wrapper">
    收入: <span class="income income-total">￥{{ incomeTotal }}</span>
    支出: <span class="expense expense-total">￥{{ expenseTotal }}</span>
    合计: <span class="total">￥{{ total }}</span>
  </div>
</template>

<script>
export default {
  name: 'BillingStatistics',
  props: {
    dateRange: {
      type: Array,
      default: () => [],
      comment: '当前选择的日期范围，默认为全部日期',
    },
  },
  computed: {
    incomeTotal() {
      return 100;
    },
    expenseTotal() {
      return 100;
    },
    total() {
      return this.incomeTotal - this.expenseTotal;
    },
  },
};
</script>

<style scoped lang="scss">
</style>
