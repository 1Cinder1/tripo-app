<template>
	<view>
		<view style="height: 120rpx;display: flex;flex-direction: row;align-items: center;justify-content: center;margin-top: 50rpx;">
			<view style="font-size: 32rpx;font-weight: 700;">My Profile</view>
		</view>
		<view style="display: flex;flex-direction: column;justify-content: center;align-items: center;margin-top: 80rpx;">
			<view>
				<image src="../../../static/community/avatar.jpg" style="width: 200rpx;border-radius: 50%;" mode="widthFix"></image>
			</view>
			<view style="font-size: 48rpx;font-weight: 600;margin-top: 48rpx;">
				Cinder
				<image src="../../../static/mine/edit.png" style="width: 48rpx;margin-left: 16rpx;vertical-align: middle;" mode="widthFix"></image>
			</view>
		</view>
		<view style="margin-left: 36rpx;font-size: 60rpx;font-weight: 600;margin-top: 80rpx;">
			My Blogs
		</view>
		<view class="main" style="margin-top: 20rpx;">
			<view style="box-sizing: border-box;">
				<image src="../../../static/mine/camera.png"  style="width: 172rpx;height: 160rpx;z-index: 99;"></image>
			</view>
		</view>
		<view class="main" style="margin-top: 20rpx;">
			<view style="box-sizing: border-box;">
				<image src="../../../static/community/logo.png"
					style="width: 282rpx; height: 180rpx;border-radius: 30rpx;vertical-align: middle;"></image>
			</view>
			<view style="margin-left: 20rpx;">
				<view style="font-weight: 600;font-size: 36rpx;">Lake Trip</view>
				<view style="margin-top: 14rpx;">
					<image src="../../../static/community/location.png" style="width: 24rpx;height: 28rpx;" ></image>
						<text style="margin-left: 16rpx;color: #636363;font-size: 24rpx;">Location</text>
				</view>
				<view style="margin-top: 14rpx; color: #636363;font-size: 24rpx;">2022/12/02</view>
			</view> 
			<view>
				<image src="../../../static/mine/gpt.png" mode="widthFix" style="width: 64rpx;margin-left: 96rpx;"></image>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			back(){
				uni.navigateBack({
					delta:1
				})
			}
		}
	}
</script>

<style>
	page {
		background-color: #F7F7F7;
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
		height: 204rpx;
	}
</style>
