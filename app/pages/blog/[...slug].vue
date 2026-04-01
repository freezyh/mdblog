<script setup lang="ts">
const route = useRoute();
const { data: page } = await useAsyncData(route.path, () => {
  return queryCollection("blog" as any).path(route.path).first();
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
