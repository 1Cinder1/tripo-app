<template>
	<view>
		<view style="height: 120rpx;display: flex;flex-direction: row;align-items: center;">
			<view class="left" @click="back">
				<image src="../../../static/left.png" style="width: 50rpx;" mode="widthFix"></image>
			</view>
			<view style="margin-top: 54rpx;margin-left: 144rpx;font-size: 32rpx;font-weight: 700;"></view>
		</view>
		<!-- 		<view class="main-image-fa">
			<image src="../../../static/community/avatar.jpg" mode="widthFix" class="main-image"></image>
		</view> -->
		<swiper class="main-image-fa" indicator-dots="true">
			<swiper-item v-for="(item,index) in detail.images" style="width: 688rpx;
		border-radius: 40rpx;">
				<image :src="baseUrl + item" mode="widthFix" class="main-image"></image>
			</swiper-item>
		</swiper>
		<view style="display: flex;flex-direction: row;" v-if="Object.keys(detail).length != 0">
			<view style="margin-left: 46rpx; width: 256rpx;">
				<view style="font-size: 40rpx;font-weight: 600;">{{detail.title}}</view>
				<view style="margin-top: 20rpx;">
					<image src="../../../static/community/location.png" style="width: 26rpx;vertical-align: middle;"
						mode="widthFix"></image>
					<text style="margin-left: 10rpx;">{{detail.location.split(" ")[0]}}</text>
				</view>
			</view>
			<view style="display: flex;flex-direction: row;margin-left: 140rpx;">
				<view style="max-width: 200rpx;word-wrap:break-word;color: #636363;">
					<text>Posted by {{detail.username}} \n {{detail.time.split('T')[0]}} \n
						{{detail.time.split('T')[1].split(".")[0]}} </text>
				</view>
				<image :src="baseUrl + detail.avatar" style="width: 84rpx;border-radius: 50%;" mode="widthFix"
					@click="gotoOther"></image>
			</view>
		</view>
		<view class="dis-text">
			<text>{{detail.content}}</text>
		</view>
		<view class="float-like-comment-box">
			<image src="../../../static/community/Like.png" v-if="!isLike" class="like" @click="like"></image>
			<image src="../../../static/community/Liked.png" v-else class="like" @click="concelLike"></image>
			<image src="../../../static/community/Comment.png" @click="comment"
				style="width: 64rpx;height: 64rpx;margin-left: 70rpx;">
			</image>
		</view>
		<uni-popup ref="popup">
			<view class="popup">
				<view @touchstart="start" @touchend="end" @touchmove="move">
					<view class="bottom-stick"></view>
				</view>
				<scroll-view scroll-y="true" style="height: 1180rpx;">
					<view v-if="comments.length >0" v-for="(item,index) in comments" style="display: flex;flex-direction: row;margin-bottom: 40rpx;">
						<image :src="baseUrl + item.avatar" style="height: 96rpx;width: 96rpx;border-radius: 50%;margin-left: 42rpx;"></image>
						<view style="margin-left: 20rpx;width: 280rpx;">
							<view style="font-size: 30rpx;font-weight: 500;">{{item.username}}</view>
							<view style="font-size: 26rpx;font-weight: 400;color: #5B5B5B;margin-top: 26rpx;">{{item.content}}</view>
						</view>
						<view style="margin-left: 128rpx;width: 126rpx;color: #7F8790;font-size: 26rpx;">
							{{item.time.split('.')[0].replace('-','/').replace('-','/')}}
						</view>
					</view>
				</scroll-view>
				<view class="send-box">
					<input style="width: 600rpx;" cursor-spacing="20" v-model="commentContent">
						<view class="send" @touchend.prevent= "sendComment">send</view>
					</input>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import api from "../../../api/api.js"
	import request from "../../../utils/request/request.js"
	export default {
		data() {
			return {
				postId: 0,
				detail: {},
				baseUrl: request.BASE_URL,
				showPopup: false,
				startData: {
					clientX: '',
					clientY: '',
				},
				touch: {},
				commentContent: "",
				isLike: false,
				comments:[]
			}
		},
		onLoad(options) {
			this.postId = options.postId
			this.getPostInfo()
			this.queryLike()
		},
		methods: {
			back() {
				uni.navigateBack({
					delta: 1
				})
			},
			start(e) {
				this.transition = '.1s'
				this.startData.clientX = e.changedTouches[0].clientX; //手指按下时的X坐标         
				this.startData.clientY = e.changedTouches[0].clientY; //手指按下时的Y坐标
			},
			end(e) {
				this.transition = '.5s'
				if (this.touch.clientY - this.startData.clientY > 80) {
					this.$refs.popup.close()
				}
				this.startData.clientX = ''
				this.startData.clientY = ''
				this.touch = {}
			},
			move(event) {
				let touch = event.touches[0]; //滑动过程中，手指滑动的坐标信息 返回的是Objcet对象
				this.touch = touch;
			},
			change(e) {
				console.log('当前模式：' + e.type + ',状态：' + e.show);
			},
			gotoOther() {
				console.log(this.detail)
				uni.navigateTo({ 
					url:`../../mine/other/other?uid=${this.detail.uid}`
				})
			},
			async like() {
				let res = await api.like(this.postId)
				if(res.statusCode == '200') {
					this.queryLike()
				}
			},
			async concelLike() {
				let res = await api.cancelLike(this.postId)
				if(res.statusCode == '200') {
					this.queryLike()
				}
			},
			async sendComment() {
				let res = await api.sendComment(this.postId, this.commentContent)
				let userInfo = uni.getStorageSync('userInfo')
				let temp = {}
				if(res.statusCode == '200') {
					temp.content = this.commentContent
					this.commentContent = ''
					temp.time = new Date().getFullYear() +"/" + (new Date().getMonth()+1) +"/"+ new Date().getDate() +" "+ new Date().getHours() + ":" + new Date().getMinutes()+":" +new Date().getSeconds()
					temp.username = userInfo.username
					temp.avatar = userInfo.avatar.split(this.baseUrl)[1]
					this.comments.push(temp)
				}
				console.log(this.comments)
			},
			comment() {
				this.showPopup = true
				this.$refs.popup.open('bottom')
			},
			close() {
				this.showPopup = false
			},
			gotoMine() {
				console.log(this.detail)
				uni.navigateTo({
					url: `../../mine/mine/mine?isVisitor=${true}&username=${this.detail.username}&avatar=${this.detail.avatar}&email=${this.detail.email}`
				})
			},
			async getPostInfo() {
				let res = await api.getPostInfo(this.postId)
				console.log(res)
				if (res.statusCode == '200') {
					this.detail = res.data
					let temp = []
					for(let i=0;i<res.data.comments.content.length;i++) {
						let result = await this.getUserinfo(res.data.comments.content[i].user)
						temp.push(Object.assign(res.data.comments.content[i],result))
					}
					this.comments = temp
					console.log(this.comments)
					this.$forceUpdate()
				}
			},
			async queryLike() {
				let res = await api.queryLike(this.postId)
				if (res.statusCode == '200') {
					this.isLike = res.data.liked
				}
			},
			async getUserinfo(uid) {
				let res = await api.getUserInfo(uid,false)
				let result = {}
				if(res.statusCode == '200') {
					result = res.data
					return result
				}
			}
		}
	}
