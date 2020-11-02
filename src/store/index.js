import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    cashData: [],
  },
  mutations: {
    storeCashData: (state, payload) => {
      state.cashData.push(payload);
      console.log(payload, state.cashData);
    },
  },
  actions: {
    storeCashData: (context, payload) => {
      context.commit("storeCashData", payload);
    },
  },
  modules: {},
});
