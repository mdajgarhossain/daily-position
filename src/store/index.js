import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    cashData: [],
    incomeData: [],
  },
  mutations: {
    storeCashData: (state, payload) => {
      state.cashData.push(payload);
    },
    storeIncomeData: (state, payload) => {
      state.incomeData.push(payload);
      console.log(payload, state.incomeData);
    },
  },
  actions: {
    storeCashData: (context, payload) => {
      context.commit("storeCashData", payload);
    },
    storeIncomeData: (context, payload) => {
      context.commit("storeIncomeData", payload);
    },
  },
  modules: {},
});
