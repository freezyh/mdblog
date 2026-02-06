<script setup lang="ts">
import { nextTick, ref, watch } from "vue";

const props = defineProps<{
  value: string;
}>();

const displayValue = ref(Number.parseInt(props.value));
const isTransitioning = ref(true);

watch(() => props.value, (newVal, oldVal) => {
  if (oldVal === undefined)
    return;

  const nextVal = Number.parseInt(newVal);
  const prevVal = Number.parseInt(oldVal);

  if (nextVal === 0 && prevVal === 9) {
    // 9 -> 0: Roll to index 10 (the extra 0)
    displayValue.value = 10;

    setTimeout(() => {
      isTransitioning.value = false;
      displayValue.value = 0;

      // Wait for DOM update, then re-enable transition
      nextTick(() => {
        // Need a double requestAnimationFrame or a small timeout to ensure browser has processed the jump
        setTimeout(() => {
          isTransitioning.value = true;
        }, 20);
      });
    }, 700);
  }
  else if (nextVal < prevVal && !(nextVal === 0 && prevVal === 9)) {
    // This handles cases where a digit decreases (e.g. 59 -> 00 results in tens digit 5 -> 0)
    // For clock, usually most change is 9->0.
    // If it's a "backwards" change that's not 9->0, we just snap it to avoid weird reverse rolling.
    isTransitioning.value = false;
    displayValue.value = nextVal;
    nextTick(() => {
      setTimeout(() => {
        isTransitioning.value = true;
      }, 20);
    });
  }
  else {
    displayValue.value = nextVal;
  }
}, { immediate: true });
</script>

<template>
  <div class="relative w-12 h-20 md:w-20 md:h-32 overflow-hidden bg-black/40 rounded-lg border border-white/5 font-mono">
    <div
      class="absolute inset-x-0 top-0 flex flex-col"
      :class="{ 'transition-transform duration-700 ease-in-out': isTransitioning }"
      :style="{ transform: `translateY(-${displayValue * (100 / 11)}%)`, height: '1100%' }"
    >
      <!-- Render 0-9 and an extra 0 -->
      <div v-for="n in 11" :key="n - 1" class="h-[9.0909%] flex-shrink-0 flex items-center justify-center text-5xl md:text-7xl font-light text-white leading-none">
        {{ (n - 1) % 10 }}
      </div>
    </div>
    <!-- Glass Shading -->
    <div class="absolute inset-0 pointer-events-none bg-gradient-to-b from-black/60 via-transparent to-black/60" />
  </div>
</template>

<style scoped>
.text-white {
  text-shadow: 0 0 20px rgba(59, 130, 246, 0.4);
}
</style>
