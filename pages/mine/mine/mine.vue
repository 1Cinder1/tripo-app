<template>
	<view>
		<view
			style="height: 120rpx;display: flex;flex-direction: row;align-items: center;justify-content: center;margin-top: 50rpx;">
			<view style="font-size: 32rpx;font-weight: 700;">My Profile</view>
		</view>
		<view class="avatar" v-if="Object.keys(userInfo).length != 0">
			<view>
				<image :src="userInfo.avatar" style="width: 200rpx;border-radius: 50%;height: 200rpx;"
					@longtap="chooseImage"></image>
			</view>
			<view style="font-size: 48rpx;font-weight: 600;margin-top: 48rpx;">
				{{userInfo.username}}
				<image src="../../../static/mine/edit.png"
					style="width: 48rpx;margin-left: 16rpx;vertical-align: middle;" @click="editName" mode="widthFix">
				</image>
			</view>
			<uni-popup ref="popup" type="dialog">
				<uni-popup-dialog mode="input" message="成功消息" :value="userInfo.username" :duration="2000"
					:before-close="true" @close="close" @confirm="confirm"></uni-popup-dialog>
			</uni-popup>
		</view>
		<view v-else class="avatar">
			<view>
				<image src="../../../static/mine/default.jpg"
					style="width: 200rpx;border-radius: 50%;height: 200rpx;margin-left: 40rpx;" @click="gotoLogin">
				</image>
				<view style="font-size: 48rpx;font-weight: 600;margin-top: 48rpx;">
					login please
				</view>
			</view>
		</view>
		<view style="margin-left: 36rpx;font-size: 60rpx;font-weight: 600;margin-top: 80rpx;">
			My Blogs
		</view>
		<view class="main" style="margin-top: 20rpx;" @click="gotoCreate">
			<view style="box-sizing: border-box;">
				<image src="../../../static/mine/camera.png" style="width: 172rpx;height: 160rpx;margin-left: 72rpx;">
				</image>
			</view>
			<text style="margin-left: 56rpx;font-size: 36rpx;font-weight: 600;">Create a new blog</text>
		</view>
		<uni-swipe-action>
			<uni-swipe-action-item v-for="(item,index) in post" :key="index">
				<view class="main" style="margin-top: 20rpx;">
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
				<template v-slot:right>
					<view class="delete" @click="deletePost(item)">
						delete
					</view>
				</template>
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
				hasMore: true
			}
		},
		onLoad() {
			this.userInfo = uni.getStorageSync("userInfo")
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
			gotoLogin() {
				if (Object.keys(this.userInfo).length == 0) {
					uni.navigateTo({
						url: "../login/login"
					})
				}
			},
			async deletePost(item) {
				let res = await api.deletePost(item.post_id)
				if (res.statusCode == '200') {
					uni.showToast({
						icon: "success",
						title: "delete success"
					})
				} else {
					uni.showToast({
						icon: "error",
						title: "delete error"
					})
				}
				this.getPostList()
			},
			chooseImage() {
				let that = this
				uni.chooseImage({
					count: 1,
					// sizeType: ['compressed'],
					sourceType: ['album'],
					crop:{
						width:100,
						height:100
					},
					success: (res) => {
						that.uploadAvatar(res.tempFilePaths[0])
					}
				})
			},
			async uploadAvatar(tempFilePath) {
				let res = await api.uploadAvatar(tempFilePath)
				uni.showToast({
					icon: "none",
					title: "upload avatar success"
				})
				this.getBasicInfo()
			},
			async getPostList() {
				let that = this
				if (Object.keys(this.userInfo).length == 0) {
					return
				}
				let res = await api.getPostList(this.userInfo.uid, this.up, this.down)
				if (res.statusCode == '200') {
					if (res.data.posts.length <= this.post.length) {
						this.hasMore = false
					}
					this.post = res.data.posts
				}
			},
			async getBasicInfo() {
				let res = await api.getUserInfo(null, true)
				res.data.avatar = request.BASE_URL + res.data.avatar
				uni.setStorage({
					key: "userInfo",
					data: res.data,
				})
				this.userInfo = res.data
				this.$forceUpdate()
			},
			gotoCreate() {
				if (this.userInfo.uid == '') {
					uni.showToast({
						icon: "none",
						title: "login please"
					})
					return
				}
				uni.navigateTo({
					url: "../../community/publish/publish"
				})
			},
			editName() {
				this.$refs.popup.open()
			},
			close() {
				this.$refs.popup.close()
			},
			async confirm(value) {
				if(value.length > 12) {
					uni.showToast({
						icon:"none",
						title:"username does not allow more than 12 strings"
					})
					return
				}
				let res = await api.setUserInfo(value)
				this.getBasicInfo()
				this.$refs.popup.close()
			}
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
</style>
