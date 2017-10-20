/** 
 * 定义http服务 
 * 功能：专门向服务器发送post 和 get请求 
 * */
app.factory('HttpService', function($window, $http, API_ENDPOINT, $q, $log) {
    var _api = API_ENDPOINT;
    var endpoint = _api.host + ':' + _api.port;
    return {
        //发送服务器的域名+端口，例如 http://xx.xx.com:80  
        endpoint: endpoint,
        //post请求，第一个参数是URL，第二个参数是向服务器发送的参数（JSON对象），  
        post: function(url, data) {
            url = endpoint + url;
            var deferred = $q.defer();
            var tempPromise;
            //显示加载进度  
            // console.log("正在加载...");
            //判断用户是否传递了参数，如果有参数需要传递参数  
            tempPromise = $http({
                method: 'post',
                url: url,
                transformRequest: function() {
                    if (data) {
                        return $.param(data);
                    }
                    return '';
                },
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            })
            tempPromise.then(function(data, header, config, status) {
                deferred.resolve(data);
                // console.log(data);
            }, function(data, header, config, status) {
                // deferred.reject(msg);  
                // console.log(data);
            })
            return deferred.promise;
        },
        //get请求，第一个参数是URL，第二个参数是向服务器发送的参数（JSON对象），  
        get: function(url, data) {
            url = endpoint + url;
            var deferred = $q.defer();
            //显示加载进度  
            // console.log("正在加载...");
            $http({
                method: 'GET',
                url: url,
                params: data
            }).then(function(data, header, config, status) {
                deferred.resolve(data);
                // console.log("加载成功...");
            }, function(data, header, config, status) {
                // deferred.reject("请求失败");
                console.log("请求失败...");
            })
            return deferred.promise;
        }
    };
});