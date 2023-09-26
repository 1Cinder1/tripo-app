<template>
	<view>
		<view :location="location" :change:location="map.onChange" @click="choice" class="title">My Travel Map</view>
		<view class="image-box" style="z-index: 2;" :animation="animationData" @click="gotoDetail" @touchstart="start"
			@touchend="end" @touchmove="move">
			<image src="../../../static/community/avatar.jpg" mode="widthFix"
				style="width: 692rpx;border-radius: 40rpx;z-index: 2; "></image>
		</view>
		<view id="allmap" class="map"></view>
	</view>
</template>

<script>
	export default {
		components: {},
		data() {
			return {
				location: {},
				startData: {
					clientX: '',
					clientY: '',
				},
				touch: {},
				animationData: {}
			}
		},
		onLoad() {
			this.init()
			this.animation = uni.createAnimation()
		},
		onHide() {
			this.animationData = {}
		},
		mounted() {

		},
		methods: {
			init() {
				var t = this;
				t.baiduMap.getlocation().then(res => {
					t.location = res
					t.latitude = res.latitude
					t.longitude = res.longitude
				}).catch(err => {
					console.log(err)
				})
			},
			start(e) {
				this.transition = '.1s'
				this.startData.clientX = e.changedTouches[0].clientX; //手指按下时的X坐标         
				this.startData.clientY = e.changedTouches[0].clientY; //手指按下时的Y坐标
			},
			end(e) {
				this.transition = '.5s'
				if (this.startData.clientY - this.touch.clientY > 80) {
					this.animation.translateY(-230 - 692).step({
						duration: 1000
					})
					this.animationData = this.animation.export()
				}
				this.startData.clientX = ''
				this.startData.clientY = ''
				this.touch = {}
			},
			move(event) {
				let touch = event.touches[0]; //滑动过程中，手指滑动的坐标信息 返回的是Objcet对象
				this.touch = touch;
				console.log(this.touch)
			},
			choice() {
				this.animation.translateY(0).step({
					duration: 0
				})
				this.animationData = this.animation.export()
			},
			gotoDetail() {
				uni.navigateTo({})
			}
		}
	}
</script>

<script module="map" lang="renderjs">
	import {
		mymap
	} from "../../../map.js";
	var bmap = null;
	export default {
		data() {
			return {
				ak: 'GT9ynYt92oCeVk9mbfj11onQL9GU3Zry',
				location: {}
			}
		},
		methods: {
			onChange(newValue, oldValue, ownerInstance, instance) {
				this.location = newValue
				let that = this
				// ================百度地图==================
				mymap(this.ak).then((mymap) => {
					// 创建百度地图实例
					bmap = new BMapGL.Map("allmap");
					var point = new BMapGL.Point(that.location.longitude, that.location.latitude);
					bmap.centerAndZoom(point, 15); //设置缩放级别
					bmap.setTilt(43); //设置倾斜角度
					bmap.setHeading(24.5); //设置地图旋转角度
					bmap.enableScrollWheelZoom();
					var scaleCtrl = new BMapGL.ScaleControl(); // 添加比例尺控件
					bmap.addControl(scaleCtrl);
					var zoomCtrl = new BMapGL.ZoomControl(); // 添加缩放控件
					bmap.addControl(zoomCtrl);
					var marker = new BMapGL.Marker(point); // 创建标注 
					bmap.addOverlay(marker);
					bmap.panTo(point)
				});
			}
		},
		mounted() {

		},
		created() {
			console.log('renderjs初始化完毕')
		}
	}
</script>

<style>
	.map {
		position: absolute;
		bottom: 0rpx;
		width: 750rpx;
		height: 1200rpx;
	}

	.title {
		position: absolute;
		font-family: Inter;
		font-size: 72rpx;
		font-weight: 700;
		line-height: 88rpx;
		text-align: left;
		top: 120rpx;
		left: 46rpx;
	}

	.image-box {
		width: 692rpx;
		position: absolute;
		top: 220rpx;
		left: 29rpx;
		z-index: 2;
	}
</style>
