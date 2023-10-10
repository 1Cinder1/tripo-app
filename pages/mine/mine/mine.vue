<template>
	<view>
		<view
			style="height: 120rpx;display: flex;flex-direction: row;align-items: center;justify-content: center;margin-top: 50rpx;">
			<view style="font-size: 32rpx;font-weight: 700;">My Profile</view>
		</view>
		<view
			style="display: flex;flex-direction: column;justify-content: center;align-items: center;margin-top: 80rpx;">
			<view>
				<image :src="userInfo.avatar" style="width: 200rpx;border-radius: 50%;height: 200rpx;" @longtap="chooseImage"></image>
			</view>
			<view style="font-size: 48rpx;font-weight: 600;margin-top: 48rpx;">
				{{userInfo.username}}
				<image src="../../../static/mine/edit.png"
					style="width: 48rpx;margin-left: 16rpx;vertical-align: middle;" @click="editName" mode="widthFix">
				</image>
			</view>
			<uni-popup ref="popup" type="dialog">
				<uni-popup-dialog mode="input" message="成功消息" :value="userInfo.username" :duration="2000" :before-close="true" @close="close"
					@confirm="confirm"></uni-popup-dialog>
			</uni-popup>
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
		<view class="main" style="margin-top: 20rpx;">
			<view style="box-sizing: border-box;">
				<image src="../../../static/community/logo.png"
					style="width: 282rpx; height: 180rpx;border-radius: 30rpx;vertical-align: middle;"></image>
			</view>
			<view style="margin-left: 20rpx;">
				<view style="font-weight: 600;font-size: 36rpx;">Lake Trip</view>
				<view style="margin-top: 14rpx;">
					<image src="../../../static/community/location.png" style="width: 24rpx;height: 28rpx;"></image>
					<text style="margin-left: 16rpx;color: #636363;font-size: 24rpx;">Location</text>
				</view>
				<view style="margin-top: 14rpx; color: #636363;font-size: 24rpx;">2022/12/02</view>
			</view>
			<view>
				<image src="../../../static/mine/gpt.png" mode="widthFix" style="width: 64rpx;margin-left: 96rpx;">
				</image>
			</view>
		</view>
	</view>
</template>

<script>
	import api from "../../../api/api.js";
	import request from "../../../utils/request/request.js"
	export default {
		data() {
			return {
				userInfo: {},
				defaultImage: "../../../static/defaultAvatar.png"
			}
		},
		onLoad() {
			this.userInfo = uni.getStorageSync("userInfo")
		},
		methods: {
			back() {
				uni.navigateBack({
					delta: 1
				})
			},
			chooseImage() {
				let that = this
				uni.chooseImage({
					count:1,
					sizeType:['original'],
					sourceType:['album'],
					success: (res) => {
						api.uploadAvatar(res.tempFilePaths[0]).then(response=>{
							uni.showToast({
								icon:"none",
								title:"upload avatar success"
							})
							that.getBasicInfo()
						})
					}
				})
			},
			async getBasicInfo() {
				let that = this
				api.getUserInfo(null,true).then(res => {
					res.data.avatar = request.BASE_URL + res.data.avatar
					console.log(res.data)
					uni.setStorage({
						key:"userInfo",
						data:res.data,
					})
					that.userInfo = res.data
				})
				this.$forceUpdate()
			},
			gotoCreate() {
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
			confirm(value) {
				api.setUserInfo(value).then(res=>{
					console.log(res)
				})
				this.getBasicInfo()
				this.$refs.popup.close()
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
