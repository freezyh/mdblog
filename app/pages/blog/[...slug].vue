<script setup lang="ts">
const route = useRoute();
const config = useRuntimeConfig();
const { data: page } = await useAsyncData(route.path, () => {
  const contentPath = route.path.replace(config.app.baseURL, "/");
  return queryCollection("blog" as any).path(contentPath).first();
});
// console.log(page);
useSeoMeta({
  title: page.value.title,
  description: page.value.description,
});
</script>

<template>
  <div class="prose">
    <ContentRenderer v-if="page" :value="page" />
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
