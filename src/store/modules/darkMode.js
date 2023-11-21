import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import {userPrefersDarkMode} from '@/composables'

export const useDarkModeStore = defineStore('darkMode', () => {
  const darkMode = ref(userPrefersDarkMode())
  
  const toggleDarkMode = () => {
    if (document.startViewTransition) {
      document.startViewTransition(() => {
        darkMode.value = !darkMode.value;
      });
    } else {
      darkMode.value = !darkMode.value;
    }
  };
  const isDarkMode = computed(() => darkMode.value)
  return {
    isDarkMode,
    toggleDarkMode
  }
})