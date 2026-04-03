export default defineEventHandler(async (event): Promise<any> => {
  const response = await $fetch("https://oooooooooooooo.xiangmuchan.cn/api/auth.php", {
    method: "POST",
    headers: {
      Cookie: "MGXCX_SESSID=nbaf5pvv9m5v3oo3ru9kqaak50; server_name_session=7e2401bb60f91bc4420a286dcbc8e873; PHPSESSID=een00aeom5dggjis0c73e3t6k3",
    },
    body: {
      title: "年后狂减22斤！\n\n训练饮食攻略来啦✨",
      content: "家人们，年后恢复训练那叫一个酸爽啊😅力量好像是变小了一丢丢，不过肌肉量倒是稳稳的。\n\n给大家分享下我的减脂计划~ 🥣饮食上，早餐我就吃土豆、鸡蛋和蓝莓；\n午餐是小面、凉白肉和豌豆尖；\n晚餐来个鸡腿堡；\n练完后再吃点碱水吐司，来一勺蛋白粉。\n\n🏋️训练计划超丰富哒！\n\n周一是胸和三头肌训练，再爬10分钟楼梯。\n\n上斜哑铃卧推、杠铃平板卧推这些都安排上。\n\n周二练背和腹肌。\n\n周三练腿和二头肌。\n\n周四和周一一样，周五和周二一样。\n\n周六就练肩、二头肌和腹肌。\n\n周日就好好休息一天💪 还有件事儿不得不说😎之前20岁生日爸妈送了我块劳力士手表🎊当时可把我高兴坏了！\n\n但平时基本戴不上，放家里闲置怪可惜的。\n\n朋友给我介绍了爱回收，百家竞价模式超棒，信息一上传，好多商家在线出价，价高者得，完全不用担心被压价。\n\n最后卖的价格比其他平台高了将近6500块呢👍而且当面回收当面打款，从质检到打款不到半小时，效率杠杠的！\n\n全国还有2000+门店，我练完肩顺路就去了，运动服都没换超方便🤣下次把家里老爸的爱彼、弟弟不戴的电子表都拿去换钱！\n\n#见人不如健身 #三分吃七分练 #减脂 #健康饮食 #减肥餐 #爱回收奢侈品回收 #爱回收门店收表 #爱回收 #深圳奢侈品回收 #自律",
      images: [
        "https://oooooooooooooo.xiangmuchan.cn/uploads/enhanced_smart/smart_1775114955_71129.jpg",
        "https://oooooooooooooo.xiangmuchan.cn/uploads/enhanced_smart/smart_1775114955_18533.jpg",
        "https://oooooooooooooo.xiangmuchan.cn/uploads/enhanced_smart/smart_1775114955_35211.jpg",
        "https://oooooooooooooo.xiangmuchan.cn/uploads/enhanced_smart/smart_1775114956_97263.jpg",
        "https://oooooooooooooo.xiangmuchan.cn/uploads/enhanced_smart/smart_1775114956_95337.jpg",
        "https://oooooooooooooo.xiangmuchan.cn/uploads/enhanced_smart/smart_1775114956_54386.jpg",
        "https://oooooooooooooo.xiangmuchan.cn/uploads/enhanced_smart/smart_1775114957_29577.jpg",
      ],
      type: "normal",
    },
  });

  // 添加 CORS 头
  appendCorsHeaders(event, {
    origin: "*",
    methods: ["GET", "POST", "OPTIONS"],
  });

  return response;
});
