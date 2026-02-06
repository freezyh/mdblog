<script setup lang="ts">
import type { EChartsOption } from "echarts";
import type { ECharts } from "echarts/core";
import { BarChart, LineChart, PieChart, RadarChart } from "echarts/charts";
import {
  GridComponent,
  LegendComponent,
  TitleComponent,
  TooltipComponent,
} from "echarts/components";
import * as echarts from "echarts/core";
import { CanvasRenderer } from "echarts/renderers";
import { onMounted, onUnmounted, ref } from "vue";

// 按需引入echarts模块
echarts.use([
  GridComponent,
  TooltipComponent,
  TitleComponent,
  LegendComponent,
  LineChart,
  BarChart,
  PieChart,
  RadarChart,
  CanvasRenderer,
]);

const lineChartRef = ref<HTMLElement>();
const barChartRef = ref<HTMLElement>();
const pieChartRef = ref<HTMLElement>();
const radarChartRef = ref<HTMLElement>();

let lineChartInstance: ECharts | null = null;
let barChartInstance: ECharts | null = null;
let pieChartInstance: ECharts | null = null;
let radarChartInstance: ECharts | null = null;

function initLineChart() {
  if (!lineChartRef.value)
    return;

  lineChartInstance = echarts.init(lineChartRef.value);

  const option: EChartsOption = {
    backgroundColor: "transparent",
    title: {
      text: "数据趋势图",
      left: "center",
      top: 20,
      textStyle: {
        color: "#64748b",
        fontSize: 18,
        fontWeight: 500,
      },
    },
    tooltip: {
      trigger: "axis",
      backgroundColor: "rgba(255, 255, 255, 0.95)",
      borderColor: "#e2e8f0",
      borderWidth: 1,
      textStyle: {
        color: "#475569",
      },
      padding: [12, 16],
    },
    grid: {
      left: "5%",
      right: "5%",
      bottom: "10%",
      top: "15%",
      containLabel: true,
    },
    xAxis: {
      type: "category",
      boundaryGap: false,
      data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
      axisLine: {
        lineStyle: {
          color: "#cbd5e1",
        },
      },
      axisLabel: {
        color: "#64748b",
        fontSize: 13,
      },
      axisTick: {
        show: false,
      },
    },
    yAxis: {
      type: "value",
      axisLine: {
        show: false,
      },
      axisLabel: {
        color: "#64748b",
        fontSize: 13,
      },
      splitLine: {
        lineStyle: {
          color: "#e2e8f0",
          type: "dashed",
        },
      },
    },
    series: [
      {
        name: "访问量",
        type: "line",
        smooth: true,
        symbol: "circle",
        symbolSize: 8,
        showSymbol: false,
        data: [120, 200, 150, 280, 220, 350, 300],
        lineStyle: {
          width: 3,
          color: {
            type: "linear",
            x: 0,
            y: 0,
            x2: 1,
            y2: 0,
            colorStops: [
              { offset: 0, color: "#60a5fa" },
              { offset: 0.5, color: "#818cf8" },
              { offset: 1, color: "#a78bfa" },
            ],
          },
        },
        itemStyle: {
          color: "#818cf8",
          borderColor: "#fff",
          borderWidth: 2,
        },
        areaStyle: {
          color: {
            type: "linear",
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              { offset: 0, color: "rgba(129, 140, 248, 0.4)" },
              { offset: 1, color: "rgba(129, 140, 248, 0.05)" },
            ],
          },
        },
        emphasis: {
          focus: "series",
          itemStyle: {
            color: "#818cf8",
            borderColor: "#fff",
            borderWidth: 3,
            shadowBlur: 10,
            shadowColor: "rgba(129, 140, 248, 0.5)",
          },
        },
      },
    ],
  };

  lineChartInstance.setOption(option);
}

