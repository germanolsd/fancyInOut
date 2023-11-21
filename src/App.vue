<template>
  <div class="app" :class="{ 'dark-mode': store.isDarkMode }">
    <Navbar />
    <Demo />
  </div>
</template>

<script setup>
import { useDarkModeStore } from "@/store/modules/darkMode";
import Navbar from "@/components/Navbar.vue";
import Demo from "@/components/Demo.vue";

const store = useDarkModeStore();
</script>

<style scoped>
.app {
  background-color: var(--color-background-primary);
  color: var(--color-text-primary);
  transition: background-color 0.3s ease;
  width: 100vw;
  height: 100vh;
  display: grid;
  grid-template-rows: 60px 1fr;
}
</style>

<style>
/* css variables for pastel color system */
html,
body {
  margin: 0;
  padding: 0;
}
* {
  box-sizing: border-box;
}
:root {
  /* use system fonts */
  font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    Ubuntu, "Helvetica Neue", sans-serif;
  --color-accent: hsl(34, 100%, 50%);
  --color-accent-lighter: hsl(34, 100%, 70%);
  --color-accent-darker: hsl(34, 100%, 30%);

  --color-text-primary: hsl(227, 18%, 20%);
  --color-text-secondary: hsl(227, 18%, 37%);
  --color-background-primary: hsl(0, 0%, 100%);
  --color-background-secondary: hsl(0, 7%, 86%);
  --color-text-muted: hsl(227, 18%, 65%);
  --color-text-disabled: hsl(0, 0%, 85%);
  --color-background-disabled: hsl(0, 0%, 96%);
  --color-border-default: hsl(0, 0%, 89%);
  --color-border-disabled: hsl(0, 0%, 96%);
  --color-background-accent: hsla(34, 100%, 50%, 0.1);
  --subtle-drop-shadow: 0 1px 2px hsla(0, 0%, 0%, 0.5);
}

.dark-mode {
  --color-text-primary: hsl(0, 0%, 100%);
  --color-text-secondary: hsl(0, 0%, 85%);
  --color-background-primary: hsl(227, 18%, 20%);
  --color-background-secondary: hsl(227, 18%, 37%);
  --color-text-muted: hsl(0, 0%, 85%);
  --color-background-disabled: hsl(0, 0%, 20%);
  --color-border-default: hsl(0, 0%, 20%);
  --color-border-disabled: hsl(0, 0%, 20%);
}

input {
  background-color: var(--color-background-primary);
  color: var(--color-text-primary);
  border: 1px solid var(--color-background-secondary);
}

button {
  background-color: var(--color-accent);
  border: 2px solid var(--color-accent-darker);
  color: var(--color-text-primary);
  padding: 10px 20px;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease, border-color 0.3s ease;
  font-weight: bold;
}
button:hover {
  background-color: var(--color-accent-lighter);
}
button:active {
  background-color: var(--color-accent-darker);
}
</style>
