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