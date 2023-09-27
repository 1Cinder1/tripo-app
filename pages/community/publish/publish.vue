<template>
	<view>
		<view style="height: 120rpx;display: flex;flex-direction: row;align-items: center;">
			<view class="left" @click="back">
				<image src="../../../static/left.png" style="width: 50rpx;" mode="widthFix"></image>
			</view>
		</view>
		<view>
			
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
			back() {
				uni.navigateBack({
					delta: 1
				})
			}
		}
	}
</script>

<style>
	.left {
		width: 100rpx;
		height: 50rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		border-radius: 40rpx;
		margin-top: 70rpx;
		margin-left: 46rpx;
	}
</style>
