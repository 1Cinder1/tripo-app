export function mymap(ak) {
	return new Promise(function(resolve, reject) {
		window.init = function() {
			resolve(mymap)
		}
		var script = document.createElement('script')
		script.type = 'text/javascript'
		script.src = `https://api.map.baidu.com/api?v=1.0&type=webgl&ak=${ak}&callback=init`
		script.onerror = reject
		document.head.appendChild(script)
	})
}
