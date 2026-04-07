<template>
  <view class="container">
    <view class="card">
      <text class="title">💌 情书生成器</text>

      <!-- 对方称呼 -->
      <view class="item">
        <text class="label">对方称呼</text>
        <input class="input" v-model="form.toName" placeholder="例如：亲爱的宝贝" />
      </view>

      <!-- 你的称呼 -->
      <view class="item">
        <text class="label">你的称呼</text>
        <input class="input" v-model="form.fromName" placeholder="例如：爱你的XX" />
      </view>

      <!-- 风格选择 -->
      <view class="item">
        <text class="label">情书风格</text>
        <picker @change="onStyleChange" :value="styleIndex" :range="styleList">
          <view class="picker">{{ styleList[styleIndex] }}</view>
        </picker>
      </view>

      <!-- 生成按钮 -->
      <button class="btn" :loading="loading" @click="generate">
        {{ loading ? '生成中...' : '一键生成情书' }}
      </button>
    </view>

    <!-- 结果展示 -->
    <view class="card result" v-if="resultContent">
      <text class="title">生成结果</text>
      <view class="content">{{ resultContent }}</view>
      <button class="copy-btn" @click="copy">复制文本</button>
    </view>
  </view>
</template>

<script setup>
import { ref } from 'vue'

// 表单
const form = ref({
  toName: '',
  fromName: '',
  style: '温柔深情'
})

// 风格
const styleIndex = ref(0)
const styleList = ref([
  '温柔深情',
  '可爱甜妹',
  '文艺浪漫',
  '简短走心',
  '土味情话'
])

const baseUrl = (function() {
  // #ifdef H5
    // 浏览器
    return 'http://localhost:8080';
  // #endif
  
  // #ifdef MP-WEIXIN || APP || MP-ALIPAY || MP-BAIDU || MP-TOUTIAO || MP-QQ
    // 真机 / 模拟器 / 小程序 
    return '本机ip'; 
  // #endif
})();

const loading = ref(false)
const resultContent = ref('')

// 选择风格
function onStyleChange(e) {
  const idx = e.detail.value
  styleIndex.value = idx
  form.value.style = styleList.value[idx]
}

// ======================
// 调用 Java 后端接口
// ======================
async function generate() {
  if (!form.value.toName) {
    uni.showToast({ title: '请填写对方称呼', icon: 'none' })
    return
  }

  loading.value = true
  resultContent.value = ''

  try {
    // 全平台兼容（H5 / 小程序 / App ）
    uni.request({
       url: baseUrl + '/api/love/letter',
      method: 'POST',
      data: {
        toName: form.value.toName,
        fromName: form.value.fromName,
        style: form.value.style
      },
      success: (res) => {
        console.log("后端返回：", res.data)
        if (res.data.code === 200) {
          resultContent.value = res.data.data
          uni.showToast({ title: '生成成功', icon: 'success' })
        } else {
          uni.showToast({ title: res.data.msg || '生成失败', icon: 'none' })
        }
      },
      fail: (err) => {
        console.error("请求失败：", err)
        uni.showToast({ title: '请求失败', icon: 'none' })
      },
      complete: () => {
        loading.value = false
      }
    })

  } catch (err) {
    console.error("错误：", err)
    uni.showToast({ title: '请求异常', icon: 'none' })
    loading.value = false
  }
}

// 复制
function copy() {
  uni.setClipboardData({
    data: resultContent.value,
    success: () => {
      uni.showToast({ title: '复制成功' })
    }
  })
}
</script>

<style lang="scss" scoped>
.container {
  width: 750rpx;
  min-height: 100vh;
  background: #f9fafc;
  padding: 20rpx;
  box-sizing: border-box;
}

.card {
  background: #fff;
  border-radius: 24rpx;
  padding: 30rpx;
  margin-bottom: 30rpx;
  box-shadow: 0 4rpx 15rpx rgba(0, 0, 0, 0.05);

  .title {
    font-size: 32rpx;
    font-weight: bold;
    text-align: center;
    display: block;
    margin-bottom: 30rpx;
  }
}

.item {
  margin-bottom: 24rpx;

  .label {
    font-size: 26rpx;
    color: #333;
    margin-bottom: 10rpx;
    display: block;
  }
}

.input, .picker {
  width: 100%;
  height: 80rpx;
  background: #f9fafc;
  border-radius: 12rpx;
  padding: 0 20rpx;
  font-size: 26rpx;
  box-sizing: border-box;
  display: flex;
  align-items: center;
}

.btn {
  background: #ff6b9d;
  color: #fff;
  border-radius: 44rpx;
  border: none;
  padding: 22rpx;
  font-size: 28rpx;
  margin-top: 20rpx;
}

/* 结果 */
.result {
  .content {
    font-size: 26rpx;
    color: #333;
    line-height: 1.8;
    padding: 20rpx;
    background: #fdf6f9;
    border-radius: 16rpx;
    margin-bottom: 20rpx;
  }
}

.copy-btn {
  background: #f0f0f0;
  color: #333;
  border-radius: 44rpx;
  border: none;
  padding: 18rpx;
  font-size: 24rpx;
}
</style>