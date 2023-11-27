<template>
  <div class="cb-selector">
    <ul>
      <li
        v-for="option in options"
        :key="option"
        @click="$emit('selected', option)"
      >
        {{ option  }}
      </li>
    </ul>
  </div>
</template>

<script setup>
const options = [
  'linear', 'ease', 'easeIn', 'easeOut', 'easeInOut', 'materialEasing'
]
</script>

<style scoped>
.cb-selector ul {
  list-style: none;
  padding: .5rem;
  margin: 0;
}

.cb-selector li {
  border: 1px solid var(--color-border-default);
  padding: 3px 9px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 120ms ease;
}

.cb-selector li:hover {
  background-color: hsl(from var(--color-background-secondary) h s l / 0.3);
}
.cb-selector li:active {
  background-color: lch(from var(--color-accent) calc(l - 20) calc(c / 2) h / 0.3);
}
.cb-selector ul {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 5px;
}
</style>