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
function pushPostInfo(title,content,location) {
	return request.tokenRequestByPost(`/publish/`,{
		title,content,location
	},{
		"Content-Type": 'application/x-www-form-urlencoded'
	})
}
function uploadPostImage(postId,images) {
	return request.uploadFile(`/upload_images/?post_id=${postId}`,images,'images')
}
function getPostInfo(postId) {
	return request.requestByGet(`/get_post/?post_id=${postId}`,{})
}
function deletePost(postId) {
	return request.tokenRequestByDelete(`/delete_post/?post_id=${postId}`,{})
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
function setUserInfo(username) {
	return request.tokenRequestByPost(`/set_user_info/`,{
		username
	})
}
function uploadAvatar(tempFilePaths) {
	return request.uploadFile(`/upload_avatar/`,tempFilePaths,'avatar')
}
function getPostList(uid,up,down) {
	return request.requestByGet(`/post_list/?uid=${uid}&up=${up}&down=${down}`,{});
}
function reSet(email,code,password) {
	return request.requestByPost(`/reset/`,{
		email,code,password
	})
}

export default {
	getVerification,
	register,
	getToken,
	refreshToken,
	getUserInfo,
	modifyPostInfo,
	pushPostInfo,
	getPostInfo,
	deletePost,
	getChatResponse,
	pushImg,
	deleteImg,
	setUserInfo,
	uploadAvatar,
	getPostList,
	uploadPostImage,
	reSet
}