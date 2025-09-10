# My First Page

Here is some content.

```js [config.js]
let a = 123; // precision for decimal numbers (2 by default)
```

```js [config.js]
export default {
  css: {
    inline: true,
    purge: true,
    resolveCalc: true,
    resolveProps: true,
    safe: true,
    shorthand: true,
    sixHex: true,
    tailwind: {},
  },
};
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
