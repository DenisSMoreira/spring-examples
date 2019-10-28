'use strict';
angular.module('login').controller('LoginController', function ($scope, $http, $ionicPopup, $location, $ionicLoading, LoginService, $ionicSideMenuDelegate, $state) {
    $scope.data = {};

    $ionicSideMenuDelegate.canDragContent(false);

    $scope.showLoading = function () {
        $ionicLoading.show({
            template: '<ion-spinner icon="lines"></ion-spinner>'
        });
    };

    $scope.hideLoading = function () {
        $ionicLoading.hide();
    };

    $scope.reset_password = function () {
        $state.go('password_reset');
    };

    $scope.login = function () {
        $scope.showLoading();
        LoginService.authentication($scope.data).then(function () {
            $scope.hideLoading();
            $ionicSideMenuDelegate.canDragContent(true);
            var go_principal = localStorage.getItem( 'welcome' );

            if(go_principal === true){
              $state.go('page.principal');
            }else{
              $state.go('page.welcome');
            }
            
        }).catch(function () {
            $ionicSideMenuDelegate.canDragContent(false);
            $scope.hideLoading();
            $ionicPopup.alert({
                title: 'Erro',
                template: "Falha na autenticação!"
           });
        });
    };

    $scope.register = function () {
        $location.path('register');
    };

});
