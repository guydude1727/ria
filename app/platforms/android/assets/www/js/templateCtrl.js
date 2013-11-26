/*
 *  RIA Group Project: Nutrition Goals App
 *  
 *  Authors: Nathan Robinson, Matt 'Big Lew' Lewis, Stephen Brough
 *  Version: 0.0.1  
 *  Date: November 16, 2013
 *  Summary: The main app module with app configurations.
 *
 */
 
 
var templateCtrl = angular.module('templateCtrl', []);
 
templateCtrl.controller('DiaryCtrl', function($scope) {
  $scope.helloWorld="This is coming from the Diary controller";
});

templateCtrl.controller('Details', function($scope) {
  $scope.helloWorld="This is coming from the Details controller";
});

templateCtrl.controller('AddCtrl', function($scope) {
  $scope.hello = "This is coming from the Add controller";
});

templateCtrl.controller('NutritionCtrl', function($scope) {
  $scope.helloWorld="This is coming from the Nutrition controller";
});

templateCtrl.controller('RecentCtrl', function($scope) {
  $scope.helloWorld="This is coming from the Recent controller";
});

templateCtrl.controller('ScanCtrl', function($scope) {
  $scope.hello = "This is coming from the Scan controller";
  $scope.onBodyLoad = function() {
            document.addEventListener("deviceready", onDeviceReady, false);
          };

  $scope.success = function (resultArray) {
            alert("Scanned " + resultArray[0] + " code: " + resultArray[1]);              
          };

          $scope.failure = function(error) {
            alert("Failed: " + error);
          };

          $scope.scan = function() {
            // See below for all available options. 
            cordova.exec($scope.success, $scope.failure, "ScanditSDK", "scan",
              ["RfjeBlP5EeOcWPW7nuxYd/Dxk/0mrz+1Sbf9LBpCkxk",
                {"beep": true,
                "1DScanning" : true,
                "2DScanning" : true
                }
              ]
            );
                
          }; 
});

templateCtrl.controller('SettingsCtrl', function($scope) {
  $scope.hello = "This is coming from the Settings controller";
});