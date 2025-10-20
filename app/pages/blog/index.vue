<script setup lang="ts">
 
const route = useRoute()

const { data: links, status } = await useAsyncData(route.path, async () => {
  return await queryCollection("blog" as any).all()
})

if (!links.value) {
  throw createError({ statusCode: 404, statusMessage: `Page not found: ${route.path}`, fatal: true })
}

links.value = links.value.map((item: any) => {
  return {
    name: item.title,
    path: item.path,
    date: item.year,
    description: item.description || '',
  } 
}).sort((a, b) => b.date - a.date)
</script>

<template>
    <NuxtLink class="link" v-for="(item, index) in links" :key="index" :to="item.path"> {{ item.name }}</NuxtLink>
</template>
<style lang="scss" scoped>
.link {
  display: block;
}
</style>
