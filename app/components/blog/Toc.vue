<script setup lang="ts">
defineProps<{
  links: Array<{ id: string; text: string }>;
  activeId?: string;
}>();

const { scrollToId } = useAnchorScroll();

function onClick(id: string) {
  // 手动滚动以适配 #__nuxt 容器滚动模式；成功后同步 URL
  if (scrollToId(id, "smooth")) {
    history.replaceState(null, "", `${location.pathname}#${id}`);
  }
}
</script>

<template>
  <div
    v-if="links && links.length > 0"
    class="fixed top-28 right-[max(2rem,calc((100vw-680px)/2-300px))] w-56 hidden lg:block max-h-[calc(100vh-8rem)] overflow-y-auto"
  >
    <div class="border dark:border-gray-800 p-3 rounded-md dark:bg-slate-900 bg-white/90 backdrop-blur-sm shadow-lg">
      <h2 class="text-sm font-bold mb-3 border-b dark:border-gray-800 pb-2">
        目录
      </h2>
      <nav>
        <NuxtLink
          v-for="link in links"
          :key="link.id"
          :to="`#${link.id}`"
          class="block text-xs mb-3 hover:underline"
          :class="link.id === activeId ? 'text-blue-600 dark:text-blue-400 font-semibold' : 'text-slate-600 dark:text-slate-300'"
          @click.prevent="onClick(link.id)"
        >
          {{ link.text }}
        </NuxtLink>
      </nav>
    </div>
  </div>
</template>
