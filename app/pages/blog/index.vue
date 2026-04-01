<script setup lang="ts">
import type { LinkMenu } from "~/types";

const route = useRoute();

const { data: links } = await useAsyncData("blog-list", async () => {
  try {
    return await queryCollection("blog" as any).all();
  }
  catch (e) {
    console.error("queryCollection error:", e);
    return [];
  }
});

if (!links.value || links.value.length === 0) {
  throw createError({ statusCode: 404, statusMessage: `Page not found: ${route.path}`, fatal: true });
}

links.value = links.value.map((item: any) => {
  return {
    name: item.title,
    path: item.path,
    date: new Date(item.date).getTime(),
    description: item.description || "",
  } as LinkMenu;
}).sort((a, b) => b.date - a.date);
</script>

<template>
  <NuxtLink v-for="(item, index) in links" :key="index" class="link" :to="item.path">
    {{ item.name }}
  </NuxtLink>
</template>

<style lang="scss" scoped>
.link {
  display: block;
}
</style>
