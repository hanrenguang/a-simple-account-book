<template>
  <div class="billing-list">
    <el-date-picker
      class="month-picker"
      :clearable="false"
      v-model="dateRange"
      type="monthrange"
      range-separator="至"
      start-placeholder="开始月份"
      end-placeholder="结束月份">
    </el-date-picker>
    <el-table
      class="billing-table"
      :data="billingList"
      border>
      <el-table-column
        prop="createdAt"
        label="日期">
        <template slot-scope="scope">
          <span>{{ scope.row.createdAt | formatDateFilter }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="category"
        label="分类">
      </el-table-column>
      <el-table-column
        prop="amount"
        label="金额 / ￥"
        width="220">
        <template slot-scope="scope">
          <span :class="{
            positive: scope.row.amount > 0,
            negative: scope.row.amount < 0,
          }">
            {{ scope.row.amount | amountFilter }}
          </span>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      class="pagination"
      background
      :page-size="pageSize"
      :current-page.sync="pageNum"
      layout="prev, pager, next"
      :total="pageTotal"
      @current-change="handlePageChange">
    </el-pagination>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import formatDate from '@/helper/formatDate';

export default {
  name: 'BillingList',
  props: {},
  data() {
    return {
      dateRange: [],
      billingList: [],
      pageTotal: 0,
      pageNum: 1,
      pageSize: 10,
    };
  },
  computed: {
    ...mapState([
      'monthRange',
      'createBillToggle',
    ]),
  },
  filters: {
    formatDateFilter(date) {
      return formatDate(date, 'YYYY-MM-DD');
    },
    amountFilter(amount) {
      return amount > 0 ? `+${amount}` : amount;
    },
  },
  watch: {
    createBillToggle() {
      this.queryBillingList();
    },
    dateRange() {
      this.$store.commit('changeMonthRange', this.dateRange);
      this.handleResetParams();
      this.queryBillingList();
    },
  },
  methods: {
    handlePageChange() {
      this.queryBillingList();
    },
    handleResetParams() {
      this.pageNum = 1;
    },
    handleBillingList(originBillingList = []) {
      const billingList = [];
      originBillingList.forEach((bill) => {
        const {
          category_name: category, amount, createdAt, type,
        } = bill;
        billingList.push({
          category, amount: type === 0 ? -amount : amount, createdAt, type,
        });
      });
      return billingList;
    },
    async queryBillingList() {
      const startTime = this.monthRange[0] ? this.monthRange[0].getTime() : null;
      const endTime = this.monthRange[1] ? this.monthRange[1].getTime() : null;
      const params = {
        pageNum: this.pageNum,
        pageSize: this.pageSize,
        startTime,
        endTime,
      };
      const { data } = await this.$api.bill.queryBillingList(params);
      const billingList = this.handleBillingList(data.billingList);
      this.billingList = billingList;
      this.pageTotal = data.count;
    },
  },
  created() {
    this.queryBillingList();
  },
};
</script>

<style scoped lang="scss">
@import "style/variable.scss";

.billing-list {
  margin-top: 20px;
  .month-picker {
    width: 390px;
  }
  .billing-table {
    margin-top: 15px;
    background-color: $background-color-table;
  }
  .pagination {
    float: right;
    margin-top: 15px;
  }
}
</style>
