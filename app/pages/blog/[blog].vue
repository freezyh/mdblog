<script setup lang="ts">
import type { ContentItem } from "@/types";

const route = useRoute();
const config = useRuntimeConfig();
const { data: page } = await useAsyncData(route.path, () => {
  const contentPath = route.path.replace(config.app.baseURL, "/");
  return queryCollection("content" as any).path(contentPath).first();
});
const tocLinks = computed(() => (page.value as ContentItem | null)?.body?.toc?.links || []);

useSeoMeta({
  title: page.value?.title,
  description: page.value?.description,
});

// ===== 滚动联动 + 锚点缓存 =====
const { scrollToId, findActiveId } = useAnchorScroll();
const activeId = ref("");
const anchorCacheKey = `blog-anchor:${route.path}`;
const SCROLL_OFFSET = 96; // 视口顶部判定阈值
let ticking = false;

function onScroll() {
  if (ticking) {
    return;
  }
  ticking = true;
  requestAnimationFrame(() => {
    ticking = false;
    const id = findActiveId(tocLinks.value.map(link => link.id), SCROLL_OFFSET);
    if (id && id !== activeId.value) {
      activeId.value = id;
      // 每个页面按路径缓存当前锚点
      localStorage.setItem(anchorCacheKey, id);
    }
  });
}

onMounted(() => {
  // 二次进入：定位到缓存的锚点；首次进入（无缓存）正常显示
  const cached = localStorage.getItem(anchorCacheKey);
  if (cached && tocLinks.value.some(link => link.id === cached)) {
    nextTick(() => {
      scrollToId(cached, "auto");
      activeId.value = cached;
    });
  }
  // capture 捕获阶段监听，同时覆盖 #__nuxt 容器滚动与 window 滚动
  document.addEventListener("scroll", onScroll, { capture: true, passive: true });
});

onBeforeUnmount(() => {
  document.removeEventListener("scroll", onScroll, { capture: true });
});
</script>

<template>
  <div>
    <div class="prose">
      <ContentRenderer v-if="page" :value="page" />
    </div>
    <!-- TOC positioned outside main content area -->
    <ClientOnly>
      <Teleport to="body">
        <BlogToc :links="tocLinks" :active-id="activeId" />
      </Teleport>
    </ClientOnly>
  </div>
</template>

<style lang="scss" scoped>
.prose {
  margin: 0 auto;
  max-width: 680px;
}
.txt {
  user-select: none;
  font-size: 24px;
}

.name {
  font-size: 12px;
}
</style>
