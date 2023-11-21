<template>
	<view>
		<view class="navigation">
			<view style="font-size: 32rpx;font-weight: 700;">Notifications</view>
		</view>
		<view class="main">
			<!-- <view class="main-title">Today</view> -->
			<view class="main-card" v-for="(item,index) in notice" @click="gotoDetail(item)">
				<view class="main-avatar">
					<image :src="baseUrl+item.image" mode="widthFix" style="width: 104rpx;"></image>
				</view>
				<view style="margin-left: 20rpx;">
					<view style="font-size: 28rpx; margin-bottom: 10rpx;">{{item.content.split("just")[0]}}</view>
					<view style="font-size: 20rpx;font-weight: 500;margin-bottom: 10rpx;">
						<image src="../../../static/notice/plane.png" mode="widthFix" style="width: 20rpx;"></image>
						{{item.content.split("just")[1]}}
					</view>
					<view style="font-size: 20rpx;font-weight: 500;color: #AFAFAF;">{{item.time.split('T')[0]}} {{item.time.split('T')[1].split(".")[0]}}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import api from '../../../api/api.js'
	import request from "../../../utils/request/request.js"
	export default {
		data() {
			return {
				notice:[],
				baseUrl:request.BASE_URL,
			}
		},
		onLoad() {
			
		},
		onShow() {
			this.getNotice()
		},
		methods: {
			async getNotice() {
				let res = await api.getNotice()
				console.log(res)
				if(res.statusCode == '200') {
					this.notice = res.data.content
				}
			},
			gotoDetail(item) {
				console.log(item)
				
				uni.navigateTo({
					url:`../../community/detail/detail?postId=${item.post_id}`
				})
			}
		}
	}
</script>

<style>
	.navigation {
		height: 120rpx;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		margin-top: 50rpx;
	}

	.main {
		margin-left: 34rpx;
	}

	.main-title {
		font-family: Inter;
		font-size: 32rpx;
		font-weight: 600;
		line-height: 40rpx;
	}

	.main-card {
		margin-top: 20rpx;
		width: 682rpx;
		height: 148rpx;
		border-radius: 40rpx;
		background: #008FA01A;
		display: flex;
		flex-direction: row;
		align-items: center;
	}

	.main-avatar {
		border-radius: 50%;
		margin-left: 20rpx;
		width: 104rpx;
		height: 104rpx;
		overflow: hidden;
		border: 4rpx solid #FFFFFF;
	}

	.main-right {
		margin-left: 200rpx;
		border-radius: 40rpx;
		border: 6rpx solid #FFFFFF;
		overflow: hidden;
		width: 116rpx;
		height: 116rpx;
	}
</style>
