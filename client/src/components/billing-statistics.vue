<template>
  <div class="statistics-wrapper">
    收入: <span class="positive income-total">￥{{ incomeTotal | amountFilter }}</span>
    支出: <span class="negative expense-total">￥{{ expenseTotal }}</span>
    合计: <span :class="totalClassObj" class="total">￥{{ total | amountFilter }}</span>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'BillingStatistics',
  data() {
    return {
      incomeTotal: 0,
      expenseTotal: 0,
    };
  },
  computed: {
    ...mapState([
      'monthRange',
      'createBillToggle',
    ]),
    total() {
      return (this.incomeTotal * 100 + this.expenseTotal * 100) / 100;
    },
    totalClassObj() {
      return {
        positive: this.total > 0,
        negative: this.total < 0,
      };
    },
  },
  filters: {
    amountFilter(value) {
      return value > 0 ? `+${value}` : value;
    },
  },
  watch: {
    monthRange() {
      this.queryTotalAmount();
    },
    createBillToggle() {
      this.queryTotalAmount();
    },
  },
  methods: {
    async queryTotalAmount() {
      const startTime = this.monthRange[0] ? this.monthRange[0].getTime() : null;
      const endTime = this.monthRange[1] ? this.monthRange[1].getTime() : null;
      const params = { startTime, endTime };
      const { data } = await this.$api.bill.queryTotalAmount(params);
      this.incomeTotal = data.incomeTotal;
      this.expenseTotal = data.expenseTotal;
    },
  },
  created() {
    this.queryTotalAmount();
  },
};
</script>

<style scoped lang="scss">
.statistics-wrapper span {
  margin-right: 20px;
}
</style>
