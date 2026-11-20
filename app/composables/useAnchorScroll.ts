/**
 * 博客锚点滚动工具
 * 页面滚动容器可能是 #__nuxt（layout 设置了 height:100%; overflow:auto），也可能是 window，
 * 通过运行时检测自动适配两种模式
 */
export function useAnchorScroll() {
  // 获取实际的滚动容器；#__nuxt 无内部滚动时返回 null（此时由 window 滚动）
  function getScrollContainer(): HTMLElement | null {
    const el = document.querySelector<HTMLElement>("#__nuxt");
    if (el && el.scrollHeight > el.clientHeight && ["auto", "scroll"].includes(getComputedStyle(el).overflowY)) {
      return el;
    }
    return null;
  }

  // 滚动到指定锚点；behavior: "auto" 直接跳转，"smooth" 平滑滚动。返回是否找到元素
  function scrollToId(id: string, behavior: ScrollBehavior = "smooth"): boolean {
    const el = document.getElementById(id);
    if (!el) {
      return false;
    }
    const container = getScrollContainer();
    if (container) {
      // 目标元素在容器内容坐标系中的 Y = 视口差值 + 容器已滚动距离
      const top = el.getBoundingClientRect().top - container.getBoundingClientRect().top + container.scrollTop;
      container.scrollTo({ top, behavior });
    }
    else {
      window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY, behavior });
    }
    return true;
  }

  // 计算当前滚动位置对应的锚点（视口顶部 offset 以内最近的标题）
  function findActiveId(ids: string[], offset = 96): string {
    const container = getScrollContainer();
    const viewportTop = container ? container.getBoundingClientRect().top : 0;
    let active = "";
    for (const id of ids) {
      const el = document.getElementById(id);
      if (!el) {
        continue;
      }
      if (el.getBoundingClientRect().top - viewportTop <= offset) {
        active = id;
      }
      else {
        break;
      }
    }
    return active;
  }

  return { getScrollContainer, scrollToId, findActiveId };
}
