<template>
	<view>
		<view style="height: 120rpx;display: flex;flex-direction: row;align-items: center;">
			<view class="left" @click="back">
				<image src="../../../static/left.png" style="width: 50rpx;" mode="widthFix"></image>
			</view>
		</view>
		<view>
			<scroll-view scroll-x="true" class="scroll">
				<view v-for="(item,index) in images" class="scroll-item" @click="previewImage(index)">
					<image :src="item" class="scroll-item-image" style="width: 346rpx;height: 404rpx;"></image>
				</view>
<!-- 				<view class="scroll-item">
					<image src="../../../static/community/avatar.jpg" class="scroll-item-image"
						style="width: 346rpx;height: 404rpx;"></image>
				</view> -->
				<view class="scroll-item" @click="addImage">
					<image src="../../../static/publish/add.jpg"
						style="width: 88rpx;height: 184rpx;margin-bottom: 128rpx;margin-left: 122rpx"></image>
				</view>
			</scroll-view>
		</view>
		<view style="font-size: 32rpx;font-weight: 600;position: relative;">
			<view style="margin-top: 5rpx;margin-left: 50rpx;display: inline-block;">Arriving Date To</view>
			<input v-model="placeName" class="place-name" @click="chooseLocation"/>
		</view>
		<picker class="date" mode="date" :value="date" :start="startDate" :end="endDate" @change="bindDateChange">
			<view>{{date}}</view>
		</picker>
		<view style="margin-left: 50rpx;margin-top: 64rpx;">
			<view style="font-size: 32rpx;font-weight: 600;">Time</view>
			<picker style="margin-top: 34rpx;" mode="time" :value="time" :start="startDate" :end="endDate"
				@change="bindDateChange">
				<view>{{time}}</view>
			</picker>
		</view>
		<view style="margin-top: 34rpx;">
			<input placeholder="RedFish Lake(title)" v-model="title"
				style="border-bottom: #1E1E1E solid 2rpx;width: 400rpx;margin-left: 50rpx;" />
		</view>
		<textarea maxlength="-1" class="content" v-model="content">
		</textarea>
		<scroll-view scroll-x="true" class="scroll-view">
			<view v-for="(item,index) in topBarList" class="scroll-item-2" :id="'item'+index" :class="{active:item.select}"
				 @click="toggleclass(index)">
				<text>{{item.name}}</text>
			</view>
			<view class="scroll-item-2" style="background-color: #1D7063;color: #FFFFFF;" @click="generateTags"><text>generate tags</text></view>
		</scroll-view>
		<view class="post" @click="post">Post</view>
		<view style="height: 60rpx;"></view>
	</view>
</template>

