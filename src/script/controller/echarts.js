app.controller('echarts', function($scope) {
	var vm = $scope.vm = {};
	vm.groupData = ['测试栏目1', '测试栏目2', '测试栏目3', '测试栏目4', '测试栏目5', '测试栏目6'];
	vm.chart = 0;
	vm.show = true;
	vm.myCharts = {
		"柱状图": 0,
		"饼图": 1
	};
	vm.showChange = function(chart) {
		if (chart == 0) {
			vm.show = true;
		} else {
			vm.show = false;
		}
	};
	console.log(vm);
})
