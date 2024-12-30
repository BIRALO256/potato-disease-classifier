import { createRouter, createWebHistory } from "vue-router";
import { useUserStore } from "../stores/user"; // Import the Pinia store
import HomeView from "../views/HomeView.vue";
import PredictView from "../views/PredictView.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/predict",
    name: "predict",
    component: PredictView,
  },
  // Add other routes that don't require authentication here...
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

// Global route guard to check authentication before each route navigation
router.beforeEach((to, from, next) => {
  const userStore = useUserStore();

  // Check if the user is authenticated and if the route requires authentication
  if (to.meta.requiresAuth && !userStore.user) {
    // Redirect to the login page if not authenticated
    next({ name: "home" });
  } else {
    // Proceed with the navigation if authenticated or route does not require auth
    next();
  }
});

export default router;
