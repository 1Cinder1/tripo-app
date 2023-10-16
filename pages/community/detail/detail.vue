<template>
	<view>
		<view style="height: 120rpx;display: flex;flex-direction: row;align-items: center;">
			<view class="left" @click="back">
				<image src="../../../static/left.png" style="width: 50rpx;" mode="widthFix"></image>
			</view>
			<view style="margin-top: 54rpx;margin-left: 144rpx;font-size: 32rpx;font-weight: 700;"></view>
		</view>
<!-- 		<view class="main-image-fa">
			<image src="../../../static/community/avatar.jpg" mode="widthFix" class="main-image"></image>
		</view> -->
		<swiper class="main-image-fa" indicator-dots="true">
			<swiper-item v-for="(item,index) in detail.images">
				<image :src="baseUrl + item" mode="widthFix" class="main-image"></image>
			</swiper-item>
		</swiper>
		<view style="display: flex;flex-direction: row;">
			<view style="margin-left: 46rpx; width: 256rpx;">
				<view style="font-size: 40rpx;font-weight: 600;">{{detail.title}}</view>
				<view style="margin-top: 20rpx;">
					<image src="../../../static/community/location.png" style="width: 26rpx;vertical-align: middle;"
						mode="widthFix"></image>
					<text style="margin-left: 10rpx;">{{detail.location.split(" ")[0]}}</text>
				</view>
			</view>
			<view style="display: flex;flex-direction: row;margin-left: 140rpx;">
				<view style="max-width: 200rpx;word-wrap:break-word;color: #636363;"> 
				<text>Posted by {{detail.username}} \n {{detail.time.split('T')[0]}} \n {{detail.time.split('T')[1].split(".")[0]}} </text> 
				</view>
				<image :src="baseUrl + detail.avatar" style="width: 84rpx;border-radius: 50%;"
					mode="widthFix"></image>
			</view>
		</view>
		<view class="dis-text">
			{{detail.content}}
		</view>
	</view>
</template>

<script>
	import api from "../../../api/api.js"
	import request from "../../../utils/request/request.js"
	export default {
		data() {
			return {
				postId:0,
				detail:{},
				baseUrl:request.BASE_URL,
			}
		},
		async onLoad(options) {
			this.postId = options.postId
			await this.getPostInfo()
			console.log(this.detail)
		},
		methods: {
			back(){
				uni.navigateBack({
					delta:1
				})
			},
			async getPostInfo() {
				let that = this
				await api.getPostInfo(this.postId).then(res=>{
					if(res.statusCode == '200') {
						that.detail = res.data
					}
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
		margin-bottom: 20rpx;
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
