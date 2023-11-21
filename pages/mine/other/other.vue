<template>
	<view>
		<view
			style="height: 120rpx;display: flex;flex-direction: row;align-items: center;justify-content: center;margin-top: 50rpx;">
			<view style="font-size: 32rpx;font-weight: 700;">My Profile</view>
		</view>
		<view class="avatar">
			<view>
				<image :src="userInfo.avatar" style="width: 200rpx;border-radius: 50%;height: 200rpx;"></image>
			</view>
			<view style="font-size: 48rpx;font-weight: 600;margin-top: 48rpx;">
				{{userInfo.username}}
			</view>
		</view>
		<view style="margin-left: 36rpx;font-size: 60rpx;font-weight: 600;margin-top: 80rpx;">
			Blogs
		</view>
		<uni-swipe-action>
			<uni-swipe-action-item v-for="(item,index) in post" :key="index">
				<view class="main" style="margin-top: 20rpx;" @click="gotoDetail(item)">
					<view style="box-sizing: border-box;">
						<image :src="baseUrl +item.images[0]"
							style="width: 282rpx; height: 180rpx;border-radius: 30rpx;vertical-align: middle;"></image>
					</view>
					<view style="margin-left: 20rpx;width: 250rpx;">
						<view style="font-weight: 600;font-size: 36rpx;">{{item.title}}</view>
						<view style="margin-top: 14rpx;">
							<image src="../../../static/community/location.png"
								style="width: 24rpx;height: 28rpx;position: absolute;">
							</image>
							<text class="place">{{item.location.split(" ")[0]}}</text>
						</view>
						<view style="margin-top: 14rpx; color: #636363;font-size: 24rpx;">{{item.time.split('T')[0]}}
						</view>
					</view>
					<view>
						<image src="../../../static/mine/gpt.png" style="width: 64rpx;height: 64rpx;">
						</image>
					</view>
				</view>
			</uni-swipe-action-item>
		</uni-swipe-action>
		<view style="height: 50rpx;"></view>
	</view>
</template>

<script>
	import api from "../../../api/api.js";
	import request from "../../../utils/request/request.js"
	export default {
		data() {
			return {
				userInfo: {},
				up: 0,
				down: 10,
				baseUrl: request.BASE_URL,
				post: [],
				hasMore: true,
				uid: ''
			}
		},
		onLoad(options) {
			this.uid = options.uid
			this.getBasicInfo()
		},
		onShow() {
			this.getPostList()
		},
		onPullDownRefresh() {
			this.down = 10
			this.userInfo = {}
			this.getPostList()
			this.getBasicInfo()
			setTimeout(function() {
				uni.stopPullDownRefresh(); //停止下拉刷新动画
			}, 500);
			this.$forceUpdate()
		},
		onReachBottom() {
			if (this.hasMore) {
				this.down += 10
				uni.showLoading({
					title: "loading more"
				})
				this.getPostList()
			} else {
				uni.showToast({
					icon: "none",
					title: "Already shown all"
				})
			}
		},
		methods: {
			back() {
				uni.navigateBack({
					delta: 1
				})
			},
			gotoDetail(item) {
				console.log(item)
				uni.navigateTo({
					url: `../../community/detail/detail?postId=${item.post_id}`
				})
			},
			async getPostList() {
				let res = await api.getPostList(this.uid, this.up, this.down)
				console.log(res)
				if (res.statusCode == '200') {
					if (res.data.posts.length <= this.post.length) {
						this.hasMore = false
					}
					this.post = res.data.posts
				}
			},
			async getBasicInfo() {
				let res = await api.getUserInfo(this.uid, false)
				if (res.statusCode == '200') {
					res.data.avatar = request.BASE_URL + res.data.avatar
					this.userInfo = res.data
				}
				this.$forceUpdate()
			},
		}
	}
</script>

<style>
	page {
		background-color: #F7F7F7;
		width: 750rpx;
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

	.delete {
		background-color: #E43D33;
		display: flex;
		justify-content: center;
		align-items: center;
		color: #FFFFFF;
		border-radius: 40rpx 0rpx 0rpx 40rpx;
		margin-top: 30rpx;
		width: 150rpx;
	}

	.avatar {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		margin-top: 80rpx;
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

	.logout {
		display: flex;
		align-items: center;
		justify-content: center;
		color: #FFFFFF;
		font-weight: 700;
		margin-top: 64rpx;
		margin-left: 46rpx;
		background-color: #E43D33;
		margin-right: 46rpx;
		border-radius: 40rpx;
		padding: 6rpx;
		height: 80rpx;
	}
</style>
