app.controller('rentIndexCtrl', function($scope, HttpService,$interval) {

	var data = {
		Page: 1,
		roWs: 10
	}
	//租用信息
	$scope.pullRentdata = function(){
		HttpService.get("/data/rentlist.json", data)
			.then(function(response) {
				$scope.rentList = response.data;
				$scope.rentdata = response.data.orderList;
				// console.log($scope.rentdata)
			});
	}
	// //出售信息
	$scope.pullSellData = function(){
		HttpService.get("/data/selllist.json", data)
		.then(function(response) {
			$scope.sellList = response.data;
			$scope.sellData = response.data.orderList;
			// console.log($scope.sellData);
		});
	}
	//请求类型统计数据
	HttpService.get("/data/typeDataList.json")
		.then(function(response) {
			$scope.typelist = response.data;
			// console.log(response.data);
		});
	
	$scope.pullRentdata();
	$scope.pullSellData();
})



