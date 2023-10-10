import request from '../utils/request/request.js'

function getVerification(email) {
	return request.requestByGet(`/verification/?email=${email}`,{})
}
function register(email,code,username,password) {
	return request.requestByPost(`/register/`,{
		email,
		code,
		username,
		password
	})
}
function reset(data={}) {
	return request.requestByPost(`/reset/`,data)
}
function getToken(username,password) {
	return request.requestByPost(`/api/token/`,{
		username,password
	})
}
function refreshToken(data={}) {
	return request.requestByPost(`/api/refresh/`,data)
}
function getUserInfo(uid,needToken) {
	if(needToken) {
		return request.tokenRequestByGet(`/get_user_info/`,{})
	}else {
		return request.requestByGet(`/get_user_info/?uid=${uid}`,{})
	}
}
function modifyPostInfo(data={}) {
	return request.tokenRequestByPost(`/set_post_info/`,data)
}
function pushPostInfo(data={}) {
	return request.tokenRequestByPost(`/push_post_info/`,data)
}
function getPostInfo(data={}) {
	return request.requestByGet(`/get_post_info/`,data)
}
function deletePostInfo(data={}) {
	return request.tokenRequestByDelete(`/delete_post_info/`,data)
}
function getChatResponse(data={}) {
	return request.tokenRequestByGet(`/get_chat_response/`,data)
}
function pushImg(data={}) {
	return request.tokenRequestByPost(`/push_img/`,data)
}
function deleteImg(data={}) {
	return request.tokenRequestByDelete(`/delete_img/`,data)
}

export default {
	getVerification,
	register,
	reset,
	getToken,
	refreshToken,
	getUserInfo,
	modifyPostInfo,
	pushPostInfo,
	getPostInfo,
	deletePostInfo,
	getChatResponse,
	pushImg,
	deleteImg
}