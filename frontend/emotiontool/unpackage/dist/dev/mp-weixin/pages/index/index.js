"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  __name: "index",
  setup(__props) {
    const currentDate = common_vendor.ref("");
    const luckData = common_vendor.ref({});
    const warmSentence = common_vendor.ref("");
    const tipContent = common_vendor.ref("");
    const luckList = [
      { level: "大吉", desc: "爱意升温，沟通顺畅，感情会有小惊喜～" },
      { level: "吉", desc: "心情愉悦，相处轻松，适合表达心意" },
      { level: "平", desc: "平淡安稳，保持耐心，细水长流" },
      { level: "温和", desc: "情绪平稳，互相理解，相处舒适" },
      { level: "小顺", desc: "小美好正在发生，放松心情就好" }
    ];
    const doList = [
      ["表达爱意", "主动聊天", "约会见面", "送小礼物"],
      ["倾听对方", "耐心沟通", "计划出行", "制造惊喜"],
      ["好好休息", "自我提升", "整理心情", "放松自己"],
      ["坦诚沟通", "换位思考", "主动认错", "给予拥抱"],
      ["调整心态", "保持微笑", "积极生活", "关爱自己"],
      ["分享日常", "温柔互动", "互相鼓励", "好好陪伴"],
      ["阅读听歌", "散步散心", "记录美好", "珍惜当下"]
    ];
    const notDoList = [
      ["冷战赌气", "过度猜疑", "口是心非", "情绪化"],
      ["敷衍回应", "强迫对方", "焦虑内耗", "攀比计较"],
      ["忽视感受", "过度依赖", "急躁冲动", "阴阳怪气"],
      ["熬夜emo", "自我否定", "钻牛角尖", "过度敏感"],
      ["逃避问题", "敷衍了事", "骄傲自大", "情绪上头"],
      ["翻旧账", "冷暴力", "忽冷忽热", "咄咄逼人"],
      ["轻易放弃", "胡思乱想", "指责抱怨", "失去耐心"]
    ];
    const warmList = [
      "慢慢来，谁不是翻山越岭去相爱",
      "你值得被温柔以待",
      "情绪会过去，但爱不会",
      "好好爱自己，是终身浪漫的开始",
      "今天也要保持开心呀",
      "陪伴是最长情的告白"
    ];
    const tipList = [
      "生气时先深呼吸10秒，再决定要不要说话",
      "再亲密的关系，也需要一点点距离",
      "不要因为别人的情绪，否定全部的自己",
      "难过的时候，允许自己哭一会儿",
      "被爱不需要你变得完美"
    ];
    const getToday = () => {
      const date = /* @__PURE__ */ new Date();
      const year = date.getFullYear();
      const month = (date.getMonth() + 1).toString().padStart(2, "0");
      const day = date.getDate().toString().padStart(2, "0");
      currentDate.value = `${year}-${month}-${day}`;
      return `${year}${month}${day}`;
    };
    const getFixedRandom = (max) => {
      const num = Number(getToday());
      return num % max;
    };
    const getRandom = (max) => {
      return Math.floor(Math.random() * max);
    };
    const initLuck = () => {
      const luckIndex = getFixedRandom(luckList.length);
      luckData.value = {
        level: luckList[luckIndex].level,
        desc: luckList[luckIndex].desc,
        do: doList[getFixedRandom(doList.length)],
        notDo: notDoList[getFixedRandom(notDoList.length)]
      };
    };
    const refreshWords = () => {
      warmSentence.value = warmList[getRandom(warmList.length)];
      tipContent.value = tipList[getRandom(tipList.length)];
    };
    const luckLevelClass = common_vendor.computed(() => {
      const l = luckData.value.level || "";
      if (l.includes("大吉"))
        return "luck-daji";
      if (l.includes("吉"))
        return "luck-ji";
      return "luck-ping";
    });
    const moodList = common_vendor.ref([
      { emoji: "😄", name: "开心" },
      { emoji: "😌", name: "平静" },
      { emoji: "😔", name: "低落" },
      { emoji: "😤", name: "烦躁" },
      { emoji: "🥰", name: "甜蜜" }
    ]);
    const currentMood = common_vendor.ref(0);
    const dayList = common_vendor.ref([]);
    const weekMood = common_vendor.ref([]);
    const moodScore = [70, 60, 30, 40, 80];
    const getWeekDays = () => {
      const weekNames = ["日", "一", "二", "三", "四", "五", "六"];
      const list = [];
      const days = [];
      for (let i = 6; i >= 0; i--) {
        const date = /* @__PURE__ */ new Date();
        date.setDate(date.getDate() - i);
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");
        list.push(`mood_${month}${day}`);
        days.push(weekNames[date.getDay()]);
      }
      return { keys: list, days };
    };
    const initWeekMood = () => {
      const { keys, days } = getWeekDays();
      dayList.value = days;
      const moodData = [];
      keys.forEach((key) => {
        moodData.push(common_vendor.index.getStorageSync(key) || 50);
      });
      weekMood.value = moodData;
    };
    const setMood = (idx) => {
      currentMood.value = idx;
      const today = /* @__PURE__ */ new Date();
      const month = String(today.getMonth() + 1).padStart(2, "0");
      const day = String(today.getDate()).padStart(2, "0");
      const todayKey = `mood_${month}${day}`;
      common_vendor.index.setStorageSync("todayMood", idx);
      common_vendor.index.setStorageSync(todayKey, moodScore[idx]);
      initWeekMood();
      common_vendor.index.showToast({
        title: `已标记：${moodList.value[idx].name}`,
        icon: "none"
      });
    };
    const goTest = () => {
      common_vendor.index.showModal({
        title: "情感小测试",
        content: "即将跳转到恋爱人格测试页面",
        confirmText: "前往",
        success() {
          common_vendor.index.navigateTo({
            url: "/pages/test/test"
          });
        }
      });
    };
    common_vendor.onMounted(() => {
      initLuck();
      refreshWords();
      initWeekMood();
      const local = common_vendor.index.getStorageSync("todayMood");
      if (local)
        currentMood.value = local;
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.t(currentDate.value),
        b: common_vendor.t(luckData.value.level),
        c: common_vendor.t(luckData.value.desc),
        d: common_vendor.f(luckData.value.do, (item, index, i0) => {
          return {
            a: common_vendor.t(item),
            b: index
          };
        }),
        e: common_vendor.f(luckData.value.notDo, (item, index, i0) => {
          return {
            a: common_vendor.t(item),
            b: index
          };
        }),
        f: common_vendor.n(luckLevelClass.value),
        g: common_vendor.f(moodList.value, (item, idx, i0) => {
          return {
            a: common_vendor.t(item.emoji),
            b: common_vendor.t(item.name),
            c: idx,
            d: idx == currentMood.value ? 1 : "",
            e: common_vendor.o(($event) => setMood(idx), idx)
          };
        }),
        h: common_vendor.o(goTest),
        i: common_vendor.f(weekMood.value, (item, idx, i0) => {
          return {
            a: item + "px",
            b: common_vendor.t(dayList.value[idx]),
            c: idx
          };
        }),
        j: common_vendor.t(warmSentence.value),
        k: common_vendor.t(tipContent.value)
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-1cf27b2a"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/index/index.js.map
