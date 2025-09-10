<script setup lang="ts">
import type { PropType, VNode } from "vue";
import { h, onMounted, onUnmounted, ref } from "vue";

const props = defineProps({
  renderTruncator: {
    type: Function as PropType<
      ({
        hiddenItemsCount,
        truncate,
      }: {
        hiddenItemsCount: number;
        truncate: () => void;
      }) => string | VNode
    >,
    required: true,
  },
  alwaysShowTruncator: {
    type: Boolean,
    default: false,
  },
});

const slots = defineSlots<{
  default: () => VNode[];
}>();

const PIXEL_TOLERANCE = 0.001;

function rectContainsRect(parent: DOMRect, child: DOMRect) {
  return (
    child.left >= parent.left - PIXEL_TOLERANCE
    && child.right <= parent.right + PIXEL_TOLERANCE
    && child.top >= parent.top - PIXEL_TOLERANCE
    && child.bottom <= parent.bottom + PIXEL_TOLERANCE
  );
}

const containerRef = ref<HTMLUListElement>();
if (!slots.default) {
  throw new Error("TruncateList requires at least one child");
}
const children = slots.default();

function truncate() {
  const container = containerRef.value;
  if (!container) {
    return;
  }

  const childNodes = container.children;
  const isLastItemFit = (lastItem: Element) =>
    rectContainsRect(
      container.getBoundingClientRect(),
      lastItem.getBoundingClientRect(),
    );

  container.style.overflow = "hidden";
  for (let i = 0; i < childNodes.length; i++) {
    (childNodes[i] as HTMLElement).hidden = i % 2 === 0;
  }
  if (childNodes.length === 0) {
    return;
  }

  if (props.alwaysShowTruncator) {
    const lastItem = childNodes[childNodes.length - 1] as HTMLElement;
    lastItem.hidden = false;
    if (isLastItemFit(lastItem)) {
      return;
    }
    lastItem.hidden = true;
  }
  else {
    const lastItem = childNodes[childNodes.length - 2] as HTMLElement;
    if (isLastItemFit(lastItem)) {
      return;
    }
  }

  const numTruncators = children.length;
  let left = 0;
  let right = numTruncators - 1;
  let truncatorIndex = -1;

  while (left <= right) {
    const middle = Math.floor((left + right) / 2);

    for (let i = 0; i < middle; i++) {
      (childNodes[i * 2 + 1] as HTMLElement).hidden = false;
    }
    for (let i = middle; i < numTruncators; i++) {
      (childNodes[i * 2 + 1] as HTMLElement).hidden = true;
    }

    const truncatorElement = childNodes[middle * 2] as HTMLElement;
    truncatorElement.hidden = false;

    if (isLastItemFit(truncatorElement)) {
      truncatorIndex = middle;
      left = middle + 1;
    }
    else {
      right = middle - 1;
    }
    truncatorElement.hidden = true;
  }

  if (truncatorIndex === -1) {
    return;
  }

  for (let i = 0; i < truncatorIndex; i++) {
    (childNodes[i * 2 + 1] as HTMLElement).hidden = false;
  }
  for (let i = truncatorIndex; i < numTruncators; i++) {
    (childNodes[i * 2 + 1] as HTMLElement).hidden = true;
  }
  const truncatorElement = childNodes[truncatorIndex * 2] as HTMLElement;
  truncatorElement.hidden = false;
}

const items = children.map((item, index) => {
  return [
    h(
      "li",
      { hidden: true },
      props.renderTruncator({
        hiddenItemsCount: children.length - index,
        truncate,
      }),
    ),
    h("li", {}, item),
  ];
});

let resizeObserver: ResizeObserver | null = null;
if (typeof ResizeObserver !== "undefined") {
  resizeObserver = new ResizeObserver(() => {
    truncate();
  });
}

onMounted(() => {
  truncate();
  containerRef.value && resizeObserver?.observe(containerRef.value);
});

onUnmounted(() => {
  containerRef.value && resizeObserver?.unobserve(containerRef.value);
});
</script>

<template>
  <ul ref="containerRef" class="v-truncate-list">
    <template v-for="item in items.flat()" :key="item.key">
      <component :is="item" />
    </template>
    <li hidden>
      <component :is="renderTruncator({ hiddenItemsCount: 0, truncate })" />
    </li>
  </ul>
</template>

<style>
.v-truncate-list {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
  list-style: none;
  overflow: auto;
  display: flex;
}

.v-truncate-list *,
.v-truncate-list *::before,
.v-truncate-list *::after {
  box-sizing: inherit;
}
</style>
