// Composables
import { createRouter, createWebHistory } from "vue-router";
import { Auth } from "@/services/firebase";

const routes = [
  {
    path: "/",
    component: () => import("@/layouts/default/Default.vue"),
    children: [
      {
        path: "",
        name: "home",
        component: () => import("@/views/Home.vue"),
      },
      {
        path: "login",
        name: "login",
        component: () => import("@/views/Login.vue"),
      },
      {
        path: "new",
        name: "new",
        component: () => import("@/views/New.vue"),
        meta: { requiresAuth: true },
      },
      {
        path: "tests",
        name: "tests",
        component: () => import("@/views/Tests.vue"),
        meta: { requiresAuth: true },
      },
      {
        path: "test/:id",
        name: "update",
        component: () => import("@/views/Update.vue"),
        meta: { requiresAuth: true },
      },
      {
        path: "/:pathMatch(.*)*",
        name: "notFound",
        component: () => import("@/views/NotFound.vue"),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach(async (to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    const isAuthenticated = await Auth.isAuthenticated();

    if (!isAuthenticated) {
      next({
        name: "login",
        query: { redirect: to.fullPath },
      });
      return;
    }
  }

  next();
});

export default router;
