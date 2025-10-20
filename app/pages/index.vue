<script lang="ts" setup>
useSeoMeta({
  title: "我的网站",
  description: "描述",
});
/* const counter = useCounterStore(); */
/* const route = useRoute();
const { data: page } = await useAsyncData(route.path, () => {
  return queryCollection("docs").path(route.path).first();
}); */
</script>

<template>
  <div>
    <!-- 首页 -->
     首页
   <!--  <div>
    <p>Count: {{ counter.count }}</p>
    <p>Double: {{ counter.doubleCount }}</p>
    <button @click="counter.increment()">Increment</button>
  </div> -->
    <!-- <div class="test txt">
      select
    </div>
    <div class="px-6">
      test
    </div> -->
    <!-- <div class="prose">
      <ContentRenderer v-if="page" :value="page" />
    </div> -->
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
