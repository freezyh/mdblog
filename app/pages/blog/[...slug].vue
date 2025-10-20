<script setup lang="ts">
 
const route = useRoute()
const { data: page } = await useAsyncData(route.path, () => {
  return queryCollection("blog" as any).path(route.path).first();
});

</script>

<template>
   <div class="prose">
      <ContentRenderer v-if="page" :value="page" />
    </div>
</template>
<style lang="scss" scoped>
.prose {
  width: 600px;
  margin: 0 auto;
}
.txt {
  user-select: none;
  font-size: 24px;
}

.name {
  font-size: 12px;
}
</style>
