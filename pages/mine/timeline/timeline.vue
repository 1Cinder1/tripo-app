<template>
	<view>
		<view :style="'height:'+windowHeight+'px;'+'background-size:'+windowWidth+'px '+windowHeight+'px'"
			style="background-image: url(../../../static/mine/ADD-FRAME-ABOVE.png);position: absolute;width:750rpx;justify-content: center;align-items: center;display: flex;flex-direction: column;">
			<view class="mark" :style="'height:'+windowHeight+'px;background-color: rgba(0,0,0,'+transparency+');'"
				v-show="showMark"></view>
			<view style="height: 50rpx;"></view>
			<scroll-view scroll-y="true" style="margin-left: 140rpx;height: 1200rpx;">
				<view v-for="(item,index) in post" style="display: flex;flex-direction: row;">
					<view v-if="index%2==0"
						style="display: flex;flex-direction: row;justify-content: center;align-items: center;">
						<view :style="'background-color:'+color[index % 4]+';'" class="circul"
							style="margin-right: 20rpx; height: 188rpx;width: 188rpx;border-radius: 50%;">
							<text>
								{{item.time.split('T')[0]}}\n{{item.location.split(' ')[0]}}
							</text>
						</view>
						<view class="triangle" style="margin-right: 16rpx;"
							:style="'border-color: transparent '+color[index % 4]+' transparent transparent;'">
		
						</view>
						<view v-if="index == 0"
							style="border-radius: 40rpx 40rpx 0rpx 0rpx;width: 60rpx;height: 300rpx;"
							:style="'background-color:'+color[index % 4]+';'"></view>
		
						<view v-else-if="index == post.length-1"
							style="border-radius: 0rpx 0rpx 40rpx 40rpx;width: 60rpx;height: 300rpx;"
							:style="'background-color:'+color[index % 4]+';'"></view>
						<view v-else style="width: 60rpx;height: 300rpx;"
							:style="'background-color:'+color[index % 4]+';'">
						</view>
						<view style="height: 188rpx;width: 188rpx;margin-left: 74rpx;">
							<image :src="baseUrl + item.images[0]" style="height: 188rpx;width: 188rpx;"></image>
						</view>
					</view>
		
					<view v-if="index%2!=0"
						style="display: flex;flex-direction: row;justify-content: center;align-items: center;margin-left: 22rpx;">
						<view style="height: 188rpx;width: 188rpx;margin-right: 74rpx;">
							<image :src="baseUrl + item.images[0]" style="height: 188rpx;width: 188rpx;"></image>
						</view>
		
						<view style="width: 60rpx;height: 300rpx;" :style="'background-color:'+color[index % 4]+';'">
						</view>
						<view class="triangle" style="margin-left: 16rpx;"
							:style="'border-color: transparent  transparent transparent '+color[index % 4]+';'">
		
						</view>
						<view :style="'background-color:'+color[index % 4]+';'" class="circul"
							style="margin-right: 20rpx; height: 188rpx;width: 188rpx;border-radius: 50%;">
							<text>
								{{item.time.split('T')[0]}}\n{{item.location.split(' ')[0]}}
							</text>
						</view>
					</view>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	import api from '../../../api/api.js';
	import request from '../../../utils/request/request.js'
	export default {
		data() {
			return {
				windowHeight: 0,
				windowWidth: 0,
				showMark: false,
				transparency: 0,
				baseUrl: request.BASE_URL,
				startData: {
					clientX: '',
					clientY: '',
				},
				touch: {},
				animationData: {},
				conclusion: {},
				left1: 0,
				left2: 750,
				imageLeft: 0,
				initLeft: 0,
				userInfo: {},
				up: 0,
				down: 1000,
				post: [],
				color: ['#8DD0C0', '#CC0A118F', '#95BE51', '#C1CDE3']
			}
		},
		onLoad() {
			this.userInfo = uni.getStorageSync("userInfo")
			let that = this
			uni.getSystemInfo({
				success(res) {
					that.windowHeight = res.windowHeight
					that.windowWidth = res.windowWidth
				}
			})
		},
		onReady() {

		},
		onShow() {
			this.getPostList()
		},
		onUnload() {
			this.transparency = 0
			this.showMark = false
			uni.hideLoading()
		},
		methods: {
			show() {
				this.showMark = !this.showMark
			},
			start(e) {
				this.transition = '.1s'
				this.startData.clientX = e.changedTouches[0].clientX; //手指按下时的X坐标         
				this.startData.clientY = e.changedTouches[0].clientY; //手指按下时的Y坐标
			},
			end(e) {
				this.transition = '.5s'
				if (this.startData.clientY - this.touch.clientY > 1) {
					this.animation.translateY(-this.windowHeight + 20).step({
						duration: 1000
					})
					this.animationData = this.animation.export()
				}
				this.startData.clientX = ''
				this.startData.clientY = ''
				this.touch = {}
			},
			async getPostList() {
				let that = this
				console.log('123')
				let res = await api.getPostList(this.userInfo.uid, 0,10)
				console.log(res)
				if (res.statusCode == '200') {
					if (res.data.posts.length <= this.post.length) {
						this.hasMore = false
					}
					this.post = res.data.posts
				}
			},
			async getConclusion() {
				console.log('123')
				uni.showLoading({
					mask: true,
					title: 'loading summary'
				})
				let res = await api.conclusion()
				console.log(res)
				uni.hideLoading()
				if (res.statusCode == '200') {
					this.conclusion = res.data
					uni.setStorage({
						key: 'conclusion',
						data: res.data
					})
				}
			},
			move(event) {
				let touch = event.touches[0]; //滑动过程中，手指滑动的坐标信息 返回的是Objcet对象
				this.touch = touch;
				console.log(this.touch)
			},
		}
	}
</script>

<style>
	.mark {
		position: absolute;
		width: 750rpx;
	}

	.image {
		max-height: 740;
		margin-top: 470rpx;
		display: flex;
		flex-direction: row;
		position: absolute;
	}

	.black {
		background-color: #000000;
		width: 750rpx;
		position: absolute;
	}

	.circul {
		font-size: 24rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		text-align: center;
	}

	.triangle {
		border-width: 30rpx;
		width: 0;
		height: 0;
		border-style: solid;
	}

	.ttttt:nth-of-type(1) {
		border-radius: 40rpx 40rpx 0rpx 0rpx;
	}
</style>
