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
function pushPostInfo(title,content,location,tags) {
	return request.tokenRequestByPost(`/publish/`,{
		title,content,location,tags
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
function setUserInfo(username) {
	return request.tokenRequestByPost(`/set_user_info/`,{
		username
	})
}
function uploadAvatar(tempFilePaths) {
	return request.uploadFile(`/upload_avatar/`,tempFilePaths,'avatar')
}
function getPostList(uid,up,down,tag='') {
	return request.requestByGet(`/post_list/?uid=${uid}&up=${up}&down=${down}&tag=${tag}`,{});
}
function reSet(email,code,password) {
	return request.requestByPost(`/reset/`,{
		email,code,password
	})
}
function getNotice(){
	return request.tokenRequestByGet(`/message/`,{})
}
function sendComment(post_id,content) {
	return request.tokenRequestByPost(`/comment/`,{
		post_id,content
	})
}
function queryLike(post_id) {
	return request.tokenRequestByGet(`/like/?post_id=${post_id}`,{})
}

function like(post_id) {
	return request.tokenRequestByPost(`/like/`,{
		post_id
	})
}
function cancelLike(post_id) {
	return request.tokenRequestByDelete(`/like/`,{
		post_id
	})
}

function getNearby(longitude,latitude) {
	return request.requestByGet(`/nearby?longitude=${longitude}&latitude=${latitude}`,{})
}

function getAiChat(post_id) {
	return request.tokenRequestByGet(`/get_chat_response/?post_id=${post_id}`,{},10000)
}

function conclusion() {
	return request.tokenRequestByGet(`/AI_conclusion/`,{},60000)
}
function getTags() {
	return request.requestByGet('/get_tags/',{})
}
function generateTags(time,title,content,location) {
	return request.requestByGet(`/generate_tags/?time=${time}&title=${title}&content=${content}&location=${location}`,{})
}


export default {
	getVerification,
	register,
	getToken,
	refreshToken,
	getUserInfo,
	pushPostInfo,
	getPostInfo,
	deletePost,
	setUserInfo,
	uploadAvatar,
	getPostList,
	uploadPostImage,
	reSet,
	getNotice,
	sendComment,
	queryLike,
	like,
	cancelLike,
	getNearby,
	getAiChat,
	conclusion,
	getTags,
	generateTags
}