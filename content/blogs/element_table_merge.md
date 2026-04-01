---
title: elementui table 合并列通用方法
description: elementui table 合并列通用方法
date: 2025-10-24 09:56:24
year: 2025
---

## elementui table 合并列通用方法

表格数据处理方法

```js [方法]
export default {
  methods: {
    /*
         * @param {Array} tableData 表格数据
         * @param {Array} fieldArr 要合并的列的字段数组
         * @params {Boolean} isFieldAll  合并是由所有的fieldArr字段，只有当fieldArr全部字段都相同，才会合并
         * @param {Object} effectMerge 受影响的数据
         * 如果不传effectMerge，代表只要改字段相同就会合并才会合并这一列
         * effectMerge = {
              month_1: ['area'],
              month_3: []
           };
         以上代表month_1(一月)这一列只要area(地理区域) 和 month_1（一月）值都相同就合并这一行列，否则不合并
        month_3（三月）不受别的影响，只要month_3值相同就合并这一行列，否则不合并
    */

    setTabelRowSpan(tableData, fieldArr, effectMerge = {}, isFieldAll = false) {
      let lastItem = {};
      fieldArr.forEach((field, index) => {
        let judgeArr = fieldArr.slice(0, index + 1);
        if (isFieldAll) {
          judgeArr = [...fieldArr];
        }
        else if (effectMerge[field]) {
          judgeArr = [...effectMerge[field], field];
        }
        tableData.forEach((item) => {
          item.mergeCell = fieldArr;
          const rowSpan = `rowspan_${field}`;
          // 判断是否合并到上个单元格。
          if (judgeArr.every(e => lastItem[e] === item[e] && item[e] !== "")) {
            // 判断是否所在行的列对应的值全部相同，并且此列的值不为空
            // 是：合并行
            item[rowSpan] = 0;
            lastItem[rowSpan] += 1;
          }
          else {
            // 否：完成一次同类合并。lastItem重新赋值，进入下一次合并计算。
            item[rowSpan] = 1;
            lastItem = item;
          }
        });
      });
    },
    // 合并表格方法
    objectSpanMethod({ row, column }) {
      if (row.mergeCell.includes(column.property)) {
        const rowspan = row[`rowspan_${column.property}`];
        if (rowspan) {
          return { rowspan, colspan: 1 };
        }
        else {
          return { rowspan: 0, colspan: 0 };
        }
      }
    },
  },
};
```

elementui table 配置

```html [table]
:span-method="objectSpanMethod"
```

拿到表格数据后先处理数据

```js [处理数据]
const effectMerge = {
  month_1: ["area"],
  month_3: []
};
const arr = ["area", "province", "month_1", "month_2", "month_3"];
// list 为表格数据，arr为要合并的列字段数组，effectMerge受其他列影响的字段
this.setTabelRowSpan(list, arr, effectMerge);
```
