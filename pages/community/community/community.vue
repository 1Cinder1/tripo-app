<template>
	<view>
		<view class="title">Community</view>
		<view class="location">Your Location</view>
		<view style="display: flex;flex-direction: row;">
			<image src="../../../static/community/location.png"
				style="width: 24rpx;height: 28rpx;margin-left: 46rpx;margin-top: 6rpx;"></image>
			<view style="margin-left: 10rpx;font-weight: 600;font-size: 32rpx;">{{location}}</view>
		</view>
		<view class="main" @click="gotoDetail">
			<view style="box-sizing: border-box;">
				<image src="../../../static/community/logo.png"
					style="width: 282rpx; height: 252rpx;border-radius: 30rpx;vertical-align: middle;"></image>
			</view>
			<view style="margin-left: 20rpx;">
				<view style="font-weight: 600;font-size: 36rpx;">Lake Trip</view>
				<view style="margin-top: 14rpx;">
					<image src="../../../static/community/location.png" style="width: 24rpx;height: 28rpx;" ></image>
						<text style="margin-left: 16rpx;color: #636363;font-size: 24rpx;">Location</text>
				</view>
				<view style="margin-top: 14rpx; color: #636363;font-size: 24rpx;">2022/12/02</view>
				<view style="margin-top: 14rpx;">
					<image src="../../../static/community/avatar.jpg" style="width: 28rpx;height: 28rpx;border-radius: 50%;"></image>
					<text style="margin-left: 16rpx;font-size: 20rpx;">Alice</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import api from "../../../api/api.js"
	import request from "../../../utils/request/request.js"
	export default {
		data() {
			return {
				location:""
			}
		},
		onLoad() {
			let that = this
			this.baiduMap.getlocation().then(res =>{
				that.location = res.address.city
			})
			this.getBasicInfo()
		},
		methods: {
			getPostInfo() {
				api.getPostInfo()
			},
			gotoDetail(){
				uni.navigateTo({
					url:"../detail/detail"
				})
			},
			async getBasicInfo() {
				let that = this
				api.getUserInfo(null,true).then(res => {
					res.data.avatar = request.BASE_URL + res.data.avatar
					console.log(res)
					uni.setStorage({
						key:"userInfo",
						data:res.data,
					})
				})
			},
		}
	}
</script>

<style>
	page {
		background-color: #F7F7F7;
	}

	.title {
		margin-top: 142rpx;
		margin-left: 46rpx;
		font-family: Inter;
		font-size: 72rpx;
		font-weight: 700;
		line-height: 88rpx;
	}

	.location {
		font-family: Inter;
		font-size: 32rpx;
		font-weight: 400;
		line-height: 40rpx;
		margin-left: 46rpx;
		margin-top: 50rpx;
		color: #636363;
	}

	.main {
		margin-top: 64rpx;
		margin-left: 46rpx;
		background-color: #FFFFFF;
		margin-right: 46rpx;
		border-radius: 40rpx;
		display: flex;
		flex-direction: row;
		align-items: center;
		padding: 6rpx;
		height: 266rpx;
	}
</style>
