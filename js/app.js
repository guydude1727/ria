/*
 *  RIA Group Project: Nutrition Goals App
 *  
 *  Authors: Nathan Robinson, Matt 'Big Lew' Lewis, Stephen Brough
 *  Version: 0.0.1  
 *  Date: November 16, 2013
 *  Summary: The main app module with app configurations.
 *
 */

// Create main app module
var app = angular.module('healthApp', ['ngRoute', 'templateController']);

app.config(['$routeProvider', 
  function($routeProvider){
    $routeProvider.
      when('/diary', {
        templateUrl: 'templates/diary.html',
        controller: 'DiaryCtrl'
      }).
      when('/detail',{
        templateUrl: 'templates/detail.html',
        controller: 'DetailCtrl'
      }).
      when('/add', {
        templateUrl: 'templates/add.html',
        controller: 'AddCtrl'
      }).
      when('/nutrition', {
        templateUrl: 'templates/nutrition.html',
        controller: 'NutritionCtrl'
      }).
      when('/recent', {
        templateUrl: 'templates/recent.html',
        controller: 'RecentCtrl'
      }).
      when('/scan',{
        templateUrl: 'templates/scan.html',
        controller: 'ScanCtrl'
      }).
      when('/settings',{
        templateUrl: 'templates/settings.html',
        controller: 'SettingsCtrl'
      }).
      otherwise({ recirectTo: '/diary'});
  }]);
// --------------------------------------------------------------------------//