<template>
  <view class="content">
    <!-- 顶部标题 -->
    <view class="header">
      <view class="title">今日情感运势</view>
      <text class="date">{{ currentDate }}</text>
    </view>

    <!-- 今日运势卡片 -->
    <view class="luck-card" :class="luckLevelClass">
      <view class="luck-level">{{ luckData.level }}</view>
      <view class="luck-desc">{{ luckData.desc }}</view>

      <view class="item-group">
        <text class="label good">今日宜</text>
        <view class="tags">
          <text class="tag good-tag" v-for="(item, index) in luckData.do" :key="index">{{ item }}</text>
        </view>
      </view>

      <view class="item-group">
        <text class="label bad">今日避免</text>
        <view class="tags">
          <text class="tag bad-tag" v-for="(item, index) in luckData.notDo" :key="index">{{ item }}</text>
        </view>
      </view>
    </view>

    <!-- 1. 今日心情打卡 -->
    <view class="mood-card">
      <view class="mood-title">
        <text>今日心情</text>
        <text class="tip">点击切换</text>
      </view>
      <view class="mood-list">
        <view
          class="mood-item"
          v-for="(item, idx) in moodList"
          :key="idx"
          :class="{ active: idx == currentMood }"
          @click="setMood(idx)"
        >
          <text class="emoji">{{ item.emoji }}</text>
          <text class="text">{{ item.name }}</text>
        </view>
      </view>
    </view>

    <!-- 2. 情感小测试 -->
    <view class="test-card" @click="goTest">
      <view class="test-left">
        <text class="test-icon">🧪</text>
        <text class="test-title">情感小测试</text>
      </view>
      <view class="test-right">
        <text>测一测你的恋爱人格 →</text>
      </view>
    </view>

    <!-- 3. 最近7天心情统计（正确柱状图） -->
    <view class="chart-card">
      <text class="chart-title">最近心情波动</text>
      <view class="chart-box">
        <view class="bar-group">
          <view class="bar-item" v-for="(item, idx) in weekMood" :key="idx">
            <view class="bar" :style="{ height: item + 'px' }"></view>
            <text class="day">{{ dayList[idx] }}</text>
          </view>
        </view>
      </view>
    </view>

    <!-- 4. 暖心一句 + 小贴士 -->
    <view class="warm-card">
      <text class="warm-title">暖心一句</text>
      <text class="warm-content">{{ warmSentence }}</text>
    </view>

    <view class="tip-card">
      <text class="tip-title">情感小贴士</text>
      <text class="tip-content">{{ tipContent }}</text>
    </view>
  </view>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';

// ====================== 日期 & 运势 ======================
const currentDate = ref('')
const luckData = ref({})
const warmSentence = ref('')
const tipContent = ref('')

const luckList = [
  { level: '大吉', desc: '爱意升温，沟通顺畅，感情会有小惊喜～' },
  { level: '吉', desc: '心情愉悦，相处轻松，适合表达心意' },
  { level: '平', desc: '平淡安稳，保持耐心，细水长流' },
  { level: '温和', desc: '情绪平稳，互相理解，相处舒适' },
  { level: '小顺', desc: '小美好正在发生，放松心情就好' }
]
const doList = [
  ['表达爱意', '主动聊天', '约会见面', '送小礼物'],
  ['倾听对方', '耐心沟通', '计划出行', '制造惊喜' ],
  ['好好休息', '自我提升', '整理心情', '放松自己'],
  ['坦诚沟通', '换位思考', '主动认错', '给予拥抱'],
  ['调整心态', '保持微笑', '积极生活', '关爱自己'],
  ['分享日常', '温柔互动','互相鼓励', '好好陪伴'],
  ['阅读听歌', '散步散心','记录美好', '珍惜当下']
]
const notDoList = [
  ['冷战赌气', '过度猜疑', '口是心非', '情绪化'],
  ['敷衍回应', '强迫对方', '焦虑内耗', '攀比计较'],
  ['忽视感受', '过度依赖', '急躁冲动', '阴阳怪气'],
  ['熬夜emo', '自我否定', '钻牛角尖', '过度敏感'],
  ['逃避问题', '敷衍了事', '骄傲自大', '情绪上头'],
  ['翻旧账', '冷暴力', '忽冷忽热', '咄咄逼人'],
  ['轻易放弃', '胡思乱想', '指责抱怨', '失去耐心']
]
const warmList = [
  '慢慢来，谁不是翻山越岭去相爱',
  '你值得被温柔以待',
  '情绪会过去，但爱不会',
  '好好爱自己，是终身浪漫的开始',
  '今天也要保持开心呀',
  '陪伴是最长情的告白'
]
const tipList = [
  '生气时先深呼吸10秒，再决定要不要说话',
  '再亲密的关系，也需要一点点距离',
  '不要因为别人的情绪，否定全部的自己',
  '难过的时候，允许自己哭一会儿',
  '被爱不需要你变得完美'
]

