<script setup lang="ts">
import { onMounted, onUnmounted, ref } from "vue";
import RollingDigit from "~/components/RollingDigit.vue";

const isMounted = ref(false);
const time = ref(new Date());
let timer: any = null;

function updateTime() {
  time.value = new Date();
}

onMounted(() => {
  isMounted.value = true;
  timer = setInterval(updateTime, 1000);
});

onUnmounted(() => {
  if (timer)
    clearInterval(timer);
});

// Helper to get individual digits
function getDigits() {
  // During SSR or before mount, return a static initial state to avoid mismatch
  // However, isMounted is false on server, so it returns 00:00:00
  if (!isMounted.value)
    return ["0", "0", ":", "0", "0", ":", "0", "0"];

  const now = time.value;
  const h = now.getHours().toString().padStart(2, "0");
  const m = now.getMinutes().toString().padStart(2, "0");
  const s = now.getSeconds().toString().padStart(2, "0");
  return [...h, ":", ...m, ":", ...s];
}
</script>

<template>
  <div class="min-h-screen bg-[#0a0a0c] flex items-center justify-center font-mono selection:bg-blue-500/30 overflow-hidden relative">
    <!-- Digital Grid Background -->
    <div
      class="absolute inset-0 z-0 pointer-events-none opacity-20"
      style="background-image: linear-gradient(#1e1e24 1px, transparent 1px), linear-gradient(90deg, #1e1e24 1px, transparent 1px); background-size: 40px 40px;"
    />

    <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-[120px] pointer-events-none" />

    <div class="relative z-10 flex flex-col items-center">
      <div class="mb-12 flex items-center gap-4 text-[10px] tracking-[0.4em] text-blue-500/60 uppercase">
        <span class="animate-pulse">●</span>
        <span>Temporal Synchronization Active</span>
        <span class="animate-pulse">●</span>
      </div>

      <!-- Clock Container -->
      <div class="flex items-center gap-1 md:gap-3 p-6 md:p-8 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl">
        <template v-for="(char, index) in getDigits()" :key="index">
          <!-- Separator -->
          <div v-if="char === ':'" class="h-20 md:h-32 flex items-center justify-center text-5xl md:text-7xl font-light text-blue-500/50 px-1 md:px-2">
            :
          </div>
          <!-- Rolling Digit Slot -->
          <RollingDigit v-else :value="char" />
        </template>
      </div>

      <div class="mt-16 grid grid-cols-3 gap-12 text-center text-[9px] font-mono text-slate-500 tracking-widest uppercase">
        <div class="flex flex-col gap-2 h-auto">
          <span>System_Uptime</span>
          <span class="text-slate-300">99.982%</span>
        </div>
        <div class="flex flex-col gap-2 h-auto">
          <span>Data_Stream</span>
          <span class="text-blue-400">Stable</span>
        </div>
        <div class="flex flex-col gap-2 h-auto">
          <span>Zone</span>
          <span class="text-slate-300">UTC+8</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@100;300;400&display=swap");

.font-mono {
  font-family: "JetBrains Mono", monospace;
}

.text-white {
  text-shadow: 0 0 20px rgba(59, 130, 246, 0.4);
}
</style>
