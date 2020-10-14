import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import adminindex from "../views/admin/index.vue";
import adminregister from "../views/admin/register.vue";
import admindetailfix from "../views/admin/detailfix.vue";
import adminnotification from "../views/admin/notification.vue";
import adminhistory from "../views/admin/history.vue";
import adminprofile from "../views/admin/profile.vue";
import admindashboard from "../views/admin/dashboard.vue";
import adminsetting from "../views/admin/setting.vue";


//user
import userindex from "../views/user/index.vue";
import userfix from "../views/user/fix.vue";
import userprofileuser from "../views/user/profileuser.vue";
import productuser from "../views/user/product.vue"
import historyuser from "../views/user/historyuser.vue"

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  //admin
  {
    path: "/adminindex",
    name: "admin",
    component: adminindex
  },
  {
    path: "/adminregister",
    name: "admin",
    component: adminregister
  },
  {
    path: "/admindetailfix",
    name: "admin",
    component: admindetailfix
  },
  {
    path: "/adminnotification",
    name: "admin",
    component: adminnotification
  },
  {
    path: "/adminhistory",
    name: "admin",
    component: adminhistory
  },
  {
    path: "/adminprofile",
    name: "admin",
    component: adminprofile
  },
  {
    path: "/admindashboard",
    name: "admin",
    component: admindashboard
  },
  {
    path: "/adminsetting",
    name: "admin",
    component: adminsetting
  },
//user
{
  path: "/userindex",
  name: "user",
  component: userindex
},
{
path: "/userfix",
  name: "user",
  component: userfix
},
{
  path: "/userprofileuser",
    name: "user",
    component: userprofileuser
  },
  {
    path: "/productuser",
      name: "user",
      component: productuser
    },
    {
      path: "/historyuser",
        name: "user",
        component: historyuser
      },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
