# My First Page

Here is some content.

```js [config.js]
const a = 123; // precision for decimal numbers (2 by default)
```

```ts [nuxt.config.ts]
export default defineNuxtConfig({
  modules: ["@nuxtwind/components"],
  nuxtwind: {
    // Module options
  },
});
```

```html
<table class="w-full mb-8">
  <tr>
    <td attributes class="py-2 px-4 bg-blue-100 text-blue-600 rounded">
      <yield />
    </td>
  </tr>
</table>
```