function initBarChart() {
  if (!barChartRef.value)
    return;

  barChartInstance = echarts.init(barChartRef.value);

  const option: EChartsOption = {
    backgroundColor: "transparent",
    title: {
      text: "月度销售数据",
      left: "center",
      top: 20,
      textStyle: {
        color: "#64748b",
        fontSize: 18,
        fontWeight: 500,
      },
    },
    tooltip: {
      trigger: "axis",
      backgroundColor: "rgba(255, 255, 255, 0.95)",
      borderColor: "#e2e8f0",
      borderWidth: 1,
      textStyle: {
        color: "#475569",
      },
      padding: [12, 16],
    },
    grid: {
      left: "5%",
      right: "5%",
      bottom: "10%",
      top: "15%",
      containLabel: true,
    },
    xAxis: {
      type: "category",
      data: ["1月", "2月", "3月", "4月", "5月", "6月"],
      axisLine: {
        lineStyle: {
          color: "#cbd5e1",
        },
      },
      axisLabel: {
        color: "#64748b",
        fontSize: 13,
      },
      axisTick: {
        show: false,
      },
    },
    yAxis: {
      type: "value",
      axisLine: {
        show: false,
      },
      axisLabel: {
        color: "#64748b",
        fontSize: 13,
      },
      splitLine: {
        lineStyle: {
          color: "#e2e8f0",
          type: "dashed",
        },
      },
    },
    series: [
      {
        name: "销售额",
        type: "bar",
        data: [320, 452, 301, 534, 490, 630],
        barWidth: "40%",
        itemStyle: {
          borderRadius: [8, 8, 0, 0],
          color: {
            type: "linear",
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              { offset: 0, color: "#60a5fa" },
              { offset: 1, color: "#818cf8" },
            ],
          },
        },
        emphasis: {
          itemStyle: {
            color: {
              type: "linear",
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                { offset: 0, color: "#818cf8" },
                { offset: 1, color: "#a78bfa" },
              ],
            },
            shadowBlur: 10,
            shadowColor: "rgba(129, 140, 248, 0.5)",
          },
        },
      },
    ],
  };

  barChartInstance.setOption(option);
}

function initPieChart() {
  if (!pieChartRef.value)
    return;

  pieChartInstance = echarts.init(pieChartRef.value);

  const option: EChartsOption = {
    backgroundColor: "transparent",
    title: {
      text: "产品占比分布",
      left: "center",
      top: 20,
      textStyle: {
        color: "#64748b",
        fontSize: 18,
        fontWeight: 500,
      },
    },
    tooltip: {
      trigger: "item",
      backgroundColor: "rgba(255, 255, 255, 0.95)",
      borderColor: "#e2e8f0",
      borderWidth: 1,
      textStyle: {
        color: "#475569",
      },
      padding: [12, 16],
      formatter: "{b}: {c} ({d}%)",
    },
    legend: {
      orient: "vertical",
      right: "5%",
      top: "center",
      textStyle: {
        color: "#64748b",
        fontSize: 13,
      },
    },
    series: [
      {
        name: "产品类别",
        type: "pie",
        radius: ["45%", "65%"],
        center: ["40%", "55%"],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 10,
          borderColor: "#fff",
          borderWidth: 3,
        },
        label: {
          show: false,
          position: "center",
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 18,
            fontWeight: "bold",
            color: "#64748b",
          },
          itemStyle: {
            shadowBlur: 10,
            shadowColor: "rgba(0, 0, 0, 0.1)",
          },
        },
        labelLine: {
          show: false,
        },
        data: [
          { value: 335, name: "电子产品", itemStyle: { color: "#60a5fa" } },
          { value: 310, name: "服装鞋帽", itemStyle: { color: "#818cf8" } },
          { value: 234, name: "食品饮料", itemStyle: { color: "#a78bfa" } },
          { value: 135, name: "家居用品", itemStyle: { color: "#f472b6" } },
          { value: 148, name: "其他", itemStyle: { color: "#34d399" } },
        ],
      },
    ],
  };

  pieChartInstance.setOption(option);
}

function initRadarChart() {
  if (!radarChartRef.value)
    return;

  radarChartInstance = echarts.init(radarChartRef.value);

  const option: EChartsOption = {
    backgroundColor: "transparent",
    title: {
      text: "能力评估雷达",
      left: "center",
      top: 20,
      textStyle: {
        color: "#64748b",
        fontSize: 18,
        fontWeight: 500,
      },
    },
    tooltip: {
      backgroundColor: "rgba(255, 255, 255, 0.95)",
      borderColor: "#e2e8f0",
      borderWidth: 1,
      textStyle: {
        color: "#475569",
      },
      padding: [12, 16],
    },
    legend: {
      data: ["当前能力", "目标能力"],
      bottom: "5%",
      textStyle: {
        color: "#64748b",
        fontSize: 13,
      },
    },
    radar: {
      indicator: [
        { name: "技术能力", max: 100 },
        { name: "沟通能力", max: 100 },
        { name: "管理能力", max: 100 },
        { name: "创新能力", max: 100 },
        { name: "学习能力", max: 100 },
        { name: "执行力", max: 100 },
      ],
      radius: "60%",
      center: ["50%", "55%"],
      axisName: {
        color: "#64748b",
        fontSize: 13,
      },
      splitArea: {
        areaStyle: {
          color: ["rgba(96, 165, 250, 0.05)", "rgba(96, 165, 250, 0.1)"],
        },
      },
      splitLine: {
        lineStyle: {
          color: "#cbd5e1",
        },
      },
      axisLine: {
        lineStyle: {
          color: "#cbd5e1",
        },
      },
    },
    series: [
      {
        name: "能力评估",
        type: "radar",
        data: [
          {
            value: [85, 72, 68, 90, 88, 75],
            name: "当前能力",
            itemStyle: {
              color: "#818cf8",
            },
            areaStyle: {
              color: {
                type: "linear",
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  { offset: 0, color: "rgba(129, 140, 248, 0.5)" },
                  { offset: 1, color: "rgba(129, 140, 248, 0.1)" },
                ],
              },
            },
            lineStyle: {
              width: 2,
            },
            symbolSize: 6,
            symbol: "circle",
          },
          {
            value: [95, 85, 80, 95, 92, 90],
            name: "目标能力",
            itemStyle: {
              color: "#60a5fa",
            },
            areaStyle: {
              color: {
                type: "linear",
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  { offset: 0, color: "rgba(96, 165, 250, 0.3)" },
                  { offset: 1, color: "rgba(96, 165, 250, 0.05)" },
                ],
              },
            },
            lineStyle: {
              width: 2,
              type: "dashed",
            },
            symbolSize: 6,
            symbol: "circle",
          },
        ],
      },
    ],
  };

  radarChartInstance.setOption(option);
}

