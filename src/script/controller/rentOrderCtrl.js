app.controller('rentOrderCtrl',function($scope,HttpService,$http,$timeout){
	//自动补全数据
	$scope.states = [
		{
			"productName":"联想电脑",
			"unit":"元/张",
			"day":30
		},
		{
			"productName":"hp电脑",
			"unit":"元/张",
			"day":10
		},
		{
			"productName":"asus电脑",
			"unit":"元/张",
			"day":50
		},
		{
			"productName":"abs刹车",
			"unit":"元/张",
			"day":50
		},
		{
			"productName":"ibm",
			"unit":"元/张",
			"day":12
		},
		{
			"productName":"bmw宝马",
			"unit":"元/量",
			"day":12
		},
		{
			"productName":"保时捷",
			"unit":"元/量",
			"day":12
		}
	]
	//产品列表数据
	$scope.productlist = [];
	//添加产品名
	$scope.onSelect = function(item, model, label, event,index){
		$scope.productlist[index].productName = item.productName;
		$scope.productlist[index].unit = item.unit;
		$scope.productlist[index].day = item.day;
		$scope.productlist[index].proNameShowing = false;
	}
	//添加租用数量
	$scope.changeCount = function(val,index){
		$timeout(function(){
			$scope.productlist[index].countShowing = false;
		},2000)
	}

	//更新列表数据
	// $scope.change = function(index){
	// 	$scope.productlist[index].showing = true;
	// 	console.log("更改列表");
	// 	console.log($scope.productlist[index].showing);
	// }

	//总记录
	var vm = $scope.vm = {
		"orderBaseInfo":{},
		"order":{
			"totalPrices":"12",
			"actualPayment":"12",
			"productlist":$scope.productlist,
			"discount":0,
			"cashpLedge":0
		}
	}

	//添加产品
	$scope.addProduct = function(){
		$scope.productlist.push(
			{
				productName:$scope.productName,
				unit:$scope.unit,
				day:$scope.day,
				count:$scope.count,
				proNameShowing:true,
				countShowing:true
			}
		);
	}
	//应付账总额 
	$scope.totalPrice = function () {
        var total = 0;

		var dayNumber = $scope.days();

        angular.forEach($scope.productlist, function (item) {
        	if(item.count == undefined){
        		return;
        	}
            total += item.day * item.count * dayNumber;
        })
        return total;
    }
    //获取天数
    $scope.days = function(){
    	var zydays;
    	if(vm.orderBaseInfo.zpStartTime == undefined || vm.orderBaseInfo.zpEndTime == undefined){
    		zydays = 0;
    	}else{
    		var startDate = new Date(vm.orderBaseInfo.zpStartTime);
			var endDate = new Date(vm.orderBaseInfo.zpEndTime);
			var fullStartDate = startDate.getFullYear() + '-' + (startDate.getMonth() + 1) + '-' + startDate.getDate();
			var fullEndDate = endDate.getFullYear() + '-' + (endDate.getMonth() + 1) + '-' + endDate.getDate();
			zydays = parseInt(Math.abs(new Date(fullStartDate) - new Date(fullEndDate)) / 1000 / 60 / 60 / 24);
    	}
    	return zydays;
    }
    //删除天数
    $scope.del = function(index){
    	$scope.productlist.splice(index,1);
    	console.log($scope.productlist);
    }
	//打印预览
	$scope.print = function(){
		$("#print").printArea();
	}
	//保存订单
	$scope.save = function(){
		alert(vm)
		console.info(vm);
	}

	//获取该订单二维码
	var queryListData = HttpService.get("/data/rentOrderJson.json");
		queryListData.then(function(response) {
			$scope.rentOrder = response.data;
		});


})





  
 
 
 
 
 
