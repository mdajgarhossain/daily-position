import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    allCashData: [],
  },
  mutations: {
    storeCashData: (state, payload) => {
      state.allCashData.push(payload);
      console.log(payload, state.allCashData);
    },
  },
  actions: {
    storeCashData: (context, payload) => {
      context.commit("storeCashData", payload);
    },
  },
  modules: {},
});
