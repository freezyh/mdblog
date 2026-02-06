<script setup lang="ts">
import { BarChart, LineChart, PieChart, RadarChart } from "echarts/charts";
import {
  GridComponent,
  LegendComponent,
  RadarComponent,
  TitleComponent,
  TooltipComponent,
} from "echarts/components";
import * as echarts from "echarts/core";
import { CanvasRenderer } from "echarts/renderers";

echarts.use([
  TitleComponent,
  TooltipComponent,
  GridComponent,
  LegendComponent,
  RadarComponent,
  LineChart,
  BarChart,
  PieChart,
  RadarChart,
  CanvasRenderer,
]);

const chartRef = ref<HTMLElement | null>(null);
const mixedChartRef = ref<HTMLElement | null>(null);
const pieChartRef = ref<HTMLElement | null>(null);
const radarChartRef = ref<HTMLElement | null>(null);

onMounted(() => {
  // --- 折线图 ---
  if (chartRef.value) {
    const myChart = echarts.init(chartRef.value);
    const option = {
      backgroundColor: "transparent",
      title: {
        text: "系统流量趋势概览",
        textStyle: {
          color: "#334155",
          fontSize: 16,
          fontWeight: "600",
        },
        left: "0",
        top: 0,
      },
      tooltip: {
        trigger: "axis",
        backgroundColor: "rgba(255, 255, 255, 0.9)",
        borderColor: "#e2e8f0",
        borderWidth: 1,
        textStyle: {
          color: "#475569",
        },
        extraCssText: "box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);",
        padding: [10, 15],
      },
      grid: {
        left: "0",
        right: "3%",
        bottom: "0",
        top: "15%",
        containLabel: true,
      },
      xAxis: {
        type: "category",
        boundaryGap: false,
        data: ["00:00", "04:00", "08:00", "12:00", "16:00", "20:00", "23:59"],
        axisLine: {
          lineStyle: {
            color: "#f1f5f9",
          },
        },
        axisLabel: {
          color: "#94a3b8",
          margin: 15,
        },
        axisTick: {
          show: false,
        },
      },
      yAxis: {
        type: "value",
        splitLine: {
          lineStyle: {
            color: "#f1f5f9",
            type: "solid",
          },
        },
        axisLine: {
          show: false,
        },
        axisLabel: {
          color: "#94a3b8",
        },
      },
      series: [
        {
          name: "网络流量",
          type: "line",
          smooth: true,
          showSymbol: false,
          lineStyle: {
            width: 3,
            color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
              { offset: 0, color: "#93c5fd" },
              { offset: 1, color: "#5eead4" },
            ]),
            shadowColor: "rgba(147, 197, 253, 0.3)",
            shadowBlur: 8,
            shadowOffsetY: 4,
          },
          areaStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: "rgba(147, 197, 253, 0.2)" },
              { offset: 1, color: "rgba(147, 197, 253, 0)" },
            ]),
          },
          emphasis: {
            focus: "series",
            lineStyle: {
              width: 3,
            },
          },
          data: [120, 182, 191, 234, 290, 330, 310],
        },
      ],
    };
    myChart.setOption(option);

    window.addEventListener("resize", () => {
      myChart.resize();
    });
  }

  // --- 柱状折线混合图 ---
  if (mixedChartRef.value) {
    const mixedChart = echarts.init(mixedChartRef.value);
    const mixedOption = {
      backgroundColor: "transparent",
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "cross",
          crossStyle: {
            color: "#999",
          },
        },
      },
      legend: {
        data: ["蒸发量", "降水量", "平均温度"],
        bottom: 0,
        itemGap: 20,
        textStyle: {
          color: "#64748b",
        },
      },
      xAxis: [
        {
          type: "category",
          data: ["1月", "2月", "3月", "4月", "5月", "6月"],
          axisPointer: {
            type: "shadow",
          },
          axisLine: {
            lineStyle: {
              color: "#f1f5f9",
            },
          },
          axisLabel: {
            color: "#94a3b8",
          },
        },
      ],
      yAxis: [
        {
          type: "value",
          name: "水量",
          min: 0,
          max: 250,
          interval: 50,
          axisLabel: {
            formatter: "{value} ml",
            color: "#94a3b8",
          },
          splitLine: {
            lineStyle: {
              color: "#f1f5f9",
            },
          },
          nameTextStyle: {
            color: "#94a3b8",
          },
        },
        {
          type: "value",
          name: "温度",
          min: 0,
          max: 25,
          interval: 5,
          axisLabel: {
            formatter: "{value} °C",
            color: "#94a3b8",
          },
          splitLine: {
            show: false,
          },
          nameTextStyle: {
            color: "#94a3b8",
          },
        },
      ],
      series: [
        {
          name: "蒸发量",
          type: "bar",
          tooltip: {
            valueFormatter(value: number) {
              return `${value} ml`;
            },
          },
          data: [2.0, 4.9, 7.0, 23.2, 25.6, 76.7],
          itemStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: "#93c5fd" },
              { offset: 1, color: "#60a5fa" },
            ]),
            borderRadius: [4, 4, 0, 0],
          },
        },
        {
          name: "降水量",
          type: "bar",
          tooltip: {
            valueFormatter(value: number) {
              return `${value} ml`;
            },
          },
          data: [2.6, 5.9, 9.0, 26.4, 28.7, 70.7],
          itemStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: "#5eead4" },
              { offset: 1, color: "#2dd4bf" },
            ]),
            borderRadius: [4, 4, 0, 0],
          },
        },
        {
          name: "平均温度",
          type: "line",
          yAxisIndex: 1,
          tooltip: {
            valueFormatter(value: number) {
              return `${value} °C`;
            },
          },
          data: [2.0, 2.2, 3.3, 4.5, 6.3, 10.2],
          lineStyle: {
            color: "#f59e0b",
            width: 3,
          },
          itemStyle: {
            color: "#f59e0b",
          },
        },
      ],
    };
    mixedChart.setOption(mixedOption);

    window.addEventListener("resize", () => {
      mixedChart.resize();
    });
  }

  // --- 饼图 ---
  if (pieChartRef.value) {
    const pieChart = echarts.init(pieChartRef.value);
    const pieOption = {
      backgroundColor: "transparent",
      tooltip: {
        trigger: "item",
        backgroundColor: "rgba(255, 255, 255, 0.9)",
        textStyle: { color: "#475569" },
      },
      legend: {
        orient: "vertical",
        left: "left",
        textStyle: { color: "#64748b" },
      },
      series: [
        {
          name: "访问来源",
          type: "pie",
          radius: ["40%", "70%"],
          avoidLabelOverlap: false,
          itemStyle: {
            borderRadius: 10,
            borderColor: "#fff",
            borderWidth: 2,
          },
          label: {
            show: false,
            position: "center",
          },
          emphasis: {
            label: {
              show: true,
              fontSize: 20,
              fontWeight: "bold",
            },
          },
          labelLine: {
            show: false,
          },
          data: [
            { value: 1048, name: "搜索引擎", itemStyle: { color: "#93c5fd" } },
            { value: 735, name: "直接访问", itemStyle: { color: "#5eead4" } },
            { value: 580, name: "邮件营销", itemStyle: { color: "#fbbf24" } },
            { value: 484, name: "联盟广告", itemStyle: { color: "#f87171" } },
            { value: 300, name: "视频广告", itemStyle: { color: "#818cf8" } },
          ],
        },
      ],
    };
    pieChart.setOption(pieOption);
    window.addEventListener("resize", () => pieChart.resize());
  }

  // --- 雷达图 ---
  if (radarChartRef.value) {
    const radarChart = echarts.init(radarChartRef.value);
    const radarOption = {
      backgroundColor: "transparent",
      radar: {
        indicator: [
          { name: "销售", max: 5000 },
          { name: "管理", max: 25000 },
          { name: "信息技术", max: 50000 },
          { name: "客服", max: 50000 },
          { name: "研发", max: 50000 },
          { name: "市场", max: 25000 },
        ],
        axisName: {
          color: "#94a3b8",
        },
        splitLine: {
          lineStyle: {
            color: "#f1f5f9",
          },
        },
        splitArea: {
          show: false,
        },
        axisLine: {
          lineStyle: {
            color: "#f1f5f9",
          },
        },
      },
      series: [
        {
          name: "预算 vs 开销",
          type: "radar",
          data: [
            {
              value: [4200, 3000, 20000, 35000, 50000, 18000],
              name: "预算分配",
              itemStyle: { color: "#93c5fd" },
              areaStyle: { color: "rgba(147, 197, 253, 0.3)" },
            },
            {
              value: [5000, 14000, 28000, 26000, 42000, 21000],
              name: "实际开销",
              itemStyle: { color: "#5eead4" },
              areaStyle: { color: "rgba(94, 234, 212, 0.3)" },
            },
          ],
        },
      ],
    };
    radarChart.setOption(radarOption);
    window.addEventListener("resize", () => radarChart.resize());
  }
});
</script>

