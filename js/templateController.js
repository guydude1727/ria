function templateController($scope) {
	$scope.templates = 
		[ { name: 'diary.html', url: 'templates/diary.html'}
		, { name: 'detail.html', url: 'templates/detail.html'}
		, { name: 'add.html', url: 'templates/add.html'}
		, { name: 'nutrition.html', url: 'templates/nutrition.html'}
		, { name: 'recent.html', url: 'templates/recent.html'}
		, { name: 'scan.html', url: 'templates/scan.html'} ];
	$scope.template = $scope.templates[0];
}