"use strict";
const common_vendor = require("../../common/vendor.js");
const emotionData = require("../../emotionData.js");
const _sfc_main = {
  __name: "details",
  setup(__props) {
    const currentData = common_vendor.ref({});
    common_vendor.onLoad((option) => {
      const id = parseInt(option.id);
      currentData.value = emotionData.emotionData.find((item) => item.id === id) || {};
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.t(currentData.value.title),
        b: common_vendor.t(currentData.value.introduce),
        c: common_vendor.t(currentData.value.suggest)
      };
    };
  }
};
wx.createPage(_sfc_main);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/details/details.js.map
