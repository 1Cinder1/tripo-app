<template>
	<view>
		<view class="title">
			Welcome to Tripo
		</view>
		<view class="icon">
			<image src="../../../static/mine/Group.jpg" style="width: 446rpx; height: 500rpx;" ></image>
		</view>
		<view class="psd-input">
			<text>Email</text>
			<input v-model="email" type="text"/>
			<text>Password</text>
			<input :password="showPassword" v-model="password"/>
		</view>
		<text class="reset" @click="gotoReset">Forgot your password? click to reset</text>
		<view style="display: flex;justify-content: center;" @click="login">
			<view class="login">
				Log in
			</view>
		</view>
		<view style="display: flex;justify-content: center;margin-top: 40rpx;font-size: 20rpx;font-weight: 400;color: #585858;">
			Dont't have an Account?
		</view>
		<view style="display: flex;justify-content: center;" @click="gotoRegister">
			<view class="create-account">
				Create Account
			</view>
		</view>
	</view>
</template>

<script>
	import api from "../../../api/api.js";
	export default {
		data() {
			return {
				showPassword:true,
				password: "",
				email:""
			}
		},
		onLoad() {
			uni.clearStorage()
		},
		methods: {
			gotoReset() {
				uni.navigateTo({
					url:"../reset/reset"
				})
			},
			login(){
				if(this.password == "" || this.email == ""){
					uni.showToast({
						icon:"none",
						title:"email or password cannot be empty"
					})
					return
				}
				const regEmail = /^([a-zA-Z\.0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/
				if(!regEmail.test(this.email)) {
					uni.showToast({
						icon:"none",
						title:"Email format error"
					})
					return
				}
				api.getToken(this.email,this.password).then(res => {
					if(res.statusCode == '200') {
						uni.setStorage({
							key:"access_token",
							data:res.data.access,
						})
						uni.setStorage({
							key:"refresh_token",
							data:res.data.refresh
						})
						uni.switchTab({
							url:"../../community/community/community"
						})
					}else {
						uni.showToast({
							icon:"none",
							title:res.data.detail
						})
					}
				})
			},
			gotoRegister(){
				uni.navigateTo({
					url: "../register/register"
				})
			},
		}
	}
</script>

<style>
	page {
		background-image: url(../../../static/mine/ion_earth.jpg);
		background-size: 800rpx 800rpx;
		background-repeat: no-repeat;
		background-position: left bottom; 
	}
	.title {
		text-align: center;
		font-size: 72rpx;
		font-weight: 900;
		margin-top: 140rpx;
	}
	.reset {
		font-family: Inter;
		font-size: 26rpx;
		font-weight: 400;
		margin-left: 72rpx;
	}
	.icon {
		align-items: center;
		display: flex;
		justify-content: center;
		margin-top: 40rpx;
		margin-bottom: 80rpx;
	}
	.psd-input {
		margin-left: 10%;
		margin-right: 10%;
	}
	.psd-input text{
		color: #585858;
		font-size: 30rpx;
		font-weight: 700;
		box-sizing: border-box;
	}
	.psd-input input{
		border-style: solid;
		border-width: 0 0 2rpx 0;
		border-color: #1D7063;
		width: 632rpx;
		height: 52rpx;
		line-height: 52rpx;
		margin-top: 20rpx;
		margin-bottom: 22rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		vertical-align: middle;
	}
	.login {
		margin-top: 80rpx;
		width: 634rpx;height: 88rpx;
		background-color: #1D7063;
		border-radius: 40rpx;
		color: #FFFFFF;
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 30rpx;
		font-weight: 700;
	}
	.create-account {
		margin-top: 46rpx;
		width: 634rpx;
		height: 88rpx;
		border: 2rpx solid #1D7063;
		opacity: 100%;
		border-radius: 40rpx;
		color: #1D7063;
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 30rpx;
		font-weight: 700;
	}
</style>