// 获取今天日期
const getToday = () => {
  const date = new Date()
  const year = date.getFullYear()
  const month = (date.getMonth() + 1).toString().padStart(2, '0')
  const day = date.getDate().toString().padStart(2, '0')
  currentDate.value = `${year}-${month}-${day}`
  return `${year}${month}${day}`
}

// 按日期固定随机 → 只给运势用
const getFixedRandom = (max) => {
  const num = Number(getToday())
  return num % max
}

// 完全随机 → 给暖心一句、小贴士用
const getRandom = (max) => {
  return Math.floor(Math.random() * max)
}

// 初始化今日运势（一天一变）
const initLuck = () => {
  const luckIndex = getFixedRandom(luckList.length)
  luckData.value = {
    level: luckList[luckIndex].level,
    desc: luckList[luckIndex].desc,
    do: doList[getFixedRandom(doList.length)],
    notDo: notDoList[getFixedRandom(notDoList.length)]
  }
}

// 随机刷新暖心一句 + 小贴士（每次进页面都变）
const refreshWords = () => {
  warmSentence.value = warmList[getRandom(warmList.length)]
  tipContent.value = tipList[getRandom(tipList.length)]
}

const luckLevelClass = computed(() => {
  const l = luckData.value.level || ''
  if (l.includes('大吉')) return 'luck-daji'
  if (l.includes('吉')) return 'luck-ji'
  return 'luck-ping'
})

// ====================== 心情打卡 ======================
const moodList = ref([
  { emoji: '😄', name: '开心' },
  { emoji: '😌', name: '平静' },
  { emoji: '😔', name: '低落' },
  { emoji: '😤', name: '烦躁' },
  { emoji: '🥰', name: '甜蜜' }
])
const currentMood = ref(0)

// ====================== 修复：正确的近7天图表 ======================
const dayList = ref([]) // 动态星期几
const weekMood = ref([])
const moodScore = [70, 60, 30, 40, 80]

// 获取近7天每一天的日期键 + 星期几
const getWeekDays = () => {
  const weekNames = ['日', '一', '二', '三', '四', '五', '六']
  const list = []
  const days = []
  
  for (let i = 6; i >= 0; i--) {
    const date = new Date()
    date.setDate(date.getDate() - i)
    
    // 存储键：MMDD
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    list.push(`mood_${month}${day}`)
    
    // 显示文字：星期X
    days.push(weekNames[date.getDay()])
  }
  
  return { keys: list, days }
}

// 初始化7天数据
const initWeekMood = () => {
  const { keys, days } = getWeekDays()
  dayList.value = days
  
  const moodData = []
  keys.forEach(key => {
    moodData.push(uni.getStorageSync(key) || 50)
  })
  weekMood.value = moodData
}

// 设置今天心情
const setMood = (idx) => {
  currentMood.value = idx
  const today = new Date()
  const month = String(today.getMonth() + 1).padStart(2, '0')
  const day = String(today.getDate()).padStart(2, '0')
  const todayKey = `mood_${month}${day}`

  uni.setStorageSync('todayMood', idx)
  uni.setStorageSync(todayKey, moodScore[idx])
  
  initWeekMood() // 刷新图表
  
  uni.showToast({
    title: `已标记：${moodList.value[idx].name}`,
    icon: 'none'
  })
}

// ====================== 测试跳转 ======================
const goTest = () => {
  uni.showModal({
    title: '情感小测试',
    content: '即将跳转到恋爱人格测试页面',
    confirmText: '前往',
    success() {
      uni.navigateTo({
        url: '/pages/test/test'
      })
    }
  })
}

// ====================== 入口 ======================
onMounted(() => {
  initLuck()
  refreshWords()
  initWeekMood()

  const local = uni.getStorageSync('todayMood')
  if (local) currentMood.value = local
})
</script>

<style lang="scss" scoped>
.content {
  width: 750rpx;
  min-height: 100vh;
  background: #f9fafc;
  padding: 20rpx;
  box-sizing: border-box;
}

/* 标题 */
.header {
  text-align: center;
  margin-top: 30rpx;
  .title {
    font-size: 40rpx;
    font-weight: bold;
    color: #333;
  }
  .date {
    font-size: 26rpx;
    color: #999;
    margin-top: 8rpx;
  }
}

