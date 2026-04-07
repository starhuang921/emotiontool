"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const emotionData = require("../../emotionData.js");
const _sfc_main = {
  __name: "EmotionGuide",
  setup(__props) {
    const emotionList = common_vendor.ref([]);
    common_vendor.onLoad(() => {
      emotionList.value = emotionData.emotionData;
    });
    function goDetail(id) {
      common_vendor.index.navigateTo({
        url: `/pages/details/details?id=${id}`
      });
    }
    function toTop() {
      common_vendor.index.pageScrollTo({
        scrollTop: 0,
        duration: 300
      });
    }
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(emotionList.value, (item, k0, i0) => {
          return {
            a: item.image + "?id=" + item.id,
            b: common_vendor.t(item.title),
            c: common_vendor.t(item.introduce),
            d: item.id,
            e: common_vendor.o(($event) => goDetail(item.id), item.id)
          };
        }),
        b: common_assets._imports_0,
        c: common_vendor.o(toTop)
      };
    };
  }
};
wx.createPage(_sfc_main);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/EmotionGuide/EmotionGuide.js.map
