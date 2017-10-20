'use strict';
var app = angular.module('webApp', ['ui.router', 'ngCookies', 'w5c.validator', 'ui.bootstrap','ui.grid','ui.grid.pinning','monospaced.qrcode']);
/** 
 * 接口地址配置信息 
 * */
app.constant('API_ENDPOINT', {
	host: 'http://192.168.1.24',
	port: 9999,
	// path: '',  
});


// 开启cros
// app.config(function($httpProvider) {
//   $httpProvider.defaults.withCredentials = true; 
// })
'use strict';
app.config(['$stateProvider', '$urlRouterProvider', 'w5cValidatorProvider', function($stateProvider, $urlRouterProvider, w5cValidatorProvider) {
	// 表单验证全局配置
	w5cValidatorProvider.config({
		blurTrig: true,
		showError: true,
		removeError: true
	});
	w5cValidatorProvider.setRules({
		email: {
			required: "输入的邮箱地址不能为空",
			email: "输入邮箱地址格式不正确"
		},
		username: {
			required: "输入的用户名不能为空",
			pattern: "用户名必须输入字母、数字、下划线,以字母开头",
			w5cuniquecheck: "输入用户名已经存在，请重新输入"
		},
		password: {
			required: "密码不能为空",
			minlength: "密码长度不能小于{minlength}",
			maxlength: "密码长度不能大于{maxlength}"
		},
		repeatPassword: {
			required: "重复密码不能为空",
			repeat: "两次密码输入不一致"
		},
		number: {
			required: "数字不能为空"
		},
		customizer: {
			customizer: "自定义验证数字必须大于上面的数字"
		},
		dynamicName: {
			required: "动态Name不能为空"
		},
		dynamic: {
			required: "动态元素不能为空"
		}
	});
	//路由配置
	$urlRouterProvider.otherwise('/index');
	$stateProvider
		.state('index', {
			url: '/index',
			templateUrl: 'views/home.html',
			controller: function($scope, $location) {
				$scope.say = "Hello angularjs";

			}
		})
		.state('httpService', {
			url: '/httpService',
			templateUrl: 'views/httpService.html',
			controller: function(HttpService, $scope, $location) {
				//点击按钮向服务器提取数据
				$scope.pullDataFun = function() {
					var data = HttpService.get("/data/test.json");
					data.then(function(response) {
						$scope.pullData = response.data;
						console.log(response.data)
					});
				}
			}
		})
		.state('table', {
			url: '/table',
			templateUrl: 'views/table.html',
			controller:'tableCtrl'
		})
		.state('form', {
			url: '/form',
			templateUrl: 'views/form.html',
			controller: 'form'
		})
		.state('echarts', {
			url: '/echarts',
			templateUrl: 'views/echarts.html',
			controller: 'echarts'
		})
		.state('rentInfo', {
			url: '/rentInfo',
			templateUrl: 'views/rentInfo.html',
			controller: 'rentInfoCtrl'
		})
		.state('rentIndex', {
			url: '/rentIndex',
			templateUrl: 'views/rentIndex.html',
			controller: 'rentIndexCtrl'
		})
		.state('rentOrder', {
			url: '/rentOrder',
			templateUrl: 'views/rentOrder.html',
			controller: 'rentOrderCtrl'
		})
		.state('select',{
			url:'/select',
			templateUrl:'views/select.html',
			controller: 'selectCtrl'
		})
		.state('model',{
			url:'/model',
			templateUrl:'views/model.html'
		})
}])
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

app.controller('form', function($scope) {
	var vm = $scope.vm = {
		showErrorType: "1",
		entity: {}
	};

	vm.saveEntity = function($event) {
		alert("Save Successfully!!!");
	};

	vm.errorCallback = function($errors, invalidElements) {
		debugger;
	};

	vm.customizer = function() {
		return vm.entity.customizer > vm.entity.number;
	};
	vm.types = [{
		value: 1,
		text: "选择框"
	}, {
		value: 2,
		text: "输入框"
	}];

	vm.processForm = function() {
		// console.log($scope.formData);
		console.log(vm.entity);
	}

})

