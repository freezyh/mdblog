<script setup lang="ts">
import type { LinkMenu } from "~/types";

const { data: links } = await useAsyncData<LinkMenu[]>("blog-list", () => {
  return queryCollection("blog" as any).all();
});

if (!links.value) {
  throw createError({ statusCode: 404, statusMessage: "Blog content not loaded" });
}

links.value = (links.value as any[]).map((item: any) => {
  return {
    name: item.title,
    path: item.path,
    date: new Date(item.date).getTime(),
    description: item.description || "",
  } as LinkMenu;
}).sort((a, b) => b.date - a.date);
onMounted(() => {
  console.log(links);
});
</script>

<template>
  <div>
    <NuxtLink v-for="(item, index) in links" :key="index" class="link" :to="item.path">
      {{ item.name }}
    </NuxtLink>
  </div>
</template>

<style lang="scss" scoped>
.link {
  display: block;
}
</style>
