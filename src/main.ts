import { createApp } from "vue";
import App from "./App.vue";
import "./assets/styles.css";
import { createPinia } from "pinia"; // Import createPinia
import router from "./router";

// Create the Vue app and use Pinia and Router
const app = createApp(App);

// Use Pinia for state management
app.use(createPinia());

// Use Vue Router
app.use(router);

// Mount the app to the DOM
app.mount("#app");
