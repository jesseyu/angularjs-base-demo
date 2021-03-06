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