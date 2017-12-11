app.controller('selectCtrl',function($scope,HttpService){
	var vm = $scope.vm = {};
	//获取城市数据
	var queryListData = HttpService.get("/data/country.json");
		queryListData.then(function(response) {
			console.log(response);
			vm.countries = response.data;
		});
	// 更换国家的时候清空省
	$scope.$watch('vm.country', function(country) {
	    vm.province = null;
	});
	// 更换省的时候清空城市
	$scope.$watch('vm.province', function(province) {
	   vm.city = null;
	});	
})