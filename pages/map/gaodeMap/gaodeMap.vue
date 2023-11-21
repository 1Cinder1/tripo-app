<template>
	<view>
		<web-view src="/hybrid/html/map.html" @message="message"></web-view>
	</view>
</template>

<script>
	import api from "../../../api/api.js"
	export default {
		data() {
			return {
				post:[],
				up:0,
				down:10,
				longitude:'',
				latitude:''
			}
		},
		onShow() {
			this.getLocation()
		},
		methods: {
			update(msg) {
				const currentWebview = this.$scope.$getAppWebview().children()[0];
				currentWebview.evalJS(`dataFromApp(${JSON.stringify(msg)})`);
			},
			async getNearby(longitude,latitude) {
				let res = await api.getNearby(longitude,latitude)
				if(res.statusCode == '200') {
					this.post = res.data.post_id
					for(let i=0;i<this.post.length;i++) {
						this.post[i] = await this.getPostInfo(this.post[i])
					}
				}
				console.log(this.post)
				this.update(this.post)
			},
			message(data) {
				let postId=''
				console.log(data)
				for(let i =0;i<this.post.length;i++) {
					let split = this.post[i].location.split(" ")
					if(split[1] == data.detail.data[0].longitude && split[2] == data.detail.data[0].latitude) {
						postId = this.post[i].post_id
						break
					}
				}
				if(postId == '') {
					return
				}
				console.log(postId)
				uni.navigateTo({
					url:`../aiIntro/aiIntro?postId=${postId}`
				})
			},
			async getPostInfo(postId) {
				let res = await api.getPostInfo(postId)
				let result = {}
				result.post_id = postId
				if(res.statusCode == '200') {
					result.location = res.data.location
				}
				return result
			},
			getLocation() {
				let that = this
				uni.getLocation({
					// map组件默认为国测局坐标gcj02，调用 uni.getLocation返回结果传递给组件时，需指定 type 为 gcj02
					type: 'gcj02',
					geocode: true,
					success: function(data) {
						let { latitude, longitude } = data
						let x = longitude
						let y = latitude
						let x_pi = (3.14159265358979324 * 3000.0) / 180.0
						let z = Math.sqrt(x * x + y * y) + 0.00002 * Math.sin(y * x_pi)
						let theta = Math.atan2(y, x) + 0.000003 * Math.cos(x * x_pi)
						let lngs = z * Math.cos(theta) + 0.0065
						let lats = z * Math.sin(theta) + 0.006
						that.getNearby(lngs,lats)
					},
					fail: function(err) {
						uni.showToast({
							icon:'none',
							title:"get location error"
						})
					},
					complete() {
						uni.hideLoading();
					}
				})
			}
		}
	}
</script>

<style>

</style>