app.controller('modelCtrl',function($scope,$uibModal){
	var vm = $scope.vm = {};
	vm.openModel = function(size){
		var modalInstance = $uibModal.open({
	         templateUrl: 'myModalContent.html',
	         controller: 'ModalInstanceCtrl',
	         backdrop:"static",
	         size: size,
	         resolve: {
	             items1: function () {
	                 return $scope.items;
	             }
	         }
        });
	}

})


app.controller('ModalInstanceCtrl', function ($scope, $uibModalInstance) {
    $scope.ok = function () {
        // $uibModalInstance.close($scope.selected.item);
        console.log("舒服哦");
     };

     $scope.cancel = function () {
         $uibModalInstance.dismiss("cancel");
     };
});
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
app.controller('tableCtrl',function($scope,$http){

  $scope.gridOptions = {};

  $scope.gridOptions.columnDefs = [
    { name:'id', width:50, enablePinning:false },
    { name:'name', width:100, pinnedLeft:true },
    { name:'age', width:100, pinnedRight:true  },
    { name:'address.street', width:150  },
    { name:'address.city', width:150 },
    { name:'address.state', width:50 },
    { name:'address.zip', width:50 },
    { name:'company', width:100 },
    { name:'email', width:100 },
    { name:'phone', width:200 },
    { name:'about', width:300 },
    { name:'friends[0].name', displayName:'1st friend', width:150 },
    { name:'friends[1].name', displayName:'2nd friend', width:150 },
    { name:'friends[2].name', displayName:'3rd friend', width:150 },
  ];

  var data = [
  	{
  		"id":1,
  		"name":"yuhao",
  		"age":20,
  		"address.street":'avbcc',
  		"address.city":'addd',
  		"address.state":'343',
  		"address.zip":'123',
  		"company":'123',
  		"email":'45646',
  		"phone":'234234',
		"about":'23423442323sadasf',
		"friends[0].name":'123123',
		"friends[1].name":'ertyert',
		"friends[2].name":'234234'  		
  	},{
  		"id":1,
  		"name":"yuhao",
  		"age":20,
  		"address.street":'avbcc',
  		"address.city":'addd',
  		"address.state":'343',
  		"address.zip":'123',
  		"company":'123',
  		"email":'45646',
  		"phone":'234234',
		"about":'23423442323sadasf',
		"friends[0].name":'123123',
		"friends[1].name":'ertyert',
		"friends[2].name":'234234'  		
  	},{
  		"id":1,
  		"name":"yuhao",
  		"age":20,
  		"address.street":'avbcc',
  		"address.city":'addd',
  		"address.state":'343',
  		"address.zip":'123',
  		"company":'123',
  		"email":'45646',
  		"phone":'234234',
		"about":'23423442323sadasf',
		"friends[0].name":'123123',
		"friends[1].name":'ertyert',
		"friends[2].name":'234234'  		
  	},{
  		"id":1,
  		"name":"yuhao",
  		"age":20,
  		"address.street":'avbcc',
  		"address.city":'addd',
  		"address.state":'343',
  		"address.zip":'123',
  		"company":'123',
  		"email":'45646',
  		"phone":'234234',
		"about":'23423442323sadasf',
		"friends[0].name":'123123',
		"friends[1].name":'ertyert',
		"friends[2].name":'234234'  		
  	},{
  		"id":1,
  		"name":"yuhao",
  		"age":20,
  		"address.street":'avbcc',
  		"address.city":'addd',
  		"address.state":'343',
  		"address.zip":'123',
  		"company":'123',
  		"email":'45646',
  		"phone":'234234',
		"about":'23423442323sadasf',
		"friends[0].name":'123123',
		"friends[1].name":'ertyert',
		"friends[2].name":'234234'  		
  	},{
  		"id":1,
  		"name":"yuhao",
  		"age":20,
  		"address.street":'avbcc',
  		"address.city":'addd',
  		"address.state":'343',
  		"address.zip":'123',
  		"company":'123',
  		"email":'45646',
  		"phone":'234234',
		"about":'23423442323sadasf',
		"friends[0].name":'123123',
		"friends[1].name":'ertyert',
		"friends[2].name":'234234'  		
  	},{
  		"id":1,
  		"name":"yuhao",
  		"age":20,
  		"address.street":'avbcc',
  		"address.city":'addd',
  		"address.state":'343',
  		"address.zip":'123',
  		"company":'123',
  		"email":'45646',
  		"phone":'234234',
		"about":'23423442323sadasf',
		"friends[0].name":'123123',
		"friends[1].name":'ertyert',
		"friends[2].name":'234234'  		
  	},{
  		"id":1,
  		"name":"yuhao",
  		"age":20,
  		"address.street":'avbcc',
  		"address.city":'addd',
  		"address.state":'343',
  		"address.zip":'123',
  		"company":'123',
  		"email":'45646',
  		"phone":'234234',
		"about":'23423442323sadasf',
		"friends[0].name":'123123',
		"friends[1].name":'ertyert',
		"friends[2].name":'234234'  		
  	},{
  		"id":1,
  		"name":"yuhao",
  		"age":20,
  		"address.street":'avbcc',
  		"address.city":'addd',
  		"address.state":'343',
  		"address.zip":'123',
  		"company":'123',
  		"email":'45646',
  		"phone":'234234',
		"about":'23423442323sadasf',
		"friends[0].name":'123123',
		"friends[1].name":'ertyert',
		"friends[2].name":'234234'  		
  	},{
  		"id":1,
  		"name":"yuhao",
  		"age":20,
  		"address.street":'avbcc',
  		"address.city":'addd',
  		"address.state":'343',
  		"address.zip":'123',
  		"company":'123',
  		"email":'45646',
  		"phone":'234234',
		"about":'23423442323sadasf',
		"friends[0].name":'123123',
		"friends[1].name":'ertyert',
		"friends[2].name":'234234'  		
  	},{
  		"id":1,
  		"name":"yuhao",
  		"age":20,
  		"address.street":'avbcc',
  		"address.city":'addd',
  		"address.state":'343',
  		"address.zip":'123',
  		"company":'123',
  		"email":'45646',
  		"phone":'234234',
		"about":'23423442323sadasf',
		"friends[0].name":'123123',
		"friends[1].name":'ertyert',
		"friends[2].name":'234234'  		
  	},{
  		"id":1,
  		"name":"yuhao",
  		"age":20,
  		"address.street":'avbcc',
  		"address.city":'addd',
  		"address.state":'343',
  		"address.zip":'123',
  		"company":'123',
  		"email":'45646',
  		"phone":'234234',
		"about":'23423442323sadasf',
		"friends[0].name":'123123',
		"friends[1].name":'ertyert',
		"friends[2].name":'234234'  		
  	},{
  		"id":1,
  		"name":"yuhao",
  		"age":20,
  		"address.street":'avbcc',
  		"address.city":'addd',
  		"address.state":'343',
  		"address.zip":'123',
  		"company":'123',
  		"email":'45646',
  		"phone":'234234',
		"about":'23423442323sadasf',
		"friends[0].name":'123123',
		"friends[1].name":'ertyert',
		"friends[2].name":'234234'  		
  	},{
  		"id":1,
  		"name":"yuhao",
  		"age":20,
  		"address.street":'avbcc',
  		"address.city":'addd',
  		"address.state":'343',
  		"address.zip":'123',
  		"company":'123',
  		"email":'45646',
  		"phone":'234234',
		"about":'23423442323sadasf',
		"friends[0].name":'123123',
		"friends[1].name":'ertyert',
		"friends[2].name":'234234'  		
  	}
  ]

  $scope.gridOptions.data = data;
 

})
//柱状图
app.directive('barCharts', function() {
	return {
		restrict: 'AE',
		scope: {
			source: '='
		},
		template: '<div>柱状图</div>',
		controller: function($scope) {

		},
		link: function(scope, element, attr) {
			console.log(scope.source);
			var chart = element.find('div')[0];
			var parent = element['context'];
			// console.log(parent.clientHeight+":"+parent.clientWidth);
			// chart.style.width = parent.clientWidth+'px';
			// chart.style.height = parent.clientWeight+'px';
			chart.style.width = '400px';
			chart.style.height = '400px';

			var myChart = echarts.init(chart);
			var option = {
				title: {
					text: '工作空间使用情况'
				},
				tooltip: {
					trigger: 'axis',
					axisPointer: {
						type: 'shadow'
					}
				},
				legend: {
					//data:['正常','警告','预警','剩余']
				},
				gird: {
					left: '5%',
					right: '5%',
					bottom: '5%',
					containLabel: true
				},
				xAxis: {
					type: 'value'
				},
				yAxis: {
					type: 'category',
					data: scope.source //['测试栏目1','测试栏目2','测试栏目3','测试栏目4','测试栏目5','测试栏目6']
				},
				series: [{
					name: '已使用',
					type: 'bar',
					stack: '存储空间',
					label: {
						normal: {
							show: true,
							position: 'insideRight'
						}
					},
					barwidth: '80%',
					data: [100, 200, 300, 260, 50, 120]
				}, {
					name: '剩余',
					type: 'bar',
					stack: '存储空间',
					label: {
						normal: {
							show: true,
							position: 'insideRight'
						}
					},
					barwidth: '80%',
					data: [200, 100, 2, 80, 200, 180]
				}]
			};
			myChart.setOption(option);
			myChart.resize();
		}
	};
})
//饼图
app.directive('pieCharts', function() {
	return {
		restrict: 'AE',
		scope: {
			source: '='
		},
		template: '<div>这是饼图</div>',
		controller: function($scope) {},
		link: function(scope, element, attr) {
			var chart = element.find('div')[0];
			var parent = element['context'];
			//console.log(parent.clientHeight+":"+parent.clientWidth);
			// chart.style.width =parent.clientWidth+'px';
			// chart.style.height =parent.clientHeight+'px';
			chart.style.width = '300px';
			chart.style.height = '300px';

			var myChart = echarts.init(chart);
			var option = {
				backgroudColor: '#F2F2F2',
				title: {
					text: '某一个栏目',
					x: 'center',
					y: 'bottom'
				},
				tooltip: {
					trigger: 'item',
					formatter: '{a}<br/>{b} {c}({d}%)'
				},
				series: [{
					name: '空间使用',
					type: 'pie',
					radius: '55%',
					center: ['50%', '60%'],
					data: [{
						value: 50,
						name: '已使用'
					}, {
						value: 450,
						name: '未使用'
					}],
					itemStyle: {
						emphasis: {
							shadowBlur: 10,
							shadowOffsetX: 0,
							shadowColor: 'rgba(0, 0, 0, 0.5)'
						}
					}
				}]
			};
			myChart.setOption(option);
			myChart.resize();
		}
	};
});
/*
 * 作用:筛选租凭信息类型
 * 使用:expression | fiterRentType
 */