<template>
  <div class="min-h-screen bg-gray-100 dark:bg-gray-900 p-8">
    <div class="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
      <!-- 案例 1: 极简折线图 -->
      <div class="bg-white dark:bg-[#0f172a] rounded-xl shadow-2xl overflow-hidden border border-gray-200 dark:border-slate-800">
        <div class="p-6">
          <h1 class="text-2xl font-bold text-gray-800 dark:text-white mb-2">
            极简清新折线图
          </h1>
          <p class="text-gray-600 dark:text-slate-400 mb-6">
            基于 ECharts 的按需加载实现，采用清新浅色调与扁平化设计
          </p>
          <div ref="chartRef" class="w-full h-[400px]" />
        </div>
      </div>

      <!-- 案例 2: 柱状折线混合图 -->
      <div class="bg-white dark:bg-[#0f172a] rounded-xl shadow-2xl overflow-hidden border border-gray-200 dark:border-slate-800">
        <div class="p-6">
          <h2 class="text-2xl font-bold text-gray-800 dark:text-white mb-2">
            混合趋势图
          </h2>
          <p class="text-gray-600 dark:text-slate-400 mb-6">
            支持双 Y 轴，结合柱状图表现总量与折线图表现趋势
          </p>
          <div ref="mixedChartRef" class="w-full h-[400px]" />
        </div>
      </div>

      <!-- 案例 3: 环形饼图 -->
      <div class="bg-white dark:bg-[#0f172a] rounded-xl shadow-2xl overflow-hidden border border-gray-200 dark:border-slate-800">
        <div class="p-6">
          <h2 class="text-2xl font-bold text-gray-800 dark:text-white mb-2">
            数据占比饼图
          </h2>
          <p class="text-gray-600 dark:text-slate-400 mb-6">
            环形设计，支持 Hover 联动与图例筛选
          </p>
          <div ref="pieChartRef" class="w-full h-[400px]" />
        </div>
      </div>

      <!-- 案例 4: 维度雷达图 -->
      <div class="bg-white dark:bg-[#0f172a] rounded-xl shadow-2xl overflow-hidden border border-gray-200 dark:border-slate-800">
        <div class="p-6">
          <h2 class="text-2xl font-bold text-gray-800 dark:text-white mb-2">
            多维能力雷达图
          </h2>
          <p class="text-gray-600 dark:text-slate-400 mb-6">
            展示多个维度的对比分析，支持面积填充
          </p>
          <div ref="radarChartRef" class="w-full h-[400px]" />
        </div>
      </div>
    </div>
  </div>
</template>
