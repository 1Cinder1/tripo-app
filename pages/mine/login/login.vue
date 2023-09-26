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
	export default {
		data() {
			return {
				showPassword:true,
				password: "",
				email:""
				
			}
		},
		methods: {
			login(){
				if(this.password == "" || this.email == ""){
					uni.showToast({
						icon:"none",
						title:"email or password cannot be empty"
					})
					return
				}
				const regEmail = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/
				if(!regEmail.test(this.email)) {
					uni.showToast({
						icon:"none",
						title:"Email format error"
					})
					return
				}
				uni.switchTab({
					url:"../../community/community/community"
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
		margin-bottom: 76rpx;
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
