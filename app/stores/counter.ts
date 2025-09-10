export const useCounterStore = defineStore("counter", {
  state: () => ({
    count: 0,
    token: "111",
  }),
  getters: {
    doubleCount: state => state.count * 2,
  },
  actions: {
    increment() {
      this.count++;
    },
  },
});
