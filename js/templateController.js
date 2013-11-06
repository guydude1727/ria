function templateController($scope) {
	$scope.templates = 
		[ { name: 'diary.html', url: 'templates/diary.html'}
		, { name: 'detail.html', url: 'templates/detail.html'}
		, { name: 'add.html', url: 'templates/add.html'}
		, { name: 'nutrition.html', url: 'templates/nutrition.html'}
		, { name: 'recent.html', url: 'templates/recent.html'}
		, { name: 'scan.html', url: 'templates/scan.html'}
		, { name: 'settings.html', url: 'templates/settings.html'}];
	$scope.template = $scope.templates[0];
}


function searchContext($scope, $resource) {
	var dbResource = $resource('127.0.0.1:5984/ria_group/_all_docs',
	{nutrition: {method:'GET'}});	
}