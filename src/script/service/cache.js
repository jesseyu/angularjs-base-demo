/** 
 * cookies操作 
 * 功能：浏览器端cookies 操作
 * */
app.service('cache', function($cookies) {
	this.put = function(key, value) {
		$cookies.put(key, value);
	};
	this.get = function(key) {
		return $cookies.get(key);
	}
	this.remove = function(key) {
		$cookies.remove(key);
	}
})