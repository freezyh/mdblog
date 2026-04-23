<script lang="ts" setup>
useSeoMeta({
  title: "我的网站",
  description: "描述",
});

const skillsData = ref<{ name: string; category: string; icon: string }[]>([]);
const loading = ref(false);
const error = ref<string | null>(null);
const validateToken = ref("");

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

// 抖音视频提取
const douyinUrl = ref("");
const douyinLoading = ref(false);

async function fetchDouyin() {
  /* if (!douyinUrl.value.trim()) {
    console.log("请输入抖音视频链接");
    return;
  } */
  douyinLoading.value = true;
  try {
    const res = await $fetch<any>("/api/douyin-video-extractor", {
      method: "POST",
      body: { url: douyinUrl.value },
    });
    console.log(res);
  }
  catch {
    console.log("提取失败");
  }
  finally {
    douyinLoading.value = false;
  }
}

function valideTokenFunc() {
  $fetch("/api/validetoken", {
    method: "POST",
    body: { token: validateToken.value },
  }).then((res) => {
    console.log(res);
  });
}

onMounted(() => {
  $fetch("/api/session", {
    method: "get",
  }).then((res) => {
    console.log(res);
    validateToken.value = res.token;
  });
});

// 小红书轮询
const isPolling = ref(false);

const { loading: xhsLoading, error: xhsError, start: startPolling, stop: stopPolling } = usePolling(
  async (signal) => {
    return await $fetch<any>("/api/session", { signal }); // /api/xhs
  },
  5000,
  {
    onSuccess: (res) => {
      console.log("轮询成功:", res);
    },
    onError: (err) => {
      console.error("轮询失败:", err);
    },
  },
);

function togglePolling() {
  if (isPolling.value) {
    stopPolling();
  }
  else {
    startPolling();
  }
  isPolling.value = !isPolling.value;
}

onUnmounted(() => {
  stopPolling();
});
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
      @click="fetchVerify"
    >
      获取配置
    </button>
    <button
      class="ml-2 px-4 py-2 rounded text-white"
      :class="isPolling ? 'bg-red-500 hover:bg-red-600' : 'bg-blue-500 hover:bg-blue-600'"
      @click="togglePolling"
    >
      {{ isPolling ? "停止轮询" : "开始轮询" }}
    </button>
    <span v-if="xhsLoading" class="ml-2 text-gray-500">轮询中...</span>
    <span v-if="xhsError" class="ml-2 text-red-500">轮询错误</span>

    <!-- 抖音视频提取 -->
    <div class="mt-8 flex items-center gap-2">
      <input
        v-model="douyinUrl"
        type="text"
        placeholder="请输入抖音视频链接"
        class="border p-2 rounded w-80"
      >
      <button
        class="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600"
        :disabled="douyinLoading"
        @click="fetchDouyin"
      >
        {{ douyinLoading ? "提取中..." : "提取抖音视频" }}
      </button>
    </div>
    <!-- 校验token -->
    <div class="mt-8 flex items-center gap-2">
      <input
        v-model="validateToken"
        type="text"
        placeholder="请输入token"
        class="border p-2 rounded w-80"
      >
      <button
        class="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600"
        :disabled="douyinLoading"
        @click="valideTokenFunc"
      >
        校验
      </button>
    </div>
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
