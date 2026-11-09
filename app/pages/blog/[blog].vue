<script setup lang="ts">
import type { ContentItem } from "@/types";
import { on } from "node:events";

const route = useRoute();
const config = useRuntimeConfig();
const { data: page } = await useAsyncData(route.path, () => {
  const contentPath = route.path.replace(config.app.baseURL, "/");
  return queryCollection("content" as any).path(contentPath).first();
});
const tocLinks = computed(() => (page.value as ContentItem | null)?.body?.toc?.links || []);
console.log(page);
useSeoMeta({
  title: page.value.title,
  description: page.value.description,
});
onMounted(() => {
  // console.log(tocLinks.value);
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
        <BlogToc :links="tocLinks" />
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
