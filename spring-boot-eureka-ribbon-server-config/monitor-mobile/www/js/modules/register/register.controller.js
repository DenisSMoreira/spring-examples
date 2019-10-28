/* global Camera, CameraPopoverOptions */

'use strict';
angular.module('register').controller('RegisterController', function ($scope, $http, $ionicPopup, $state, $ionicLoading, RegisterService, $cordovaCamera) {
    $scope.data = {};
    $scope.data.picture = '';

    $scope.data.profile = [
        {'name': 'Vendedor',
            'value': '1'},
        {'name': 'Gerente',
            'value': '2'},
        {'name': 'Administrador',
            'value': '3'}
    ];
    $scope.data.profile = $scope.data.profile[0].value;

    $scope.showLoading = function () {
        $ionicLoading.show({
            template: '<ion-spinner icon="lines"></ion-spinner>'
        });
    };

    $scope.hideLoading = function () {
        $ionicLoading.hide();
    };

    $scope.register = function () {
        if ($scope.data.name === undefined ||
                $scope.data.name === "" ||
                $scope.data.lastname === undefined || $scope.data.email === undefined ||
                $scope.data.lastname === "" || $scope.data.email === "" ||
                $scope.data.password === undefined || $scope.data.profile === undefined ||
                $scope.data.password === "" || $scope.data.profile === "") {
          
            $ionicPopup.alert({
                title: 'Aviso',
                template: 'Preencha todos os campos para se registrar !'
            });
            return;
        }

        if ($scope.data.passwordConfirmation !== $scope.data.password) {
            $ionicPopup.alert({
                title: 'Aviso',
                template: 'Passwords não conferem !'
            });
            return;
        }

        $scope.showLoading();
        RegisterService.register($scope.data, $scope.user).then(function () {
            $scope.hideLoading();
            $ionicPopup.alert({
                title: 'Sucesso',
                template: 'Registrado com sucesso, verifique seu email !'
            });
            $state.go('login');

        }).catch(function () {
            $scope.hideLoading();
            if (RegisterService.errors.code === 11000) {
                $ionicPopup.alert({
                    title: 'Aviso',
                    template: 'E-mail informado já se encontra em uso!'
                });
            } else {
                $ionicPopup.alert({
                    title: 'Error',
                    template: 'Erro interno no servidor'
                });
            }
        });
    };

    $scope.requestPasswordReset = function () {
        $scope.showLoading();
        RegisterService.password_reset($scope.data).then(function () {
            $scope.hideLoading();
            $state.go('login');
        }).catch(function () {
            $scope.hideLoading();
            $state.go('login');
        });
    };

    $scope.updatePassword = function () {
        if ($scope.data.password === null || $scope.data.passwordConfirmation === null) {
            $ionicPopup.alert({
                title: 'Aviso',
                template: 'Preencha senha e confirmar senha !'
            });
            return;
        }
        RegisterService.updatePassword($scope.data).then(function () {
            console.log(RegisterService.data);
            if (RegisterService.data.status === 200) {
                $ionicPopup.alert({
                    title: 'Aviso',
                    template: "Senha atualizada com sucesso."
                });
            }
            $scope.hideLoading();
        }).catch(function () {
            $scope.hideLoading();
        });
    };

    $scope.takePhoto = function () {
        var options = {
            quality: 75,
            destinationType: Camera.DestinationType.DATA_URL,
            sourceType: Camera.PictureSourceType.CAMERA,
            allowEdit: true,
            encodingType: Camera.EncodingType.JPEG,
            targetWidth: 300,
            targetHeight: 300,
            correctOrientation: true,
            popoverOptions: CameraPopoverOptions,
            saveToPhotoAlbum: false
        };

        $cordovaCamera.getPicture(options).then(function (imageData) {
            $scope.data.picture = "data:image/jpeg;base64," + imageData;
        }, function (err) {
            // An error occured. Show a message to the user
        });
    };

    $scope.choosePhoto = function () {
        var options = {
            quality: 75,
            destinationType: Camera.DestinationType.DATA_URL,
            sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
            allowEdit: true,
            encodingType: Camera.EncodingType.JPEG,
            targetWidth: 300,
            targetHeight: 300,
            popoverOptions: CameraPopoverOptions,
            saveToPhotoAlbum: false
        };

        $cordovaCamera.getPicture(options).then(function (imageData) {
            $scope.data.picture = "data:image/jpeg;base64," + imageData;
        }, function (err) {
            // An error occured. Show a message to the user
        });
    };

    $scope.login = function () {
        $state.go('login');
    };

    $scope.hideMsg = function () {
        $scope.showMsg = false;
    };

});
