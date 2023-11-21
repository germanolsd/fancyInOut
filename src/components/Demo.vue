<template>
  <div class="wrapper">
    <div class="header">
      <button @click="toggle">Toggle element in and out</button>
    </div>
    <div class="body">
      <div class="inputs">
        <label for="x">X</label>
        <input id="x" type="text" v-model="x" />
        <label for="y">Y</label>
        <input id="y" type="text" v-model="y" />
        <label for="angle">Angle</label>
        <input id="angle" type="number" v-model="angle" />
        <label for="cubicBezier">Cubic Bezier</label>
        <input id="cubicBezier" type="text" v-model="cubicBezier" />
        <label for="opacity">Opacity</label>
        <input
          id="opacity"
          type="number"
          v-model="initialOpacity"
          min="0"
          max="1"
          step="0.1"
        />
        <label for="scale">Scale</label>
        <input
          id="scale"
          type="number"
          v-model="initialScale"
          min="0"
          max="1"
          step="0.1"
        />
        <label for="duration">Duration</label>
        <input id="duration" type="number" v-model="duration" />
      </div>
      <FancyInOut
        :x="x"
        :y="y"
        :angle="Number(angle)"
        :cubicBezier="cubicBezier"
        :initialOpacity="initialOpacity"
        :initialScale="initialScale"
        :duration="duration"
      >
        <div v-if="showEl" class="round"></div>
      </FancyInOut>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import FancyInOut from "@/components/FancyInOut.vue";

const x = ref("150px");
const y = ref("150px");
const angle = ref(30);
const cubicBezier = ref([0.64, 0.06, 0.48, 1.48]);
const initialOpacity = ref(0.1);
const initialScale = ref(0.3);
const duration = ref(400);

const showEl = ref(false);

const toggle = () => {
  showEl.value = !showEl.value;
};
</script>

<style scoped>
.wrapper {
  width: 100%;
  height: 100%;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: center;
}
.header {
  flex-grow: 0;
  flex-shrink: 0;
}
.body {
  flex-grow: 1;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-direction: column;
}
.round {
  height: 10vh;
  aspect-ratio: 1/1;
  border-radius: 50%;
  background-color: var(--color-accent);

  filter: drop-shadow(var(--subtle-drop-shadow));
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.inputs {
  display: grid;
  grid-template-columns: max-content 1fr;
  column-gap: 1rem;
  margin-bottom: 2rem;
}
label {
  text-align: right;
}
label:after {
  content: ":";
}
</style>
