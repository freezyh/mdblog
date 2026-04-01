<script setup lang="ts">
import type { LinkMenu } from "~/types";

const route = useRoute();

const { data: links/* , status */ } = await useAsyncData(route.path, async () => {
  return await queryCollection("blog" as any).all();
});

if (!links.value) {
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
