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