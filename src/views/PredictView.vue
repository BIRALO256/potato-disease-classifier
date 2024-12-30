<template>
  <div class="flex justify-center items-center min-h-screen bg-gray-100">
    <div class="bg-green-200 p-6 rounded-lg shadow-lg">
      <h1 class="text-3xl font-bold text-gray-800">Prediction Page</h1>
      <p class="mt-4 text-lg text-gray-600">
        You will be able to make predictions using the Potato Disease Classifier
        soon .....
      </p>

      <!-- Display custom greeting after login -->
      <div v-if="user">
        <p class="mt-4 text-xl text-gray-800">Hello, {{ user.displayName }}!</p>
      </div>

      <!-- Prediction Form / Prediction UI -->
      <div class="mt-6">
        <p class="text-lg">Upload an image to classify:</p>
        <input type="file" @change="handleFileUpload" class="mt-2" />
      </div>

      <!-- Logout Button -->
      <button
        @click="logoutAndRedirect"
        class="mt-6 py-2 px-4 bg-red-500 text-white rounded-lg"
      >
        Logout
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useUserStore } from "../stores/user";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "PredictView",
  setup() {
    const userStore = useUserStore();
    const { user, logout } = userStore;
    const router = useRouter();

    // Check if user is logged in, otherwise redirect to home page
    if (!user) {
      router.push("/"); // Redirect to home if not logged in
    }

    // Handle file upload for prediction (for example, image classification)
    const handleFileUpload = (event: Event) => {
      const fileInput = event.target as HTMLInputElement;
      if (fileInput && fileInput.files) {
        const file = fileInput.files[0];
        // Handle the file for prediction logic here
        console.log(file);
      }
    };

    // Logout function with redirect
    const logoutAndRedirect = async () => {
      await logout(); // Call logout from the store
      router.push("/"); // Redirect to home or login page after logout
    };

    return { user, logoutAndRedirect, handleFileUpload };
  },
});
</script>

<style scoped>
/* Add any scoped styles for the prediction page here */
</style>
