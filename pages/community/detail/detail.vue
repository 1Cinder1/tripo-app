<template>
	<view>
		<view style="height: 120rpx;display: flex;flex-direction: row;align-items: center;">
			<view class="left" @click="back">
				<image src="../../../static/left.png" style="width: 50rpx;" mode="widthFix"></image>
			</view>
			<view style="margin-top: 54rpx;margin-left: 144rpx;font-size: 32rpx;font-weight: 700;">Lake Trip</view>
		</view>
		<view class="main-image-fa">
			<image src="../../../static/community/avatar.jpg" mode="widthFix" class="main-image"></image>
			
		</view>
		<view style="display: flex;flex-direction: row;">
			<view style="margin-left: 46rpx;">
				<view style="font-size: 40rpx;font-weight: 600;">RedFish Lake</view>
				<view style="margin-top: 20rpx;">
					<image src="../../../static/community/location.png" style="width: 26rpx;vertical-align: middle;"
						mode="widthFix"></image>
					<text style="margin-left: 10rpx;">Location</text>
				</view>
			</view>
			<view style="display: flex;flex-direction: row;margin-left: 140rpx;">
				<view style="max-width: 200rpx;word-wrap:break-word;color: #636363;">Posted by Username 2022/12/02 </view>
				<image src="../../../static/community/avatar.jpg" style="width: 84rpx;border-radius: 50%;"
					mode="widthFix"></image>
			</view>
		</view>
		<view class="dis-text">
			What is Redfish Lake known for?
			Redfish Lake is the final stop on the longest
			Pacific salmon run in North America, which
			requires long-distance swimmers, such as
			Sockeye and Chinook Salmon, to travel over
			900 miles upstream to return to their spawning
			grounds.
			Redfish Lake is an alpine lake in Custer County,
			Idaho, just south of Stanley. It is the largest lake
			within the Sawtooth National Recreation Area.
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

	.main-image {
		width: 688rpx;
		border-radius: 40rpx;
		box-shadow: 0px 9.953792572021484px 9.953792572021484px 0px #00000026;
	}

	.main-image-fa {
		width: 688rpx;
		height: 740rpx;
		margin-left: 31rpx;
		margin-top: 36rpx;
		border-radius: 40rpx;
	}

	.dis-text {
		font-family: Inter;
		font-size: 30rpx;
		font-weight: 400;
		line-height: 46rpx;
		margin-left: 46rpx;
		margin-right: 46rpx;
		margin-top: 66rpx;
		color: #636363;
	}
</style>
