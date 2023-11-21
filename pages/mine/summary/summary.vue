<template>
	<view style="overflow: hidden;box-sizing: border-box;">
		<view :style="'height:'+windowHeight+'px;'" :animation="animationData" class="black">
			<view
				style="color: #F2E1E1;font-size: 84rpx;font-weight: 700;margin-top: 230rpx;max-width: 540rpx;text-align: center;margin-left: auto;margin-right: auto;box-sizing: border-box;">
				My Summary
			</view>
			<image src="../../../static/mine/Ticket.png"
				style="width: 750rpx; height: 160rpx;position: absolute;top: 500rpx;" :style="'left:'+left1+'rpx'">
			</image>
			<image src="../../../static/mine/Ticket.png"
				style="width: 750rpx; height: 160rpx;position: absolute;top: 500rpx;" :style="'left:'+left2+'rpx'">
			</image>
			<view class="image" :style="'left:'+initLeft+'px'">
				<view v-for="(item,index) in conclusion.image_list">
					<image :src="baseUrl+item" mode="heightFix"></image>
				</view>
			</view>
			<image src="../../../static/mine/Ticket.png"
				style="width: 750rpx; height: 160rpx;position: absolute;top: 1400rpx;" :style="'left:'+left1+'rpx'">
			</image>
			<image src="../../../static/mine/Ticket.png"
				style="width: 750rpx; height: 160rpx;position: absolute;top: 1400rpx;" :style="'left:'+left2+'rpx'">
			</image>
		</view>
		
	</view>
</template>

<script>
	import api from '../../../api/api.js';
	import request from '../../../utils/request/request.js';
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
				initLeft: 0
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
			this.animation = uni.createAnimation()
			let timer = setInterval(() => {
				this.left1 -= 1
				this.left2 -= 1
				this.initLeft -= 0.5
				if (this.initLeft < -this.imageLeft) {
					this.initLeft = 375
				}
				if (this.left1 <= -750) {
					this.left1 = 750
				}
				if (this.left2 < -750) {
					this.left2 = 750
				}
			}, 10)
		},
		onReady() {
			let obj = uni.createSelectorQuery().select('.image')
			let that = this
			obj.boundingClientRect(function(data) {
				console.log('元素信息：', data)
				if (data.width > 375) {
					that.imageLeft = data.width - 375
				} else {
					that.imageLeft = data.width
				}
			}).exec()
			console.log(this.imageLeft)
		},
		onShow() {
			uni.showLoading({
				mask:"true"
			})
			let conclusion = uni.getStorageSync('conclusion')
			if (conclusion == '' || conclusion == undefined || conclusion == null) {
				this.getConclusion()
			} else {
				this.conclusion = conclusion
			}
			this.getPostList()
			let that = this
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
				if (Object.keys(this.userInfo).length == 0) {
					return
				}
				let res = await api.getPostList(this.userInfo.uid, this.up, this.down)
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
