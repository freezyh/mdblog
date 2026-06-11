<script setup lang="ts">
import type { LinkMenu } from "~/types";

const { data: links } = await useAsyncData<LinkMenu[]>("blog-list", () => {
  return queryCollection("content" as any).all();
});

if (!links.value) {
  throw createError({ statusCode: 404, statusMessage: "Blog content not loaded" });
}

links.value = (links.value as any[])
  .map((item: any) => ({
    name: item.title,
    path: item.path,
    date: new Date(item.date).getTime(),
  } as LinkMenu))
  .sort((a, b) => b.date - a.date);

function formatDate(timestamp: number): string {
  const d = new Date(timestamp);
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${y}/${m}/${dd}`;
}
</script>

<template>
  <div class="blog-container">
    <header class="blog-header">
      <h1 class="blog-title">
        所有笔记
      </h1>
      <span class="blog-subtitle">共 {{ links?.length ?? 0 }} 篇</span>
    </header>

    <div class="blog-list">
      <article
        v-for="(item, index) in links"
        :key="index"
        class="blog-card"
      >
        <NuxtLink :to="item.path" class="blog-card-link">
          <span class="blog-card-date">{{ formatDate(item.date) }}</span>
          <span class="blog-card-title">{{ item.name }}</span>
        </NuxtLink>
      </article>
    </div>

    <div v-if="!links || links.length === 0" class="blog-empty">
      <p>还没有文章，敬请期待</p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.blog-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px 16px 40px;
}

.blog-header {
  display: flex;
  align-items: baseline;
  gap: 8px;
  margin-bottom: 12px;
  padding: 0 4px;
}

.blog-title {
  font-size: 18px;
  font-weight: 700;
  color: #1a1a2e;
  margin: 0;
}

.blog-subtitle {
  font-size: 12px;
  color: #aaa;
}

.blog-list {
  display: flex;
  flex-direction: column;
}

.blog-card {
  border-bottom: 1px solid #f0f0f0;
  transition: background 0.15s;

  &:hover {
    background: #f8f9fb;

    .blog-card-title {
      color: #2563eb;
    }
  }
}

.blog-card-link {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 7px 6px;
  text-decoration: none;
  color: inherit;
}

.blog-card-date {
  font-size: 12px;
  color: #bbb;
  white-space: nowrap;
  flex-shrink: 0;
  min-width: 95px;
}

.blog-card-title {
  font-size: 14px;
  font-weight: 500;
  color: #1a1a2e;
  line-height: 1.5;
  transition: color 0.15s;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.blog-empty {
  text-align: center;
  padding: 60px 0;
  color: #aaa;
  font-size: 14px;
}

/* 暗色模式 */
:global(.dark) {
  .blog-title {
    color: #e5e5ee;
  }

  .blog-card {
    border-bottom-color: #2a2a3e;

    &:hover {
      background: #1a1a2e;
    }
  }

  .blog-card-title {
    color: #e5e5ee;
  }

  .blog-card-date {
    color: #777;
  }
}
</style>
