app.controller('rentInfoCtrl', function($scope, HttpService) {
	$scope.currentPage = 1; //当前默认选择页面
	$scope.itemsperpage = 5; //每页显示多少条
	$scope.maxSize = 5; //大于x条显示...
	var data = {
		"page": 1,
		"rows": 10
	}
	$scope.queryList = function(data) {
		var queryListData = HttpService.get("/data/rentinfo.json", data);
		queryListData.then(function(response) {
			$scope.rentInfoList = response.data.data;
			$scope.totalItems = response.data.total;  //传递数据总数
		});
	}
	//点击页码
	$scope.pageChanged = function() {
		data.page = $scope.currentPage
		$scope.queryList(data);
	}
	$scope.queryList(data);

})
