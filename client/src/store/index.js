const store = {
  state: {
    monthRange: [],
    createBillToggle: 0,
  },
  mutations: {
    changeMonthRange(state, newVal) {
      state.monthRange = newVal;
    },
    createBill(state) {
      state.createBillToggle = (state.createBillToggle + 1) % 2;
    },
  },
};

export default store;
