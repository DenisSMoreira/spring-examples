'use strict';
angular.module('alerts').controller('AlertsController', function ($scope, $http, $ionicPopup, $location, $ionicLoading, AlertsService, $ionicSideMenuDelegate) {

    $scope.showLoading = function () {
        $ionicLoading.show({
            template: '<ion-spinner icon="lines"></ion-spinner>'
        });
    };

    $scope.hideLoading = function () {
        $ionicLoading.hide();
    };
})