<script>
	import api from "../../../api/api.js";
	export default {
		data() {
			const currentDate = this.getDate({
				format: true
			});
			const currentTime = new Date().getHours() + ":" + new Date().getMinutes();
			return {
				date: currentDate,
				time: currentTime,
				content:"",
				title:"",
				placeName:"",
				userInfo:{},
				images:[],
				longitude:"",
				latitude:"",
				toview: "",
				topBarList: [],
				activeindex: 0
			}
		},
		computed: {
			startDate() {
				return this.getDate('start');
			},
			endDate() {
				return this.getDate('end');
			}
		},
		methods: {
			toggleclass(index) {
				this.topBarList[index].select = !this.topBarList[index].select
			},
			back() {
				uni.navigateBack({
					delta: 1
				})
			},
			async generateTags() {
				let res = await api.generateTags(this.date+" "+this.time,this.title,this.content,this.placeName)
				if(res.statusCode == '200') {
					for(let i=0;i<res.data.length;i++) {
						let temp ={}
						temp.name = res.data[i]
						temp.select = false
						this.topBarList.push(temp)
					}
				}
			},
			deleteTag(index) {
				let that = this
				uni.showModal({
					content:'confirm to delete tag'+this.topBarList[index],
					success() {
							that.topBarList.splice(index,1)
					}
				})
			},
			chooseLocation() {
				let that = this
				// uni.navigateTo({
				// 	url:"../chooseLocation/chooseLocation"
				// })
				uni.chooseLocation({
					success(res) {
						console.log(res)
						that.placeName = res.address
						that.longitude = res.longitude
						that.latitude = res.latitude
					}
				})
			},
			previewImage(index) {
				let that = this
				console.log(this.images)
				uni.previewImage({
					current:index,
					urls: that.images
				})
			},
			addImage() {
				let that = this
				uni.chooseImage({
					count:1,
					// sizeType:['compressed'],
					sourceType:['album'],
					crop:{
						width:344,
						height:370
					},
					success: (res) => {
						console.log(res)
						this.images.push(...res.tempFilePaths)
					}
				})
			},
			getDate(type) {
				const date = new Date();
				let year = date.getFullYear();
				let month = date.getMonth() + 1;
				let day = date.getDate();

				if (type === 'start') {
					year = year - 60;
				} else if (type === 'end') {
					year = year + 2;
				}
				month = month > 9 ? month : '0' + month;
				day = day > 9 ? day : '0' + day;
				return `${year}-${month}-${day}`;
			},
			bindDateChange() {

			},
			post() {
				if(this.title == "" || this.content == "" || this.placeName == "") {
					uni.showToast({
						icon:"none",
						title:"title content placeName is not allowed to be empty"
					})
					return
				}
				this.userInfo = uni.getStorageSync("userInfo")
				let that = this
				let place = this.placeName+" "+this.longitude+" "+this.latitude
				let temp=[]
				for(let i=0;i<this.topBarList.length;i++) {
					if(this.topBarList[i].select) {
							temp.push(this.topBarList[i].name)
					}
				}
				api.pushPostInfo(this.title,this.content,place,JSON.stringify(temp)).then(res=>{
					console.log(res)
					if(res.statusCode == '200') {
						uni.showToast({
							icon:"success",
							title:"publish success"
						})
						uni.navigateBack()
						for(let i=0;i<that.images.length;i++) {
								that.uploadImages(res.data.post_id,that.images[i])
						}
						uni.removeStorageSync('conclusion')
					}
				})
			},
			uploadImages(postId,path) {
				api.uploadPostImage(postId,path).then(res=>{
					console.log(res)
				})
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

	.scroll {
		white-space: nowrap;
		width: 100%;
		display: inline-block;
		overflow: hidden;
		margin-top: 34rpx;
		margin-left: 30rpx;

	}

	.scroll-item {
		width: 346rpx;
		height: 404rpx;
		display: inline-block;
		margin-right: 10rpx;
	}

	.scroll-item-image {
		border-radius: 40rpx;
		box-shadow: 0rpx 18rpx 18rpx 0rpx #00000026;
	}

	.date {
		margin-left: 50rpx;
		margin-top: 64rpx;
		color: #3D3D3D;
	}

	.post {
		margin-left: 50rpx;
		width: 656rpx;
		border-radius: 40rpx;
		background-color: #1D7063;
		height: 90rpx;
		margin-top: 108rpx;
		color: #FFFFFF;
		align-items: center;
		display: flex;
		justify-content: center;
		font-size: 32;
		font-weight: 600;
	}

	.content {
		margin-left: 50rpx;
		margin-top: 34rpx;
		width: 656rpx;
		min-height: 400rpx;
		background-color: #FFFFFF;
		border: #000000 solid 2rpx;
		padding: 10rpx;
	}

	.place-name {
		border-bottom: #1E1E1E solid 2rpx;
		margin-left: 4rpx;
		position: absolute;
		left: 300rpx;
		top: 0rpx;
		width: 300rpx;
	}
	.scroll-view {
		height: 80rpx;
		white-space: nowrap;
		margin-left: 50rpx;
		margin-top: 26rpx;
		width: 86%;
	}
	
	.scroll-item-2 {
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
