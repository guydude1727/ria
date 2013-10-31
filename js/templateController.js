function templateController($scope)
	$scope.templates = 
		[ { name: 'diary.html', url: 'diary.html'}
		, { name: 'detail.html', url: 'detail.html'} ];
	$scope.template = $scope.templates[0];