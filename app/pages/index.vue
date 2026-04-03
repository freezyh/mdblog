<script lang="ts" setup>
useSeoMeta({
  title: "我的网站",
  description: "描述",
});

const skillsData = ref<{ name: string; category: string; icon: string }[]>([]);
const loading = ref(false);
const error = ref<string | null>(null);

async function fetchSkills() {
  loading.value = true;
  error.value = null;
  try {
    skillsData.value = await $fetch<{ name: string; category: string; icon: string }[]>("/api/skills");
  }
  catch {
    error.value = "请求失败";
  }
  finally {
    loading.value = false;
  }
}

const numA = ref(0);
const numB = ref(0);
const addResult = ref<number | null>(null);
const addLoading = ref(false);

async function fetchAdd() {
  addLoading.value = true;
  try {
    const res = await $fetch<{ result: number }>("/api/add", {
      method: "POST",
      body: { a: numA.value, b: numB.value },
    });
    addResult.value = res.result;
  }
  finally {
    addLoading.value = false;
  }
}

async function fetchXhs() {
  addLoading.value = true;
  try {
    const res = await $fetch<{ result: any }>("/api/xhs", {
      method: "get",
    });
    console.log(res);
  }
  finally {
    addLoading.value = false;
  }
}
async function fetchVerify() {
  try {
    const res = await $fetch<{ result: any }>("/api/xhs-verify", {
      method: "post",
    });
    console.log(res);
  }
  finally {
    addLoading.value = false;
  }
}
</script>

<template>
  <div>
    <!-- 首页 -->
    首页
    <button
      class="ml-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      :disabled="loading"
      @click="fetchSkills"
    >
      {{ loading ? "加载中..." : "获取 Skills" }}
    </button>

    <!-- Skills 数据展示 -->
    <div v-if="error" class="mt-4 text-red-500">
      {{ error }}
    </div>
    <div v-else-if="skillsData.length" class="mt-4">
      <div v-for="skill in skillsData" :key="skill.name" class="py-1">
        {{ skill.name }} - {{ skill.category }}
      </div>
    </div>

    <!-- 计算器 -->
    <div class="mt-8 flex items-center gap-2">
      <input v-model="numA" type="number" class="border p-2 rounded w-24">
      <span>+</span>
      <input v-model="numB" type="number" class="border p-2 rounded w-24">
      <button
        class="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        :disabled="addLoading"
        @click="fetchAdd"
      >
        {{ addLoading ? "计算中..." : "计算" }}
      </button>
      <span v-if="addResult !== null" class="ml-2 font-bold">
        = {{ addResult }}
      </span>
    </div>

    <button
      class="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
      :disabled="addLoading"
      @click="fetchXhs"
    >
      小红书
    </button>
    <button
      class="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
      :disabled="addLoading"
      @click="fetchVerify"
    >
      获取配置
    </button>
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
