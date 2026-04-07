<template>
	<scroll-view scroll-y class="container">
		<view class="detail-box">
			<!-- 标题 -->
			<view class="detail-title">{{ currentData.title }}</view>
			
			<!-- 介绍 -->
			<view class="detail-section">
				<view class="label">情绪介绍</view>
				<view class="content">{{ currentData.introduce }}</view>
			</view>
			
			<!-- 建议 -->
			<view class="detail-section">
				<view class="label">调节建议</view>
				<view class="content suggest">{{ currentData.suggest }}</view>
			</view>
		</view>
	</scroll-view>
</template>

<script setup>
	import { ref} from 'vue'
		import{onLoad} from '@dcloudio/uni-app'
	import emotionData from '@/static/data/emotionData.json'
	
	const currentData = ref({})
	
	// 获取页面传递的id
	onLoad((option) => {
		const id = parseInt(option.id)
		// 匹配对应情绪数据
		currentData.value = emotionData.find(item => item.id === id) || {}
	})
</script>

<style lang="scss">
	page {
		background-color: #f9f2f4;
	}
	.container {
		padding: 30rpx;
	}
	
	.detail-box {
		background-color: #fff;
		border-radius: 30rpx;
		padding: 40rpx;
		box-shadow: 0 4px 10px rgba(0,0,0,0.1);
	}
	
	.detail-title {
		font-size: 44rpx;
		font-weight: bold;
		text-align: center;
		color: #333;
		margin-bottom: 40rpx;
	}
	
	.detail-section {
		margin-bottom: 40rpx;
	}
	
	.label {
		font-size: 32rpx;
		font-weight: bold;
		color: #e799a0;
		margin-bottom: 20rpx;
	}
	
	.content {
		font-size: 30rpx;
		color: #555;
		line-height: 1.7;
	}
	
	.suggest {
		white-space: pre-line; /* 让换行生效 */
	}
</style>