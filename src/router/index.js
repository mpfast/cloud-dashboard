import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "index",
      component: require("@/pages/Index").default
    },
    {
      path: "/about",
      name: "about",
      component: require("@/pages/About").default
    },
    {
      path: "/gitee",
      name: "gitee",
      component: require("@/pages/Gitee").default
    },
    {
      path: "/login",
      name: "login",
      component: require("@/pages/Login").default
    },
    {
      path: "*",
      redirect: "/"
    }
  ]
});
