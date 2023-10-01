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
        meta: { requiresAuth: true },
      },
      {
        path: "login",
        name: "login",
        component: () => import("@/views/Login.vue"),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

// Add a global navigation guard to check authentication status
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
