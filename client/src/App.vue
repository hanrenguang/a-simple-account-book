<template>
  <div id="app">
    <add-bill></add-bill>
    <div class="history-bill-list-wrapper">
      <p class="title">历史账单</p>
      <billing-statistics></billing-statistics>
      <billing-list></billing-list>
    </div>
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
};
</script>

<style scoped lang="scss">
@import "style/variable.scss";
#app {
  width: $page-width;
  margin: $page-margin-top auto 0;
  color: $color-gray;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  .history-bill-list-wrapper {
    padding: $page-padding;
    background-color: $background-color-white;
    overflow: hidden;
  }
  .title {
    padding-bottom: 25px;
    font-size: 18px;
    font-weight: 500;
    color: $color-dark;
  }
}
</style>