</script>

<style>
	page {
		background-color: #F7F7F7;
	}

	.left {
		width: 100rpx;
		height: 50rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		border-radius: 40rpx;
		margin-top: 70rpx;
		margin-left: 46rpx;
	}

	.main-image {
		width: 688rpx;
		border-radius: 40rpx;
		box-shadow: 0px 9.953792572021484px 9.953792572021484px 0px #00000026;
	}

	.main-image-fa {
		width: 688rpx;
		height: 740rpx;
		margin-left: 31rpx;
		margin-top: 36rpx;
		border-radius: 40rpx;
		margin-bottom: 20rpx;
	}

	.dis-text {
		font-family: Inter;
		font-size: 30rpx;
		font-weight: 400;
		line-height: 46rpx;
		margin-left: 46rpx;
		margin-right: 46rpx;
		margin-top: 66rpx;
		color: #636363;
	}

	.popup-content {
		@include flex;
		align-items: center;
		justify-content: center;
		padding: 15px;
		height: 50px;
		background-color: #fff;
	}

	.popup {
		height: 1400rpx;
		background-color: #FFFFFF;
		border-radius: 80rpx 80rpx 0rpx 0rpx;
		display: flex;
		align-items: center;
		flex-direction: column;
	}

	.bottom-stick {
		height: 10rpx;
		width: 268rpx;
		background-color: #000000;
		margin-top: 34rpx;
		margin-bottom: 44rpx;
		border-radius: 6rpx;
	}

	.send {
		position: absolute;
		right: 40rpx;
		background-color: #1D7063;
		margin-left: 10rpx;
		width: 100rpx;
		height: 60rpx;
		border-radius: 20rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		color: #FFFFFF;
	}

	.send-box {
		width: 650rpx;
		position: absolute;
		bottom: 40rpx;
		height: 80rpx;
		border-radius: 40rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		border: #000000 2rpx solid;
	}

	.like {
		width: 64rpx;
		height: 64rpx;
		margin-left: 40rpx;
		margin-top: 10rpx;
	}

	.float-like-comment-box {
		position: fixed;
		width: 280rpx;
		height: 80rpx;
		background: #1DAB89;
		bottom: 160rpx;
		left: 46rpx;
		border-radius: 40rpx;
	}
</style>
