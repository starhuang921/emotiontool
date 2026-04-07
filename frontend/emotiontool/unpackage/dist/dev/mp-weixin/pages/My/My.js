"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const _sfc_main = {
  __name: "My",
  setup(__props) {
    const username = common_vendor.ref("");
    const sign = common_vendor.ref("");
    const todayContent = common_vendor.ref("");
    const diaryList = common_vendor.ref([]);
    common_vendor.onShow(() => {
      loadUserInfo();
      loadDiaryList();
    });
    function loadUserInfo() {
      username.value = common_vendor.index.getStorageSync("username") || "";
      sign.value = common_vendor.index.getStorageSync("sign") || "";
    }
    function editName() {
      common_vendor.index.showModal({
        title: "修改昵称",
        editable: true,
        placeholder: "请输入昵称",
        success: (res) => {
          if (res.confirm && res.content) {
            username.value = res.content;
            common_vendor.index.setStorageSync("username", res.content);
          }
        }
      });
    }
    function editSign() {
      common_vendor.index.showModal({
        title: "修改个性签名",
        editable: true,
        placeholder: "请输入签名",
        success: (res) => {
          if (res.confirm && res.content) {
            sign.value = res.content;
            common_vendor.index.setStorageSync("sign", res.content);
          }
        }
      });
    }
    function saveDiary() {
      if (!todayContent.value.trim()) {
        common_vendor.index.showToast({ title: "请输入内容", icon: "none" });
        return;
      }
      const d = /* @__PURE__ */ new Date();
      const date = `${d.getMonth() + 1}-${d.getDate()}`;
      let list = common_vendor.index.getStorageSync("diaryList") || [];
      list = list.filter((item) => item.date !== date);
      list.unshift({ date, content: todayContent.value });
      common_vendor.index.setStorageSync("diaryList", list);
      common_vendor.index.showToast({ title: "保存成功" });
      todayContent.value = "";
      loadDiaryList();
    }
    function loadDiaryList() {
      diaryList.value = common_vendor.index.getStorageSync("diaryList") || [];
    }
    function deleteDiary(index) {
      common_vendor.index.showModal({
        title: "提示",
        content: "确定要删除这条日记吗？",
        success: (res) => {
          if (res.confirm) {
            let list = common_vendor.index.getStorageSync("diaryList") || [];
            list.splice(index, 1);
            common_vendor.index.setStorageSync("diaryList", list);
            loadDiaryList();
            common_vendor.index.showToast({ title: "删除成功" });
          }
        }
      });
    }
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_assets._imports_0$1,
        b: common_vendor.t(username.value || "点击设置昵称"),
        c: common_vendor.o(editName),
        d: common_vendor.t(sign.value || "点击设置个性签名"),
        e: common_vendor.o(editSign),
        f: todayContent.value,
        g: common_vendor.o(($event) => todayContent.value = $event.detail.value),
        h: common_vendor.o(saveDiary),
        i: common_vendor.f(diaryList.value, (item, idx, i0) => {
          return {
            a: common_vendor.t(item.date),
            b: common_vendor.t(item.content),
            c: common_vendor.o(($event) => deleteDiary(idx), idx),
            d: idx
          };
        }),
        j: diaryList.value.length === 0
      }, diaryList.value.length === 0 ? {} : {});
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-8f9a99c0"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/My/My.js.map
