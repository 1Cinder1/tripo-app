<template>
	<view class="page">
		<view style="position: absolute;box-sizing: border-box;">
			<image src="../../../static/mine/bac.jpg" :style="'height:'+windowHeight+'px;width:750rpx'"></image>
		</view>
		<view v-if="content != ''"
			style="background-color: #FFFFFF;position: absolute;bottom: 200rpx;width: 696rpx;left: 30rpx;border-radius: 40rpx;">
			<view>
				<image :src="baseUrl+postImages[index]" style="width: 654rpx;height: 362rpx;border-radius: 40rpx;margin-left: 20rpx;margin-top: 20rpx;box-shadow: 0px 4px 4px 0px #00000026;
"></image>
			</view>
			<view style="margin: 70rpx 20rpx 30rpx 20rpx;">
				<textarea style="font-size: 22rpx;line-height: 26rpx;height: 300rpx;margin-left: 10rpx;"
					v-model="content" disabled="true">
				</textarea>
				<view style="margin-top: 20rpx;">
					<image src="../../../static/mine/gpt.png"
						style="height: 64rpx; width: 64rpx;vertical-align: middle;"></image>
					<text style="color: #008FA0;font-size: 22rpx;margin-left: 24rpx;">ChatGPT</text>
					<view
						style="height: 12rpx;width: 12rpx;border-radius: 50%;background-color: #636363;display: inline-block;margin-left: 324rpx;">
					</view>
					<text style="font-size: 20rpx;color: #636363;margin-left: 14rpx;">{{data.split('T')[0]}}</text>
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
				postId: '',
				postImages: [],
				baseUrl: request.BASE_URL,
				windowHeight: 0,
				windowWidth: 0,
				content: '',
				data: '',
				index: 0
			}
		},
		onLoad(options) {
			this.postId = options.postId
			let that = this
			uni.getSystemInfo({
				success(res) {
					that.windowHeight = res.windowHeight
					that.windowWidth = res.windowWidth
				}
			})
			this.getPostInfo()
			this.getAiChat()
		},
		methods: {
			async getPostInfo() {
				uni.showLoading({
					title:'loading...'
				})
				let res = await api.getPostInfo(this.postId)
				console.log(res)
				if (res.statusCode == '200') {
					this.postImages = res.data.images
					this.data = res.data.time
					this.index = this.randomNum(0, this.postImages.length - 1)
				}
			},
			async getAiChat() {
				
				console.log(this.postId)
				let res = await api.getAiChat(this.postId)
				console.log(res)
				if (res.statusCode == '200') {
					this.content = res.data.result
					uni.hideLoading()
				}
			},
			//生成从minNum到maxNum的随机数
			randomNum(minNum, maxNum) {
				switch (arguments.length) {
					case 1:
						return parseInt(Math.random() * minNum + 1, 10);
						break;
					case 2:
						return parseInt(Math.random() * (maxNum - minNum + 1) + minNum, 10);
						break;
					default:
						return 0;
						break;
				}
			}
		}
	}
</script>

<style>
	.page {
		overflow: hidden;
	}
</style>
