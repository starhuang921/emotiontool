<template>
  <view class="container">
    <!-- 1. 用户信息卡片 -->
    <view class="user-card">
      <image src="/static/userima.png" mode="aspectFit" class="avatar"></image>
      
      <!-- 用户名 -->
      <view class="username" @click="editName">
        {{ username || '点击设置昵称' }}
      </view>
      
      <!-- 个性签名 -->
      <view class="sign" @click="editSign">
        {{ sign || '点击设置个性签名' }}
      </view>
    </view>

    <!-- 2. 心情日记 -->
    <view class="diary-card">
      <text class="title">📝 心情日记</text>
      
      <!-- 写日记 -->
      <textarea 
        class="input" 
        v-model="todayContent" 
        placeholder="记录今天的心情..."
      />
      
      <button class="save-btn" @click="saveDiary">
        保存今日日记
      </button>
    </view>

    <!-- 3. 历史日记 -->
    <view class="history-card">
      <text class="title">📅 历史日记</text>
      <view class="list">
        <view class="item" v-for="(item, idx) in diaryList" :key="idx">
          <view class="item-left">
            <text class="date">{{ item.date }}</text>
            <text class="content">{{ item.content }}</text>
          </view>
          <text class="del-btn" @click="deleteDiary(idx)">删除</text>
        </view>
        <view class="empty" v-if="diaryList.length === 0">
          暂无日记记录
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref} from 'vue'
import{onShow} from '@dcloudio/uni-app'

// 用户资料
const username = ref('')
const sign = ref('')

// 日记
const todayContent = ref('')
const diaryList = ref([])

// 页面显示时加载数据
onShow(() => {
  loadUserInfo()
  loadDiaryList()
})

// 加载用户信息
function loadUserInfo() {
  username.value = uni.getStorageSync('username') || ''
  sign.value = uni.getStorageSync('sign') || ''
}

// 编辑昵称
function editName() {
  uni.showModal({
    title: '修改昵称',
    editable: true,
    placeholder: '请输入昵称',
    success: (res) => {
      if (res.confirm && res.content) {
        username.value = res.content
        uni.setStorageSync('username', res.content)
      }
    }
  })
}

// 编辑签名
function editSign() {
  uni.showModal({
    title: '修改个性签名',
    editable: true,
    placeholder: '请输入签名',
    success: (res) => {
      if (res.confirm && res.content) {
        sign.value = res.content
        uni.setStorageSync('sign', res.content)
      }
    }
  })
}

// 保存日记
function saveDiary() {
  if (!todayContent.value.trim()) {
    uni.showToast({ title: '请输入内容', icon: 'none' })
    return
  }

  // 获取今天日期
  const d = new Date()
  const date = `${d.getMonth() + 1}-${d.getDate()}`

  // 读取历史
  let list = uni.getStorageSync('diaryList') || []

  // 去重：今天只能一条
  list = list.filter(item => item.date !== date)

  // 添加新的
  list.unshift({ date, content: todayContent.value })

  // 保存
  uni.setStorageSync('diaryList', list)
  uni.showToast({ title: '保存成功' })
	todayContent.value=''
  // 刷新列表
  loadDiaryList()
}

// 加载日记列表
function loadDiaryList() {
  diaryList.value = uni.getStorageSync('diaryList') || []
}

// 删除日记
function deleteDiary(index) {
  uni.showModal({
    title: '提示',
    content: '确定要删除这条日记吗？',
    success: (res) => {
      if (res.confirm) {
        let list = uni.getStorageSync('diaryList') || []
        list.splice(index, 1)
        uni.setStorageSync('diaryList', list)
        loadDiaryList()
        uni.showToast({ title: '删除成功' })
      }
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

/* 用户卡片 */
.user-card {
  background: #fff;
  border-radius: 24rpx;
  padding: 50rpx 40rpx;
  text-align: center;
  margin-bottom: 30rpx;
  box-shadow: 0 4rpx 15rpx rgba(0, 0, 0, 0.05);

  .avatar {
	width: 80rpx;
	height: 80rpx;
  }
  .username {
    font-size: 36rpx;
    font-weight: bold;
    color: #333;
    margin-bottom: 10rpx;
  }
  .sign {
    font-size: 24rpx;
    color: #999;
  }
}

/* 日记卡片 */
.diary-card, .history-card {
  background: #fff;
  border-radius: 24rpx;
  padding: 30rpx;
  margin-bottom: 30rpx;
  box-shadow: 0 4rpx 15rpx rgba(0, 0, 0, 0.05);

  .title {
    font-size: 30rpx;
    font-weight: bold;
    margin-bottom: 20rpx;
    display: block;
  }
}

.input {
  width: 100%;
  min-height: 200rpx;
  background: #f9fafc;
  border-radius: 16rpx;
  padding: 20rpx;
  box-sizing: border-box;
  font-size: 28rpx;
  margin-bottom: 20rpx;
}

.save-btn {
  background: #ff6b9d;
  color: #fff;
  border-radius: 44rpx;
  border: none;
  padding: 20rpx;
  font-size: 28rpx;
}

/* 日记列表 */
.item {
  display: flex;
  align-items: center;
  padding: 20rpx 0;
  border-bottom: 1rpx solid #f3f3f3;
  .item-left {
    flex: 1;
  }
  .date {
    font-size: 24rpx;
    color: #999;
    margin-bottom: 8rpx;
    display: block;
  }
  .content {
    font-size: 26rpx;
    color: #333;
    line-height: 1.5;
  }
}

.del-btn {
  color: #ff4444;
  font-size: 24rpx;
  padding: 8rpx 12rpx;
  border: 1rpx solid #ff4444;
  border-radius: 8rpx;
}

.empty {
  padding: 40rpx 0;
  text-align: center;
  color: #ccc;
  font-size: 24rpx;
}
</style>