app.filter('fiterRentType', ['$sce', function($sce) {
	return function(input) {
		if (input == "0") {
			return "已延期";
		} else if (input == "1") {
			return "即将到期";
		} else if (input == "2") {
			return "正常使用";
		} else if (input == "3") {
			return "已到期";
		}
	}
}]);
/*
 * 作用:租用信息滑动数据加载组建
 * 使用: <slide-follow  datasetData="soucreData" howToLoad="fun()"></slide-follow>
 */
app.directive("slideFollow", function($timeout,$interval) {
	return {
		restrict: 'E',
		replace: true,
		scope: {
			datasetdata: "=",
			howtoload:'&'
		},
		templateUrl:"slidefollow.html",
		link: function(scope, elem, attrs) {
			var sh;
			$timeout(function() {
				var i = 0;
				var className = $("." + $(elem).parent()[0].className); //获取列表元素
				var children = className.children("li");
				var liLength = children.length; //获取列表数量
				var liHeight = children.height(); //获取列表高度
				className.html(className.html() + className.html());
				// 开启定时器
				sh = $interval(slide,2000)
				function slide() {
					if (parseInt(className.css("margin-top")) > (-liLength * liHeight)) {
						i++;
						className.animate({
							marginTop:-liHeight * i + "px"
						}, "slow");
					} else {
						i = 0;
						scope.howtoload();
						className.css("margin-top", "0px");
					}
				}
				// 鼠标滑过清除定时器
				className.hover(function() {
					$interval.cancel(sh);
				}, function() {
					$interval.cancel(sh);
					sh = $interval(slide,2000)
				}) 
			}, 1000)
			elem.parent().on('$destroy', function() {
		         $interval.cancel(sh);
		    });
		}
	}
})
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