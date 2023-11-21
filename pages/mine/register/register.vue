<template>
	<view>
		<view class="title">
			<text>
				<p>Cerate Account</p>
			</text>
		</view>
		<view class="main">
			<image src="../../../static/mine/Group.jpg" style="width: 446rpx; height: 500rpx;margin-top: 74rpx;">
			</image>
			<view class="psd-input">
				<text>Username</text>
				<input v-model="username" class="psd-input-input" type="text" />
				<text>Email</text>
				<input v-model="email" class="psd-input-input" type="text" />
				<text>Verification Code</text>
				<input v-model="verificationCode" class="psd-input-input2" type="text" />
				<view class="get-code" @click="getCode">
					{{codeTxt}}
				</view>
				<text>Password</text>
				<input class="psd-input-input2" :password="showPassword" v-model="password" />
				<view class="psd-input-input" style="font-weight: 700;margin-top: 80rpx;" @click="gotoLogin">Sign up
				</view>
			</view>
		</view>
		<view style="height: 40rpx;"></view>
	</view>
</template>

<script>
	import api from "../../../api/api.js";
	export default {
		data() {
			return {
				showPassword: true,
				password: "",
				email: "",
				username: "",
				verificationCode: "",
				getCodeFlag: true,
				codeTxt: "Get Code"
			}
		},
		methods: {
			gotoLogin() {
				//注册
				if (this.username == "") {
					uni.showToast({
						icon: "none",
						title: "username cannot be empty"
					})
					return
				}
				if (this.email == "") {
					uni.showToast({
						icon: "none",
						title: "email cannot be empty"
					})
					return
				}
				if (this.password == "") {
					uni.showToast({
						icon: "none",
						title: "password cannot be empty"
					})
					return
				}
				if (this.verificationCode == "") {
					uni.showToast({
						icon: "none",
						title: "verificationCode cannot be empty"
					})
					return
				}
				const regEmail = /^([a-zA-Z\.0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/
				if (!regEmail.test(this.email)) {
					uni.showToast({
						icon: "none",
						title: "Email format error"
					})
					return
				}
				api.register(this.email,this.verificationCode,this.username,this.password).then(res =>{
					console.log(res)
					if(res.statusCode == '200') {
						uni.showToast({
							icon:"success",
							title:"the emai has been registered successfully"
						})
						uni.navigateBack({
							delta: 1
						})
					}
					if(res.statusCode == '301') {
						uni.showToast({
							icon:"none",
							title:"the email had been registered"
						})
					}
				})
			},
			getCode() {
				if (!this.getCodeFlag) {
					return
				}
				if(this.email == "") {
					uni.showToast({
						icon:"none",
						title:"email could not be empty"
					})
					return
				}
				this.getCodeFlag = false
				var time = 60
				this.codeTxt = 'Reacquire  ' + time + 's'
				var timer = setInterval(() => {
					this.codeTxt = 'Get Code'
					if (time == 1) {
						this.getCodeFlag = true;
						clearInterval(timer)
					} else {
						time--
						this.codeTxt = 'Reacquire  ' + time + 's'
					}
				}, 1000)
				api.getVerification(this.email).then(res =>{
					uni.showToast({
						icon:"none",
						title:"send success"
					})
				})
			}
		}
	}
</script>

<style>
	page {
		background-image: url(../../../static/mine/ion_earth.png);
		background-repeat: no-repeat;
		background-color: #1D7063;
		background-size: 400rpx 406rpx;
		background-position: right top;
	}

	.title {
		margin-left: 52rpx;
		margin-top: 110rpx;
		color: #FFFFFF;
		font-size: 72rpx;
		font-weight: 700;
		line-height: 88rpx;
	}

	.main {
		width: 684rpx;
		height: 1380rpx;
		background-color: #FFFFFF;
		margin-left: 33rpx;
		box-sizing: border-box;
		border-radius: 40rpx;
		margin-top: 40rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.psd-input {
		margin-left: 10%;
		margin-right: 10%;
	}

	.psd-input text {
		color: #585858;
		font-size: 30rpx;
		font-weight: 700;
		box-sizing: border-box;
		margin-left: 20rpx;
	}

	.psd-input-input {
		background-color: #1D7063;
		width: 632rpx;
		height: 90rpx;
		line-height: 52rpx;
		margin-top: 20rpx;
		margin-bottom: 30rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		vertical-align: middle;
		border-radius: 60rpx;
		padding-left: 20rpx;
		color: #FFFFFF;
	}

	.psd-input-input2 {
		width: 632rpx;
		height: 90rpx;
		line-height: 52rpx;
		margin-top: 20rpx;
		margin-bottom: 30rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		vertical-align: middle;
		border-radius: 60rpx;
		padding-left: 20rpx;
		color: #1D7063;
		border: 2rpx solid #1D7063;
	}

	.get-code {
		position: absolute;
		top: 1160rpx;
		width: 176rpx;
		height: 68rpx;
		border-radius: 60rpx;
		right: 100rpx;
		border: #1D7063 2rpx solid;
		display: flex;
		justify-content: center;
		align-items: center;
		font-family: Inter;
		font-size: 24rpx;
		font-weight: 700;
		line-height: 30rpx;
	}
</style>
