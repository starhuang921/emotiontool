"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  __name: "test",
  setup(__props) {
    const questions = [
      {
        title: "吵架后你通常会？",
        options: [
          { label: "主动哄对方，不想冷战", score: 4 },
          { label: "冷静一下，再好好沟通", score: 3 },
          { label: "等对方先来找我", score: 2 },
          { label: "越想越气，不想理人", score: 1 }
        ]
      },
      {
        title: "你更在意对方的？",
        options: [
          { label: "陪伴与耐心", score: 4 },
          { label: "浪漫与仪式感", score: 3 },
          { label: "忠诚与安全感", score: 2 },
          { label: "独立与个人空间", score: 1 }
        ]
      },
      {
        title: "你最喜欢的相处模式？",
        options: [
          { label: "天天黏在一起", score: 4 },
          { label: "亲密但有各自生活", score: 3 },
          { label: "偶尔见面更珍惜", score: 2 },
          { label: "保持距离感最舒服", score: 1 }
        ]
      },
      {
        title: "对方忘记重要日子，你会？",
        options: [
          { label: "有点难过，但会提醒", score: 4 },
          { label: "假装不在意，心里失落", score: 3 },
          { label: "直接表达不开心", score: 2 },
          { label: "觉得无所谓", score: 1 }
        ]
      },
      {
        title: "面对喜欢的人，你通常？",
        options: [
          { label: "勇敢主动表达心意", score: 4 },
          { label: "默默对对方好", score: 3 },
          { label: "等对方先主动", score: 2 },
          { label: "假装不在意，口是心非", score: 1 }
        ]
      },
      {
        title: "你理想中的爱情是？",
        options: [
          { label: "热烈又坚定", score: 4 },
          { label: "安稳又长久", score: 3 },
          { label: "轻松又快乐", score: 2 },
          { label: "自由不被束缚", score: 1 }
        ]
      }
    ];
    const currentQ = common_vendor.ref(0);
    const score = common_vendor.ref(0);
    const result = common_vendor.ref(false);
    const resultData = common_vendor.ref({});
    function select(index) {
      score.value += questions[currentQ.value].options[index].score;
      if (currentQ.value < questions.length - 1) {
        currentQ.value++;
      } else {
        getResult();
      }
    }
    function getResult() {
      let s = score.value;
      let data;
      if (s >= 19) {
        data = {
          type: "温柔付出型",
          desc: "你在恋爱里真诚又温柔，愿意为对方付出，重视感受，是让人安心又珍惜的恋人。"
        };
      } else if (s >= 14) {
        data = {
          type: "平衡理智型",
          desc: "你成熟通透，懂爱也懂自我，相处舒服不压抑，能给对方足够的安全感。"
        };
      } else if (s >= 9) {
        data = {
          type: "慢热敏感型",
          desc: "你不轻易敞开心扉，看似冷静，其实内心柔软，需要被坚定选择和耐心对待。"
        };
      } else {
        data = {
          type: "独立自我型",
          desc: "你习惯保护自己，重视自由与空间，不爱依赖别人，其实内心也渴望被理解。"
        };
      }
      resultData.value = data;
      result.value = true;
    }
    function restart() {
      currentQ.value = 0;
      score.value = 0;
      result.value = false;
    }
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: !result.value
      }, !result.value ? {
        b: common_vendor.t(currentQ.value + 1),
        c: common_vendor.t(currentQ.value + 1),
        d: common_vendor.t(questions[currentQ.value].title),
        e: common_vendor.f(questions[currentQ.value].options, (opt, idx, i0) => {
          return {
            a: common_vendor.t(opt.label),
            b: idx,
            c: common_vendor.o(($event) => select(idx), idx)
          };
        })
      } : {
        f: common_vendor.t(resultData.value.type),
        g: common_vendor.t(resultData.value.desc),
        h: common_vendor.o(restart)
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-727d09f0"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/test/test.js.map
