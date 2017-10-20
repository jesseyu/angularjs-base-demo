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