/* global PROFILE_TYPE_MANAGER, PROFILE_TYPE_SELLER, PROFILE_TYPE_ADMIN */

'use strict';
angular.module('teams').controller('TeamEditController', function ($scope, $http, $ionicPopup, $state, $ionicLoading, TeamEditService, $ionicPopover, $q, $filter) {

    $scope.team = {};
    $scope.users = TeamEditService.getUsers();
    $scope.tagGerentes = [];
    $scope.tagVendedores = [];
    $scope.team.listUsers = [];
    $scope.action = TeamEditService.getAction();
    var managers = new Array();
    var sellers = new Array();
    $scope.user_remover = {};

    $scope.findUser = function (user_id) {
        var user = {};
        angular.forEach($scope.users, function (value, key) {
            if (value.id === user_id) {
                user = value;
            }
        });
        return user;
    };

    if ($scope.action === 'show' || $scope.action === 'edit') {
        $scope.tagGerentes = [];
        $scope.tagVendedores = [];
        $scope.team = TeamEditService.getTeamSelected();
        angular.forEach($scope.team.listUsers, function (value, key) {
            if (value.profile === PROFILE_TYPE_MANAGER) {
                value.name = value.name + " " + value.lastname;
                $scope.tagGerentes.push(value);
            }
            if (value.profile === PROFILE_TYPE_SELLER) {
                value.name = value.name + " " + value.lastname;
                $scope.tagVendedores.push(value);
            }
        });
    }

    $scope.loadGerentes = function (query) {
        return $filter('filter')(managers, {name: query});
    };

    $scope.init = function () {
        var filtrados = $scope.users;
        angular.forEach(filtrados, function (value, key) {
            if (value.profile === PROFILE_TYPE_MANAGER || value.profile === PROFILE_TYPE_ADMIN) {
                managers.push(value);
            }
        });

        angular.forEach($scope.users, function (value, key) {
            if (value.profile === PROFILE_TYPE_SELLER) {
                sellers.push(value);
            }
        });
    };

    $scope.loadVendedores = function (query) {
        return $filter('filter')(sellers, {name: query});
    };

    var template = "<ion-popover-view class='popup_team'>"
            + "<a class='item item-icon-left' ng-click='team_edit()'><i class='icon ion-ios-compose-outline'></i>Editar equipe</a>"
            + "<a class='item item-icon-left' ng-click='delete()'><i class='icon ion-ios-trash-outline'></i>Deletar equipe</a>"
            + "</ion-popover-view>";

    var template_remover = "<ion-popover-view class='popup_team_remover'>"
            + "<a class='item item-icon-left' ng-click='team_user_remove()'><i class='icon ion-ios-trash-outline'></i>Remover da equipe</a>"
            + "</ion-popover-view>";

    $scope.popover = $ionicPopover.fromTemplate(template, {
        scope: $scope
    });

    $scope.openPopover = function ($event, item) {
        $scope.popover.show($event);
    };

    $scope.closePopover = function () {
        $scope.popover.hide();
    };

    // Perform Action on destroy
    $scope.$on('$destroy', function () {
        $scope.popover.remove();
    });
    // Perform action on hide popover
    $scope.$on('popover.hidden', function () {
        // Perform action
    });
    // Perform action on remove popover
    $scope.$on('popover.removed', function () {
        // Perform action
    });

    $scope.popover_remover = $ionicPopover.fromTemplate(template_remover, {
        scope: $scope
    });

    $scope.openPopover_remover = function ($event, item) {
        $scope.popover_remover.show($event);
        $scope.user_remover = item;
    };

    $scope.closePopover_remover = function () {
        $scope.popover.hide();
    };

    // Perform Action on destroy
    $scope.$on('$destroy', function () {
        $scope.popover_remover.remove();
    });
    // Perform action on hide popover
    $scope.$on('popover_remover.hidden', function () {
        // Perform action
    });
    // Perform action on remove popover
    $scope.$on('popover_remover.removed', function () {
        // Perform action
    });

    $scope.showLoading = function () {
        $ionicLoading.show({
            template: '<ion-spinner icon="lines"></ion-spinner>'
        });
    };

    $scope.hideLoading = function () {
        $ionicLoading.hide();
    };

    $scope.descartar = function () {
        $state.go('page.teamsList');
    };

    $scope.create = function () {
        angular.forEach($scope.tagGerentes, function (value, key) {
            $scope.team.listUsers.push(value);
        });
        angular.forEach($scope.tagVendedores, function (value, key) {
            $scope.team.listUsers.push(value);
        });
        if ($scope.team.name === null) {
            $ionicPopup.alert({
                title: 'Erro',
                template: 'Escolha um título para a equipe e ao menos um integrante !'
            });
            return;
        }
        $scope.showLoading();
        TeamEditService.create($scope.user.id, $scope.team).then(function () {
            if (TeamEditService.status === 200) {
                $ionicPopup.alert({
                    title: 'Sucesso',
                    template: 'Equipe criada !'
                });
            } else {
                $ionicPopup.alert({
                    title: 'Erro',
                    template: 'Erro ao criar a equipe, tente novamente mais tarde !'
                });
            }
            $scope.hideLoading();
            $state.go("page.teamsList");
        }).catch(function () {
            $scope.hideLoading();
        });
    };

    $scope.team_edit = function () {
        $scope.action = 'edit';
        $scope.popover.hide();
        $state.go('page.teamEdit');
    };

    $scope.edit = function () {
        $scope.team.teams_user = [];
        angular.forEach($scope.tagGerentes, function (value, key) {
            $scope.team.teams_user.push(value);
        });
        angular.forEach($scope.tagVendedores, function (value, key) {
            $scope.team.teams_user.push(value);
        });
        if ($scope.team.name === null) {
            $ionicPopup.alert({
                title: 'Erro',
                template: 'Escolha um título para a equipe e ao menos um integrante !'
            });
            return;
        }
        TeamEditService.edit($scope.team).then(function () {
            if (TeamEditService.status === 200) {
                $ionicPopup.alert({
                    title: 'Sucesso',
                    template: 'Equipe atualizada !'
                });
            } else {
                $ionicPopup.alert({
                    title: 'Erro',
                    template: 'Erro ao editar a equipe, tente novamente mais tarde !'
                });
            }
        });
        $scope.popover.hide();
        $state.go('page.teamsList');
    };

    $scope.delete = function () {
        $scope.showLoading();
        TeamEditService.delete($scope.team.id).then(function () {
            if (TeamEditService.status === 200) {
                $ionicPopup.alert({
                    title: 'Sucesso',
                    template: 'Equipe deletada !'
                });
            } else {
                $ionicPopup.alert({
                    title: 'Erro',
                    template: 'Erro ao deletar a equipe, tente novamente mais tarde !'
                });
            }
            $scope.popover.hide();
            $state.go('page.teamsList');
        }).catch(function () {
            $scope.popover.hide();
            $state.go('page.teamsList');
        });
    };

    $scope.team_user_remove = function () {
        console.log($scope.team);
        console.log($scope.user_remover);
        TeamEditService.team_user_delete($scope.team.id, $scope.user_remover.id).then(function () {
            if (TeamEditService.status === 200) {
                $ionicPopup.alert({
                    title: 'Sucesso',
                    template: 'Usuário deletado !'
                });
            } else {
                $ionicPopup.alert({
                    title: 'Erro',
                    template: 'Erro ao deletar usuário, tente novamente mais tarde !'
                });
            }
            $scope.popover.hide();
            $state.go('page.teamsList');
        }).catch(function () {
            $scope.popover.hide();
            $state.go('page.teamsList');
        });
    };

    $scope.init();
});
