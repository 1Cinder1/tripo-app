//获取位置信息

const getlocation = (opt) => {
	return new Promise((resolve, reject) => {
		uni.showLoading({
			title: '获取信息中'
		});
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
				data.latitude = lats
				data.longitude= lngs
				resolve(data)
				// console.log(data)
			},
			fail: function(err) {
				reject(err)
			},
			complete() {
				uni.hideLoading();
			}
		})
	})
};
export default {
	getlocation: getlocation
}
