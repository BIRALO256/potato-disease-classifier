import { defineStore } from "pinia";
import { ref } from "vue";
import { auth, googleProvider } from "../firebase";
import { signInWithPopup } from "firebase/auth";

// Type definition for user
interface User {
  uid: string;
  displayName: string | null;
  email: string | null;
  photoURL: string | null;
  emailVerified: boolean;
}

export const useUserStore = defineStore("user", () => {
  const user = ref<User | null>(null);
  const loading = ref<boolean>(false);
  const error = ref<string | null>(null);

  // Check local storage for user data on page load
  const checkLocalStorage = () => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      user.value = JSON.parse(storedUser);
    }
  };

  // Method to set user and save to localStorage
  const setUser = (loggedInUser: User | null) => {
    user.value = loggedInUser;
    if (loggedInUser) {
      localStorage.setItem("user", JSON.stringify(loggedInUser));
    } else {
      localStorage.removeItem("user");
    }
  };

  // Method to clear user and localStorage
  const clearUser = () => {
    user.value = null;
    localStorage.removeItem("user");
  };

  // Handle Google login
  const googleLogin = async () => {
    loading.value = true;
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const loggedInUser = result.user;
      setUser({
        uid: loggedInUser.uid,
        displayName: loggedInUser.displayName,
        email: loggedInUser.email,
        photoURL: loggedInUser.photoURL,
        emailVerified: loggedInUser.emailVerified,
      });
    } catch (err: unknown) {
      // Type guard to ensure err is an instance of Error
      if (err instanceof Error) {
        error.value = "Error during Google login: " + err.message;
        console.error(err);
      } else {
        error.value = "An unknown error occurred during Google login.";
        console.error("Unknown error", err);
      }
    } finally {
      loading.value = false;
    }
  };

  // Logout function
  const logout = async () => {
    loading.value = true;
    try {
      await auth.signOut();
      clearUser();
    } catch (err: unknown) {
      // Type guard to ensure err is an instance of Error
      if (err instanceof Error) {
        error.value = "Error during logout: " + err.message;
        console.error(err);
      } else {
        error.value = "An unknown error occurred during logout.";
        console.error("Unknown error", err);
      }
    } finally {
      loading.value = false;
    }
  };

  // Track authentication state
  const trackAuthState = () => {
    auth.onAuthStateChanged((loggedInUser) => {
      if (loggedInUser) {
        setUser({
          uid: loggedInUser.uid,
          displayName: loggedInUser.displayName,
          email: loggedInUser.email,
          photoURL: loggedInUser.photoURL,
          emailVerified: loggedInUser.emailVerified,
        });
      } else {
        clearUser();
      }
    });
  };

  // Initialize the store with localStorage data
  checkLocalStorage();

  return {
    user,
    loading,
    error,
    googleLogin,
    logout,
    trackAuthState,
  };
});
