<template>
	<view>
		<view style="height: 120rpx;display: flex;flex-direction: row;align-items: center;">
			<view class="left" @click="back">
				<image src="../../../static/left.png" style="width: 50rpx;" mode="widthFix"></image>
			</view>
		</view>
		<view>
			<scroll-view scroll-x="true" @scroll="scroll" class="scroll">
				<view class="scroll-item">
					<image src="../../../static/community/avatar.jpg" class="scroll-item-image"
						style="width: 346rpx;height: 404rpx;"></image>
				</view>
				<view class="scroll-item">
					<image src="../../../static/community/Rectangle.png" class="scroll-item-image"
						style="width: 346rpx;height: 404rpx;"></image>
				</view>
				<view class="scroll-item">
					<image src="../../../static/community/Rectangle.png" class="scroll-item-image"
						style="width: 346rpx;height: 404rpx;"></image>
				</view>
				<view class="scroll-item" @click="addImage">
					<image src="../../../static/publish/add.jpg"
						style="width: 88rpx;height: 184rpx;margin-bottom: 128rpx;margin-left: 122rpx"></image>
				</view>
			</scroll-view>
		</view>
		<view style="font-size: 32rpx;font-weight: 600;">
			<view style="margin-top: 5rpx;margin-left: 50rpx;display: inline-block;">Arriving Date To</view>
			<input v-model="placeName" class="place-name"/>
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
		<textarea maxlength="-1" class="content" :value="content">
		</textarea>
		<view class="post" @click="post">Post</view>
		<view style="height: 60rpx;"></view>
	</view>
</template>

<script>
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
				placeName:""
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
			back() {
				uni.navigateBack({
					delta: 1
				})
			},
			scroll() {

			},
			addImage() {

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
		top: 660rpx;
		width: 300rpx;
	}
</style>