function handleResize() {
  lineChartInstance?.resize();
  barChartInstance?.resize();
  pieChartInstance?.resize();
  radarChartInstance?.resize();
}

onMounted(() => {
  initLineChart();
  initBarChart();
  initPieChart();
  initRadarChart();
  window.addEventListener("resize", handleResize);
});

onUnmounted(() => {
  window.removeEventListener("resize", handleResize);
  lineChartInstance?.dispose();
  barChartInstance?.dispose();
  pieChartInstance?.dispose();
  radarChartInstance?.dispose();
});
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-950 dark:to-slate-900 p-8">
    <div class="max-w-7xl mx-auto">
      <div class="text-center mb-12">
        <h1 class="text-4xl font-bold text-slate-800 dark:text-white mb-4">
          测试页面
        </h1>
        <p class="text-slate-500 dark:text-slate-400">
          ECharts 图表示例 - 浅色科技风格
        </p>
        <div class="mt-4">
          <NuxtLink
            to="/"
            class="text-blue-500 hover:text-blue-600 transition-colors font-medium"
          >
            ← 返回首页
          </NuxtLink>
        </div>
      </div>

      <!-- 折线图和柱状图 -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div class="bg-white dark:bg-slate-800 rounded-2xl shadow-lg shadow-slate-200/50 dark:shadow-slate-900/50 p-6">
          <div ref="lineChartRef" class="w-full h-[450px]" />
        </div>
        <div class="bg-white dark:bg-slate-800 rounded-2xl shadow-lg shadow-slate-200/50 dark:shadow-slate-900/50 p-6">
          <div ref="barChartRef" class="w-full h-[450px]" />
        </div>
      </div>

      <!-- 饼状图和雷达图 -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div class="bg-white dark:bg-slate-800 rounded-2xl shadow-lg shadow-slate-200/50 dark:shadow-slate-900/50 p-6">
          <div ref="pieChartRef" class="w-full h-[450px]" />
        </div>
        <div class="bg-white dark:bg-slate-800 rounded-2xl shadow-lg shadow-slate-200/50 dark:shadow-slate-900/50 p-6">
          <div ref="radarChartRef" class="w-full h-[450px]" />
        </div>
      </div>

      <!-- 数据统计卡片 -->
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div class="bg-white dark:bg-slate-800 rounded-xl p-5 shadow-sm">
          <div class="text-2xl font-bold text-blue-500 mb-2">
            2,420
          </div>
          <div class="text-slate-500 dark:text-slate-400 text-sm">
            总访问量
          </div>
        </div>
        <div class="bg-white dark:bg-slate-800 rounded-xl p-5 shadow-sm">
          <div class="text-2xl font-bold text-purple-500 mb-2">
            2,727
          </div>
          <div class="text-slate-500 dark:text-slate-400 text-sm">
            总销售额
          </div>
        </div>
        <div class="bg-white dark:bg-slate-800 rounded-xl p-5 shadow-sm">
          <div class="text-2xl font-bold text-indigo-500 mb-2">
            1,162
          </div>
          <div class="text-slate-500 dark:text-slate-400 text-sm">
            产品总量
          </div>
        </div>
        <div class="bg-white dark:bg-slate-800 rounded-xl p-5 shadow-sm">
          <div class="text-2xl font-bold text-pink-500 mb-2">
            478
          </div>
          <div class="text-slate-500 dark:text-slate-400 text-sm">
            综合评分
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>
