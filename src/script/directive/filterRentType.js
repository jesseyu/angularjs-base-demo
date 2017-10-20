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