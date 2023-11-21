<template>
  <Transition :css="false" @enter="onEnter" @leave="onLeave">
    <slot />
  </Transition>
</template>

<script setup>
import fancyInOut from "@/fancyInOut.js";
import { onMounted, onUpdated } from "vue";

const props = defineProps({
  x: {
    type: String,
    required: false,
  },
  y: {
    type: String,
    required: false,
  },
  angle: {
    type: Number,
    required: false,
  },
  duration: {
    type: Number,
    required: false,
    default: 400,
  },
  initialScale: {
    type: Number,
    required: false,
    default: 0.3,
    validator: (value) => value >= 0 && value <= 1,
  },
  initialOpacity: {
    type: Number,
    required: false,
    default: 0.1,
    validator: (value) => value >= 0 && value <= 1,
  },
  cubicBezier: {
    type: [String, Array],
    required: false,
  },
});

let enter = null;
let leave = null;

onMounted(() => {
  setupCurves();
});
onUpdated(() => {
  setupCurves();
});

const setupCurves = async () => {
  const { triggerEnter, triggerLeave } = await fancyInOut(props);
  enter = triggerEnter;
  leave = triggerLeave;
};
const onEnter = async (el, done) => {
  enter?.(el, () => {
    done();
  });
};
const onLeave = (el, done) => {
  leave?.(el, () => {
    done();
  });
};
</script>
