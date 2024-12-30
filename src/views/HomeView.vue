<template>
  <div class="flex justify-center items-center min-h-screen bg-gray-100">
    <div class="bg-yellow-200 p-6 rounded-lg shadow-lg">
      <h1 class="text-3xl font-bold text-gray-800">Hello, Welcome!</h1>
      <p class="mt-4 text-lg text-gray-600">
        Welcome to the Potato Disease Classifier App. Please sign in to get
        started.
      </p>

      <!-- Google Login Button -->
      <button
        v-if="!user && !loading"
        @click="googleLogin"
        class="mt-6 py-2 px-4 bg-blue-500 text-white rounded-lg"
      >
        Sign in with Google
      </button>

      <!-- Loading Indicator -->
      <div v-if="loading" class="mt-6 text-lg text-gray-600">Loading...</div>

      <!-- Error Message -->
      <div v-if="error" class="mt-4 text-red-500">
        {{ error }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useUserStore } from "../stores/user";
import { useRouter } from "vue-router"; // Import Vue Router

export default defineComponent({
  name: "HomeView",
  setup() {
    const userStore = useUserStore();
    const { user, loading, error, googleLogin, trackAuthState } = userStore;
    const router = useRouter(); // Initialize Vue Router

    // Start tracking authentication state when the component is mounted
    trackAuthState();

    // Handle Google Login and redirect to predict page
    const googleLoginWithRedirect = async () => {
      await googleLogin();

      // After successful login, redirect to the predict page
      router.push("/predict");
    };

    return { user, loading, error, googleLogin: googleLoginWithRedirect };
  },
});
</script>

<style scoped>
/* Add any scoped styles here if needed */
</style>
