const ALL_URL = {
	'PRO':'http://tripo.ilnf.space:8090'
};
let BASE_URL=ALL_URL.PRO;
function tokenRequestByGet(path,data = {}) {
	const token = uni.getStorageSync("access_token");
	if(token == '' || token == null) {
		uni.showToast({
			icon:"none",
			title:"请先登录"
		})
		uni.navigateTo({
			url:"/pages/mine/login/login.vue"
		})
		return
	}
	return new Promise((resolve, reject)=>{
		uni.request({
			url: BASE_URL + path,
			method: 'GET',
			data,
			header: {
				"AUTHORIZATION": 'Bearer ' + token
			},
			success(response) {
				let res = {}
				res.data = response.data
				res.statusCode = response.statusCode
				resolve(res)
			},
			fail(err) {
				uni.showToast({
					icon: "none",
					title: '服务响应失败'
				});
				console.error(err);
				reject(err);
			},
			complete() {
				uni.hideLoading();
			}
		});
	})
};
function tokenRequestByDelete(path,data = {}) {
	const token = uni.getStorageSync("access_token");
	if(token == '' || token == null) {
		uni.showToast({
			icon:"none",
			title:"请先登录"
		})
		uni.navigateTo({
			url:"/pages/mine/login/login.vue"
		})
		return
	}
	return new Promise((resolve, reject)=>{
		uni.request({
			url: BASE_URL + path,
			method: 'DELETE',
			data,
			header: {
				"AUTHORIZATION": 'bearer ' + token
			},
			success(response) {
				let res = {}
				res.data = response.data
				res.statusCode = response.statusCode
				resolve(res)
			},
			fail(err) {
				uni.showToast({
					icon: "none",
					title: '服务响应失败'
				});
				console.error(err);
				reject(err);
			},
			complete() {
				uni.hideLoading();
			}
		});
	})
};
function tokenRequestByPost(path,data = {}) {
	const token = uni.getStorageSync("access_token");
	if(token == '' || token == null) {
		uni.showToast({
			icon:"none",
			title:"请先登录"
		})
		uni.navigateTo({
			url:"/pages/mine/login/login.vue"
		})
		return
	}
	return new Promise((resolve, reject)=>{
		uni.request({
			url: BASE_URL + path,
			method: 'POST',
			data,
			header: {
				"AUTHORIZATION": 'bearer ' + token
			},
			success(response) {
				let res = {}
				res.data = response.data
				res.statusCode = response.statusCode
				resolve(res)
			},
			fail(err) {
				uni.showToast({
					icon: "none",
					title: '服务响应失败'
				});
				console.error(err);
				reject(err);
			},
			complete() {
				uni.hideLoading();
			}
		});
	})
}
function requestByGet(path,data = {}) {
	return new Promise((resolve, reject)=>{
		uni.request({
			url: BASE_URL + path,
			method: 'GET',
			data,
			header: {},
			success(response) {
				let res = {}
				res.data = response.data
				res.statusCode = response.statusCode
				resolve(res)
			},
			fail(err) {
				uni.showToast({
					icon: "none",
					title: '服务响应失败'
				});
				console.log(err);
				reject(err);
			},
			complete() {
				uni.hideLoading();
			}
		});
	})
}
function requestByPost(path,data = {}) {
	return new Promise((resolve, reject)=>{
		uni.request({
			url: BASE_URL + path,
			method: 'POST',
			data,
			header: {},
			success(response) {
				let res = {}
				res.data = response.data
				res.statusCode = response.statusCode
				resolve(res)
			},
			fail(err) {
				uni.showToast({
					icon: "none",
					title: '服务响应失败'
				});
				console.log(err);
				reject(err);
			},
			complete() {
				uni.hideLoading();
			}
		});
	})
};

export default {
	tokenRequestByGet,
	tokenRequestByPost,
	requestByGet,
	requestByPost,
	tokenRequestByDelete
}