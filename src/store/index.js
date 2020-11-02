import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    cashData: [],
    incomeData: [],
    expenseData: [],
  },
  mutations: {
    storeCashData: (state, payload) => {
      state.cashData.push(payload);
    },
    storeIncomeData: (state, payload) => {
      state.incomeData.push(payload);
    },
    storeExpenseData: (state, payload) => {
      state.expenseData.push(payload);
      console.log("store data", payload, state.expenseData);
    },
  },
  actions: {
    storeCashData: (context, payload) => {
      context.commit("storeCashData", payload);
    },
    storeIncomeData: (context, payload) => {
      context.commit("storeIncomeData", payload);
    },
    storeExpenseData: (context, payload) => {
      context.commit("storeExpenseData", payload);
    },
  },
  modules: {},
});