/* 运势卡片 */
.luck-card {
  margin: 30rpx 0;
  padding: 40rpx;
  border-radius: 28rpx;
  box-shadow: 0 4rpx 20rpx rgba(0, 0, 0, 0.06);
  &.luck-daji {
    background: linear-gradient(135deg, #ff9a9e, #fecfef);
    color: #fff;
  }
  &.luck-ji {
    background: linear-gradient(135deg, #a8edea, #fed6e3);
    color: #333;
  }
  &.luck-ping {
    background: #fff;
    color: #555;
  }
  .luck-level {
    font-size: 50rpx;
    font-weight: bold;
    margin-bottom: 20rpx;
  }
  .luck-desc {
    font-size: 28rpx;
    line-height: 1.6;
    margin-bottom: 30rpx;
  }
  .item-group {
    margin-bottom: 24rpx;
    .label {
      font-size: 28rpx;
      font-weight: bold;
      margin-bottom: 12rpx;
      &.good { color: #ff6b9d; }
      &.bad { color: #888; }
    }
    .tags {
      display: flex;
      flex-wrap: wrap;
      gap: 14rpx;
      .tag {
        padding: 8rpx 18rpx;
        border-radius: 30rpx;
        font-size: 24rpx;
        &.good-tag {
          background: rgba(255, 107, 157, 0.12);
          color: #ff6b9d;
        }
        &.bad-tag {
          background: rgba(130, 130, 130, 0.1);
          color: #777;
        }
      }
    }
  }
}

/* 心情打卡 */
.mood-card {
  background: #fff;
  border-radius: 24rpx;
  padding: 30rpx;
  margin-bottom: 24rpx;
  box-shadow: 0 2rpx 12rpx rgba(0, 0, 0, 0.04);
  .mood-title {
    display: flex;
    justify-content: space-between;
    font-size: 30rpx;
    font-weight: bold;
    margin-bottom: 24rpx;
    .tip {
      font-size: 22rpx;
      color: #999;
      font-weight: normal;
    }
  }
  .mood-list {
    display: flex;
    justify-content: space-between;
    .mood-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      opacity: 0.5;
      .emoji {
        font-size: 40rpx;
        margin-bottom: 8rpx;
      }
      .text {
        font-size: 22rpx;
        color: #666;
      }
      &.active {
        opacity: 1;
        transform: scale(1.1);
        .text {
          color: #ff6b9d;
          font-weight: bold;
        }
      }
    }
  }
}

/* 测试入口 */
.test-card {
  background: #fff;
  border-radius: 24rpx;
  padding: 30rpx;
  margin-bottom: 24rpx;
  box-shadow: 0 2rpx 12rpx rgba(0, 0, 0, 0.04);
  display: flex;
  justify-content: space-between;
  align-items: center;
  .test-left {
    display: flex;
    align-items: center;
    .test-icon {
      font-size: 40rpx;
      margin-right: 16rpx;
    }
    .test-title {
      font-size: 30rpx;
      font-weight: bold;
    }
  }
  .test-right {
    font-size: 24rpx;
    color: #999;
  }
}

/* 心情图表 */
.chart-card {
  background: #fff;
  border-radius: 24rpx;
  padding: 30rpx;
  margin-bottom: 24rpx;
  box-shadow: 0 2rpx 12rpx rgba(0, 0, 0, 0.04);
  .chart-title {
    font-size: 30rpx;
    font-weight: bold;
    margin-bottom: 30rpx;
  }
  .chart-box {
    height: 240rpx;
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    .bar-group {
      display: flex;
      width: 100%;
      justify-content: space-between;
      .bar-item {
        width: 40rpx;
        height: 200rpx;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-end;
        position: relative;
        .bar {
          width: 24rpx;
          background: #ff6b9d;
          border-radius: 4rpx 4rpx 0 0;
          margin-bottom: 30rpx;
        }
        .day {
          position: absolute;
          bottom: 0;
          font-size: 20rpx;
          color: #999;
        }
      }
    }
  }
}

/* 暖心一句 */
.warm-card {
  background: #fff;
  border-radius: 24rpx;
  padding: 30rpx;
  margin-bottom: 24rpx;
  box-shadow: 0 2rpx 12rpx rgba(0, 0, 0, 0.04);
  .warm-title {
    font-size: 30rpx;
    font-weight: bold;
    margin-bottom: 12rpx;
  }
  .warm-content {
	margin-left: 10rpx;
    font-size: 26rpx;
    color: #666;
    line-height: 1.6;
  }
}

/* 小贴士 */
.tip-card {
  background: linear-gradient(to right, #fff6f9, #fff);
  border-radius: 24rpx;
  padding: 30rpx;
  box-shadow: 0 2rpx 12rpx rgba(0, 0, 0, 0.04);
  .tip-title {
    font-size: 28rpx;
    font-weight: bold;
    color: #ff6b9d;
    margin-bottom: 12rpx;
  }
  .tip-content {
	  margin-left: 10rpx;
    font-size: 24rpx;
    color: #666;
    line-height: 1.6;
  }
}
</style>