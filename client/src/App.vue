<template>
  <div id="app">
    <p class="title">
      历史账单
      <span class="date-range">
        （{{ dateRange }}）
      </span>
    </p>
    <billing-statistics></billing-statistics>
    <billing-list></billing-list>
    <add-bill></add-bill>
  </div>
</template>

<script>
import BillingStatistics from './components/billing-statistics.vue';
import BillingList from './components/billing-list.vue';
import AddBill from './components/add-bill.vue';

export default {
  name: 'App',
  components: {
    BillingStatistics,
    BillingList,
    AddBill,
  },
  data() {
    return {};
  },
  computed: {
    dateRange() {
      return '2020.01 - 2020.06';
    },
  },
};
</script>

<style scoped lang="scss">
@import "style/variable.scss";
#app {
  width: $page-width;
  margin: $page-margin-top auto 0;
  color: $color-gray;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  .title {
    padding-bottom: 20px;
    font-size: 18px;
    font-weight: 500;
    color: $color-dark;
  }
}
</style>
