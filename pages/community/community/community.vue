<template>
	<view>
		<view class="title">Community</view>
		<view class="location">Your Location</view>
		<view style="display: flex;flex-direction: row;">
			<image src="../../../static/community/location.png"
				style="width: 24rpx;height: 28rpx;margin-left: 46rpx;margin-top: 6rpx;"></image>
			<view style="margin-left: 10rpx;font-weight: 600;font-size: 32rpx;">{{location}}</view>
		</view>
		<scroll-view scroll-x="true" class="scroll-view" :scroll-into-view="toview">
			<view v-for="(item,index) in topBarList" class="scroll-item" :id="'item'+index"
				:class="{active:index===activeindex}" @click="toggleclass(index)">
				<text>{{item}}</text>
			</view>
		</scroll-view>
		<view class="main" v-for="(item,index) in post" @click="gotoDetail(item)">
			<view style="box-sizing: border-box;">
				<image :src="baseUrl +item.images[0]"
					style="width: 282rpx; height: 252rpx;border-radius: 30rpx;vertical-align: middle;"></image>
			</view>
			<view style="margin-left: 20rpx;">
				<view style="font-weight: 600;font-size: 28rpx;">{{item.title}}</view>
				<view style="margin-top: 14rpx;">
					<image src="../../../static/community/location.png"
						style="width: 24rpx;height: 28rpx;position: absolute;"></image>
					<text class="place">{{item.location.split(" ")[0]}}</text>
				</view>
				<view style="margin-top: 14rpx; color: #636363;font-size: 24rpx;">{{item.time.split('T')[0]}}</view>
				<view style="margin-top: 14rpx;">
					<image :src="baseUrl +item.avatar" style="width: 28rpx;height: 28rpx;border-radius: 50%;"></image>
					<text style="margin-left: 16rpx;font-size: 20rpx;">{{item.username}}</text>
				</view>
			</view>
		</view>
		<view style="height: 30rpx;"></view>
	</view>
</template>

<script>
	import api from "../../../api/api.js"
	import request from "../../../utils/request/request.js"
	export default {
		data() {
			return {
				location: "",
				userInfo: {},
				post: [],
				baseUrl: request.BASE_URL,
				up: 0,
				down: 10,
				hasMore: true,
				toview: "",
				topBarList: [],
				activeindex: 0
			}
		},
		async onLoad() {
			let that = this
			this.baiduMap.getlocation().then(res => {
				that.location = res.address.city
			})
			this.getBasicInfo()
			this.getTags()
		},
		onShow() {
			this.getPostInfo()
		},
		onPullDownRefresh() {
			this.down = 10
			this.hasMore = true
			this.post = []
			this.getPostInfo()
			setTimeout(function() {
				uni.stopPullDownRefresh(); //停止下拉刷新动画
			}, 500);
		},
		onReachBottom() {
			this.down += 10
			uni.showLoading({
				title: "loading more"
			})
			this.getPostInfo()
		},
		methods: {
			toggleclass(index) {
				if(this.activeindex == index) {
					this.activeindex = -1
				}else {
						this.activeindex = index;
						this.toview = 'item' + (index)
				}
				this.up=0
				this.down=10
				this.getPostInfo()
				// this.$router
			},
			async getPostInfo() {
				console.log(this.topBarList[this.activeindex])
				console.log(this.up)
				console.log(this.down)
				let key = ''
				if(this.activeindex != -1) {
					key = this.topBarList[this.activeindex]
				}
				let res = await api.getPostList(0, this.up, this.down,key)
				console.log(res)
				if (res.statusCode == '200') {
					this.post = res.data.posts
				}
			},
			async getTags() {
				let res = await api.getTags()
				console.log(res)
				if(res.statusCode == '200') {
					this.topBarList = res.data.tags
				}
			},
			gotoDetail(item) {
				uni.navigateTo({
					url: `../detail/detail?postId=${item.post_id}`
				})
			},
			getBasicInfo() {
				let that = this
				api.getUserInfo(null, true).then(res => {
					res.data.avatar = that.baseUrl + res.data.avatar
					that.userInfo = res.data
					uni.setStorage({
						key: "userInfo",
						data: res.data,
					})
				})
			}
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
		margin-top: 24rpx;
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

	.place {
		margin-left: 32rpx;
		color: #636363;
		font-size: 24rpx;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
		overflow: hidden;
		width: 210rpx;
	}

	.scroll-view {
		height: 80rpx;
		white-space: nowrap;
		margin-left: 50rpx;
		margin-top: 26rpx;
		width: 86%;
	}

	.scroll-item {
		display: inline-block;
		padding: 0 30rpx;
		border: 1px solid #000000;
		border-radius: 26rpx;
		margin-left: 20rpx;
		line-height: 60rpx;
	}

	.active {
		background-color: #1D7063;
		color: #FFFFFF;
	}
</style>
