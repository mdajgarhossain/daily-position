import Vue from "vue";
import VueRouter from "vue-router";
import CashPosition from "../views/CashPosition.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "CashPosition",
    component: CashPosition,
  },
  {
    path: "/income",
    name: "DailyIncome",
    component: () => import("../views/DailyIncome.vue"),
  },
  {
    path: "/expense",
    name: "DailyExpense",
    component: () => import("../views/DailyExpense.vue"),
  },
  // {
  //   path: "/about",
  //   name: "About",
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () =>
  //     import(/* webpackChunkName: "about" */ "../views/About.vue"),
  // },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
