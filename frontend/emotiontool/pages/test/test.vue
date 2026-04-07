<template>
  <view class="container">
    <!-- 标题 -->
    <view class="header">
      <view class="title">情感小测试</view>
      <text class="subtitle">测一测你的恋爱人格</text>
    </view>

    <!-- 题目区域 -->
    <view class="card" v-if="!result">
      <view class="progress">当前进度：{{ currentQ + 1 }} / 6</view>
      <view class="q-title">Q{{ currentQ + 1 }}. {{ questions[currentQ].title }}</view>
      <view class="options">
        <view
          class="option-item"
          v-for="(opt, idx) in questions[currentQ].options"
          :key="idx"
          @click="select(idx)"
        >
          {{ opt.label }}
        </view>
      </view>
    </view>

    <!-- 结果区域 -->
    <view class="card result-card" v-else>
      <view class="result-title">你的恋爱人格是</view>
      <view class="result-type">{{ resultData.type }}</view>
      <view class="result-desc">{{ resultData.desc }}</view>
      <button class="restart-btn" @click="restart">重新测试</button>
    </view>
  </view>
</template>

<script setup>
import { ref } from 'vue'

// 6 道题目
const questions = [
  {
    title: '吵架后你通常会？',
    options: [
      { label: '主动哄对方，不想冷战', score: 4 },
      { label: '冷静一下，再好好沟通', score: 3 },
      { label: '等对方先来找我', score: 2 },
      { label: '越想越气，不想理人', score: 1 }
    ]
  },
  {
    title: '你更在意对方的？',
    options: [
      { label: '陪伴与耐心', score: 4 },
      { label: '浪漫与仪式感', score: 3 },
      { label: '忠诚与安全感', score: 2 },
      { label: '独立与个人空间', score: 1 }
    ]
  },
  {
    title: '你最喜欢的相处模式？',
    options: [
      { label: '天天黏在一起', score: 4 },
      { label: '亲密但有各自生活', score: 3 },
      { label: '偶尔见面更珍惜', score: 2 },
      { label: '保持距离感最舒服', score: 1 }
    ]
  },
  {
    title: '对方忘记重要日子，你会？',
    options: [
      { label: '有点难过，但会提醒', score: 4 },
      { label: '假装不在意，心里失落', score: 3 },
      { label: '直接表达不开心', score: 2 },
      { label: '觉得无所谓', score: 1 }
    ]
  },
  {
    title: '面对喜欢的人，你通常？',
    options: [
      { label: '勇敢主动表达心意', score: 4 },
      { label: '默默对对方好', score: 3 },
      { label: '等对方先主动', score: 2 },
      { label: '假装不在意，口是心非', score: 1 }
    ]
  },
  {
    title: '你理想中的爱情是？',
    options: [
      { label: '热烈又坚定', score: 4 },
      { label: '安稳又长久', score: 3 },
      { label: '轻松又快乐', score: 2 },
      { label: '自由不被束缚', score: 1 }
    ]
  }
]

const currentQ = ref(0)
const score = ref(0)
const result = ref(false)
const resultData = ref({})

// 选择答案
function select(index) {
  score.value += questions[currentQ.value].options[index].score
  if (currentQ.value < questions.length - 1) {
    currentQ.value++
  } else {
    getResult()
  }
}

// 计算结果
function getResult() {
  let s = score.value
  let data

  if (s >= 19) {
    data = {
      type: '温柔付出型',
      desc: '你在恋爱里真诚又温柔，愿意为对方付出，重视感受，是让人安心又珍惜的恋人。'
    }
  } else if (s >= 14) {
    data = {
      type: '平衡理智型',
      desc: '你成熟通透，懂爱也懂自我，相处舒服不压抑，能给对方足够的安全感。'
    }
  } else if (s >= 9) {
    data = {
      type: '慢热敏感型',
      desc: '你不轻易敞开心扉，看似冷静，其实内心柔软，需要被坚定选择和耐心对待。'
    }
  } else {
    data = {
      type: '独立自我型',
      desc: '你习惯保护自己，重视自由与空间，不爱依赖别人，其实内心也渴望被理解。'
    }
  }

  resultData.value = data
  result.value = true
}

// 重新测试
function restart() {
  currentQ.value = 0
  score.value = 0
  result.value = false
}
</script>

<style lang="scss" scoped>
.container {
  width: 750rpx;
  min-height: 100vh;
  background: #f9fafc;
  padding: 40rpx 30rpx;
  box-sizing: border-box;
}

.header {
  text-align: center;
  margin-bottom: 30rpx;
  .title {
    font-size: 42rpx;
    font-weight: bold;
    color: #333;
  }
  .subtitle {
    font-size: 26rpx;
    color: #999;
    margin-top: 10rpx;
  }
}

.progress{
  font-size: 24rpx;
  color: #ff6b9d;
  margin-bottom: 20rpx;
}

.card {
  background: #fff;
  border-radius: 28rpx;
  padding: 40rpx;
  box-shadow: 0 4rpx 20rpx rgba(0, 0, 0, 0.05);
}

.q-title {
  font-size: 32rpx;
  font-weight: bold;
  color: #333;
  margin-bottom: 40rpx;
  line-height: 1.5;
}

.options {
  display: flex;
  flex-direction: column;
  gap: 20rpx;
}

.option-item {
  padding: 28rpx;
  border: 2rpx solid #eee;
  border-radius: 16rpx;
  font-size: 28rpx;
  color: #555;
  text-align: center;
  transition: 0.2s;

  &:active {
    background: #fff6f9;
    border-color: #ff6b9d;
    color: #ff6b9d;
  }
}

/* 结果 */
.result-card {
  text-align: center;
  padding: 60rpx 40rpx;
}

.result-title {
  font-size: 28rpx;
  color: #999;
}

.result-type {
  font-size: 44rpx;
  font-weight: bold;
  color: #ff6b9d;
  margin: 20rpx 0;
}

.result-desc {
  font-size: 28rpx;
  color: #666;
  line-height: 1.7;
  margin-bottom: 50rpx;
}

.restart-btn {
  background: #ff6b9d;
  color: #fff;
  border: none;
  border-radius: 50rpx;
  padding: 22rpx 60rpx;
  font-size: 28rpx;
}
</style>