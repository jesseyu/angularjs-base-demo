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
