export const useSidebarStore = defineStore("sidebar", {
  state: () => ({
    anchorList: [
      {
        anchor: "#labs",
        text: "实验室",
        iconClass: "sidebaricon-labs",
      },
      {
        anchor: "#courses",
        text: "学好课",
        iconClass: "sidebaricon-course",
      },
      {
        anchor: "#project",
        text: "好作品",
        iconClass: "sidebaricon-works",
      },
      {
        anchor: "#codingnews",
        text: "资讯",
        iconClass: "sidebaricon-news",
      },
      {
        anchor: "#cocase",
        text: "校园",
        iconClass: "sidebaricon-campus",
      },
      {
        anchor: "#cooperator",
        text: "合作",
        iconClass: "sidebaricon-cooperation",
      },
    ],
    anchor: "",
  }),
  actions: {
    /**
     * 设置全局锚点
     * @param {string} anchor
     */
    setAnchor(anchor: string) {
      this.anchor = anchor || "";
    },
    scrollTo(offsetTop: number) {
      const parent = document.querySelector("#__nuxt") as HTMLElement;
      parent.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      });
    },
    anchorPosition(anchor: string) {
      const element = document.querySelector(anchor) as HTMLElement;
      this.scrollTo(element.offsetTop);
    },
  },

});
