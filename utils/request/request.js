const ALL_URL = {
	'PRO':'http://tripo.ilnf.space:8090'
};
let BASE_URL=ALL_URL.PRO;
function tokenRequestByGet(path,data = {}) {
	const token = uni.getStorageSync("access_token");
	if(token == '' || token == null) {
		logout()
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
				let flag = vaildTokenExpired(response)
				if(flag == 'reRequest') {
					tokenRequestByGet(path,data)
					return
				}else if(flag == 'logout') {
					return
				}
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
		logout()
		return
	}
	return new Promise((resolve, reject)=>{
		uni.request({
			url: BASE_URL + path,
			method: 'DELETE',
			data,
			header: {
				"AUTHORIZATION": 'Bearer ' + token
			},
			success(response) {
				let res = {}
				res.data = response.data
				res.statusCode = response.statusCode
				let flag = vaildTokenExpired(response)
				if(flag == 'reRequest') {
					tokenRequestByDelete(path,data)
					return
				}else if(flag == 'logout') {
					return
				}
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
function tokenRequestByPost(path,data = {},header={}) {
	const token = uni.getStorageSync("access_token");
	if(token == '' || token == null) {
		logout()
		return
	}
	header.AUTHORIZATION = 'Bearer ' + token
	console.log(token)
	return new Promise((resolve, reject)=>{
		uni.request({
			url: BASE_URL + path,
			method: 'POST',
			data,
			header: header,
			success(response) {
				let res = {}
				res.data = response.data
				res.statusCode = response.statusCode
				
				let flag = vaildTokenExpired(response)
				if(flag == 'reRequest') {
					tokenRequestByPost(path,data)
					return
				}else if(flag == 'logout') {
					return
				}
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
function uploadFile(path,tempFilePaths,name,data={}) {
	const token = uni.getStorageSync("access_token");
	if(token == '' || token == null) {
		logout()
		return
	}
	return new Promise((resolve, reject)=>{
		uni.uploadFile({
			url:BASE_URL + path,
			filePath: tempFilePaths,
			name: name,
			header: {
				"AUTHORIZATION": 'Bearer ' + token
			},
			formData: data,
			success(response) {
				let res = {}
				res.data = response.data
				res.statusCode = response.statusCode
				
				let flag = vaildTokenExpired(response)
				if(flag == 'reRequest') {
					tokenRequestByPost(path,data)
					return
				}else if(flag == 'logout') {
					return
				}
				resolve(res)
			},
			fail(err) {
				console.log(err)
				reject(err)
			}
		})
	})
};
function logout() {
	uni.showToast({
		icon:"none",
		title:"login please"
	})
	uni.reLaunch({
		url:"/pages/mine/login/login.vue"
	})
}
function vaildTokenExpired(response) {
	if(response.statusCode == '401' && response.data.code =='token_not_valid') {
		let refresh = uni.getStorageSync("refresh_token")
		if(refresh == '') {
			logout()
		}
		let data = {}
		data.refresh = refresh
		requestByPost(`/api/refresh/`,data).then(res =>{
			if(res.statusCode == '200') {
				uni.setStorage({
					key:"access_token",
					data:res.data.access,
				})
				uni.setStorage({
					key:"refresh_token",
					data:res.data.refresh
				})
				console.log('reRequest')
				return 'reRequest'
			}else {
				logout()
				return 'logout'
			}
		})
		return 'logout'
	}else {
		return 'next'
	}
}

export default {
	tokenRequestByGet,
	tokenRequestByPost,
	requestByGet,
	requestByPost,
	tokenRequestByDelete,
	uploadFile,
	BASE_URL
}