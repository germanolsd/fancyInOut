<template>
  <div class="navbar">
    <button @click="store.toggleDarkMode">
      {{ store.isDarkMode ? "Light" : "Dark" }} Mode
    </button>
  </div>
</template>

<script setup>
import { useDarkModeStore } from "@/store/modules/darkMode";

const store = useDarkModeStore();
</script>

<style scoped>
.navbar {
  padding: 0.5rem 1rem;
  height: 60px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  background-color: var(--color-background-secondary);
  filter: drop-shadow(var(--subtle-drop-shadow));
}

.navbar button {
  margin-right: 10px;
}
</style>
