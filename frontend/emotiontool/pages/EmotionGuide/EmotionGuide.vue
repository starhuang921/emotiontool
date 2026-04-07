<template>
	<scroll-view scroll-y class="scroll-box">
		<!-- 情绪列表 -->
		<view 
			class="item-box" 
			v-for="item in emotionList" 
			:key="item.id"
			@click="goDetail(item.id)"
		>
			<image 
			  :src="item.image+'?id='+item.id"
			  mode="aspectFill" 
			  class="item-img"
			></image>
			<view class="item-content">
				<view class="item-title">{{ item.title }}</view>
				<view class="item-desc">{{ item.introduce }}</view>
			</view>
		</view>
	</scroll-view>
	
	<!-- 返回顶部 -->
	<view class="back-top" @click="toTop">
		<image src="/static/top.png" mode="aspectFit"></image>
	</view>
</template>

<script setup>
import { ref } from 'vue'
import { onLoad } from '@dcloudio/uni-app'

// 本地情绪数据
import emotionData from '@/static/data/emotionData.json'

const emotionList = ref([])

onLoad(() => {
	emotionList.value = emotionData
})

// 跳转到详情
function goDetail(id) {
	uni.navigateTo({
		url: `/pages/details/details?id=${id}`
	})
}

// 返回顶部
function toTop() {
	uni.pageScrollTo({
		scrollTop: 0,
		duration: 300
	})
}
</script>

<style lang="scss">
page {
	background-color: #f9fafc;
}
.scroll-box {
	padding: 20rpx;
	min-height: 100vh;
}

/* 卡片风格 → 贴合你的情书/我的页面 */
.item-box {
	background: #ffffff;
	border-radius: 24rpx;
	padding: 30rpx;
	margin-bottom: 24rpx;
	box-shadow: 0 4rpx 15rpx rgba(0, 0, 0, 0.05);
	display: flex;
	align-items: center;
}

.item-img {
	width: 120rpx;
	height: 120rpx;
	border-radius: 20rpx;
	margin-right: 24rpx;
}

.item-content {
	flex: 1;
}

.item-title {
	font-size: 32rpx;
	font-weight: bold;
	color: #333;
	margin-bottom: 8rpx;
}

.item-desc {
	font-size: 26rpx;
	color: #666;
	line-height: 1.5;
}

/* 返回顶部 */
.back-top {
	position: fixed;
	bottom: 120rpx;
	right: 30rpx;
	width: 80rpx;
	height: 80rpx;
	border-radius: 50%;
	background: #fff;
	display: flex;
	align-items: center;
	justify-content: center;
	box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.1);
}
</style>