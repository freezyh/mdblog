<script setup lang="ts">
import { onMounted, ref } from "vue";

const targetNumber = 9435352341;
const displayNumber = ref(0);
const duration = 5000; // Increased to 5 seconds for a smoother climb

function animateNumber() {
  const startTime = Date.now();

  const step = () => {
    const now = Date.now();
    const progress = Math.min((now - startTime) / duration, 1);

    // Smoother easing: easeOutQuart
    const easedProgress = 1 - (1 - progress) ** 4;

    displayNumber.value = Math.floor(easedProgress * targetNumber);

    if (progress < 1) {
      requestAnimationFrame(step);
    }
  };

  requestAnimationFrame(step);
}

onMounted(() => {
  animateNumber();
});

function formatNumber(num: number) {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
</script>

<template>
  <div class="min-h-screen bg-slate-50 flex items-center justify-center font-sans selection:bg-blue-100 overflow-hidden relative">
    <!-- Digital Background Layer -->
    <div
      class="absolute inset-0 z-0 pointer-events-none opacity-[0.03]"
      style="background-image: radial-gradient(#0066ff 1px, transparent 1px); background-size: 30px 30px;"
    />

    <!-- Scanning Line Animation -->
    <div class="absolute inset-0 pointer-events-none z-10 overflow-hidden">
      <div class="w-full h-[30vh] bg-gradient-to-b from-blue-400/0 via-blue-400/10 to-transparent absolute top-[-30vh] left-0 animate-scan" />
    </div>

    <div class="max-w-5xl w-full px-6 text-center z-20 relative">
      <!-- Tech Metadata -->
      <div class="flex justify-between items-center mb-12 text-[10px] font-mono text-slate-400 tracking-tighter uppercase sm:px-4">
        <div class="flex gap-4">
          <span>LOC: 39.9042° N</span>
          <span class="hidden sm:inline">NODE_ID: 0xFF9431</span>
        </div>
        <div class="flex gap-4">
          <span class="hidden sm:inline">TX_SPEED: 1.2 GB/S</span>
          <span class="animate-pulse text-blue-500 uppercase">Secure_Link</span>
        </div>
      </div>

      <!-- Header Section -->
      <div class="mb-10">
        <div class="inline-flex items-center gap-2 px-3 py-1 rounded-sm border border-blue-100 bg-blue-50/50 text-blue-600 text-[10px] font-bold tracking-[0.2em] uppercase mb-6">
          <div class="w-1 h-1 bg-blue-600 rounded-full animate-ping" />
          Digital Asset Quantum Stream
        </div>
        <h1 class="text-slate-400 text-sm font-normal tracking-[0.3em] uppercase">
          Real-Time Validation Engine
        </h1>
      </div>

      <!-- Main Counter with Tech Frame -->
      <div class="relative py-16 px-6 group flex justify-center items-center">
        <!-- Corner Brackets -->
        <div class="absolute top-0 left-0 w-8 h-8 border-t border-l border-blue-200 transition-all group-hover:w-12 group-hover:h-12 group-hover:border-blue-400" />
        <div class="absolute top-0 right-0 w-8 h-8 border-t border-r border-blue-200 transition-all group-hover:w-12 group-hover:h-12 group-hover:border-blue-400" />
        <div class="absolute bottom-0 left-0 w-8 h-8 border-b border-l border-blue-200 transition-all group-hover:w-12 group-hover:h-12 group-hover:border-blue-400" />
        <div class="absolute bottom-0 right-0 w-8 h-8 border-b border-r border-blue-200 transition-all group-hover:w-12 group-hover:h-12 group-hover:border-blue-400" />

        <div class="text-5xl sm:text-7xl md:text-8xl lg:text-[8rem] font-extralight tracking-tighter text-slate-800 tabular-nums relative z-10 leading-none py-4">
          {{ formatNumber(displayNumber) }}
        </div>

        <!-- Decoration bits -->
        <div class="absolute -top-2 left-1/2 -translate-x-1/2 flex gap-1">
          <div v-for="i in 3" :key="i" class="w-1 h-[2px] bg-blue-200" />
        </div>
      </div>

      <!-- Interaction Section -->
      <div class="mt-16 flex flex-col items-center gap-8">
        <div class="flex items-center gap-6">
          <div class="flex flex-col items-center">
            <span class="text-[9px] font-mono text-slate-400 mb-1 uppercase tracking-widest">Signal Status</span>
            <div class="flex gap-1">
              <div v-for="i in 5" :key="i" class="w-3 h-1 rounded-[1px]" :class="[i < 4 ? 'bg-emerald-400' : 'bg-slate-200']" />
            </div>
          </div>
          <div class="w-[1px] h-8 bg-slate-200" />
          <div class="flex flex-col items-center">
            <span class="text-[9px] font-mono text-slate-400 mb-1 uppercase tracking-widest">Protocol</span>
            <span class="text-xs font-bold text-slate-600">ST-256V</span>
          </div>
        </div>

        <button
          class="group relative overflow-hidden bg-slate-900 text-white px-10 py-3 rounded-sm transition-all hover:bg-blue-600 hover:shadow-xl hover:shadow-blue-200 active:scale-95"
          @click="animateNumber"
        >
          <span class="relative z-10 text-[10px] font-bold tracking-[0.2em] uppercase">Execute Recalibration</span>
          <div class="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Inter:wght@100;300;400;700&family=JetBrains+Mono:wght@400;700&display=swap");

.font-sans {
  font-family:
    "Inter",
    -apple-system,
    sans-serif;
}

.font-mono {
  font-family: "JetBrains Mono", monospace;
}

.tabular-nums {
  font-variant-numeric: tabular-nums;
  letter-spacing: -0.02em;
}

@keyframes scan {
  from {
    top: -30vh;
  }
  to {
    top: 100vh;
  }
}

.animate-scan {
  animation: scan 4s linear infinite;
}

.font-extralight {
  font-weight: 100;
}
</style>
