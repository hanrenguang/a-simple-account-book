import { shallowMount, createLocalVue } from '@vue/test-utils'
import BillingStatistics from '@/components/billing-statistics.vue';
import Vuex from 'vuex';
import store from '@/store/index';

const localVue = createLocalVue();
localVue.use(Vuex);
const storeInstance = new Vuex.Store(store);

const wrapper = shallowMount(BillingStatistics, {
  store: storeInstance,
  localVue,
  data() {
    return {
      incomeTotal: 1000,
      expenseTotal: -800,
    };
  },
});

describe('BillingStatistics.vue', () => {
  it('sets the correct computed prop', () => {
    expect(wrapper.vm.total).toBe(200);
  });

  it('renders the corrent income total', () => {
    expect(wrapper.get('.income-total').text()).toBe('￥+1000');
  });

  it('renders the corrent expense total', () => {
    expect(wrapper.get('.expense-total').text()).toBe('￥-800');
  });

  it('renders the corrent total', () => {
    expect(wrapper.get('.total').text()).toBe('￥+200');
  });
});
