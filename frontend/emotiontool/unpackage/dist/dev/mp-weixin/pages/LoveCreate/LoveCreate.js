"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  __name: "LoveCreate",
  setup(__props) {
    const form = common_vendor.ref({
      toName: "",
      fromName: "",
      style: "温柔深情"
    });
    const styleIndex = common_vendor.ref(0);
    const styleList = common_vendor.ref([
      "温柔深情",
      "可爱甜妹",
      "文艺浪漫",
      "简短走心",
      "土味情话"
    ]);
    const baseUrl = /* @__PURE__ */ function() {
      return "本机ip";
    }();
    const loading = common_vendor.ref(false);
    const resultContent = common_vendor.ref("");
    function onStyleChange(e) {
      const idx = e.detail.value;
      styleIndex.value = idx;
      form.value.style = styleList.value[idx];
    }
    async function generate() {
      if (!form.value.toName) {
        common_vendor.index.showToast({ title: "请填写对方称呼", icon: "none" });
        return;
      }
      loading.value = true;
      resultContent.value = "";
      try {
        common_vendor.index.request({
          url: baseUrl + "/api/love/letter",
          method: "POST",
          data: {
            toName: form.value.toName,
            fromName: form.value.fromName,
            style: form.value.style
          },
          success: (res) => {
            common_vendor.index.__f__("log", "at pages/LoveCreate/LoveCreate.vue:106", "后端返回：", res.data);
            if (res.data.code === 200) {
              resultContent.value = res.data.data;
              common_vendor.index.showToast({ title: "生成成功", icon: "success" });
            } else {
              common_vendor.index.showToast({ title: res.data.msg || "生成失败", icon: "none" });
            }
          },
          fail: (err) => {
            common_vendor.index.__f__("error", "at pages/LoveCreate/LoveCreate.vue:115", "请求失败：", err);
            common_vendor.index.showToast({ title: "请求失败", icon: "none" });
          },
          complete: () => {
            loading.value = false;
          }
        });
      } catch (err) {
        common_vendor.index.__f__("error", "at pages/LoveCreate/LoveCreate.vue:124", "错误：", err);
        common_vendor.index.showToast({ title: "请求异常", icon: "none" });
        loading.value = false;
      }
    }
    function copy() {
      common_vendor.index.setClipboardData({
        data: resultContent.value,
        success: () => {
          common_vendor.index.showToast({ title: "复制成功" });
        }
      });
    }
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: form.value.toName,
        b: common_vendor.o(($event) => form.value.toName = $event.detail.value),
        c: form.value.fromName,
        d: common_vendor.o(($event) => form.value.fromName = $event.detail.value),
        e: common_vendor.t(styleList.value[styleIndex.value]),
        f: common_vendor.o(onStyleChange),
        g: styleIndex.value,
        h: styleList.value,
        i: common_vendor.t(loading.value ? "生成中..." : "一键生成情书"),
        j: loading.value,
        k: common_vendor.o(generate),
        l: resultContent.value
      }, resultContent.value ? {
        m: common_vendor.t(resultContent.value),
        n: common_vendor.o(copy)
      } : {});
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-ed7cbc1f"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/LoveCreate/LoveCreate.js.map
