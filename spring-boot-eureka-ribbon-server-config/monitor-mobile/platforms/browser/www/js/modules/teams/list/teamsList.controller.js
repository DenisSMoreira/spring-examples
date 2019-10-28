/* global PROFILE_TYPE_ADMIN */

'use strict';
angular.module('teams').controller('TeamsListController', function ($scope, $http, $ionicPopup, PrincipalService, $state, $ionicLoading, TeamsListService, $ionicPopover, TeamEditService) {

    $scope.user = PrincipalService.getUserLogged();
    $scope.teamsList = [];
    $scope.teams_user = '';
    $scope.teamSelected = {};
    TeamEditService.findUsers();

    $scope.showLoading = function () {
        $ionicLoading.show({
            template: '<ion-spinner icon="lines"></ion-spinner>'
        });
    };

    $scope.hideLoading = function () {
        $ionicLoading.hide();
    };

    $scope.listTeams = function () {
        $scope.showLoading();
        if ($scope.user.profile === PROFILE_TYPE_ADMIN) {
            TeamsListService.list($scope.user.id).then(function () {
                $scope.teamsList = TeamsListService.teamsList;
                $scope.hideLoading();
                $scope.$broadcast('scroll.refreshComplete');
                $scope.verifica_equipe($scope.user.id);
            }).then(function () {
                $scope.hideLoading();
                $scope.$broadcast('scroll.refreshComplete');
            });
        } else {
            TeamsListService.listGerenteVendedor($scope.user.id).then(function () {
                $scope.teamsList = TeamsListService.teamsList;
                $scope.hideLoading();
                $scope.$broadcast('scroll.refreshComplete');
                $scope.verifica_equipe($scope.user.id);
            }).then(function () {
                $scope.hideLoading();
                $scope.$broadcast('scroll.refreshComplete');
            });
        }
    };

    $scope.verifica_equipe = function (id) {
        TeamsListService.team_users(id).then(function () {
            $scope.teams_user = TeamsListService.list_team;
            
            angular.forEach($scope.teams_user, function (value, key) {
                
                if (value.visualized === false) {
                    
                    if ($scope.user.profile !== PROFILE_TYPE_ADMIN) {
                        $ionicPopup.alert({
                            title: 'Bem-vindo',
                            template: 'Você foi adicionado à equipe ' + value.name
                        });
                        TeamsListService.update_team_users(value.id);
                    }
                }
            });
        });
    };

    $scope.getNameTeam = function (team_id) {
        var name = '';
        angular.forEach($scope.teamsList, function (value, key) {
            if (value.id === team_id) {
                name = value.name;
            }
        });
        return name;
    };

    $scope.create = function () {
        TeamEditService.setAction('create');
        $state.go('page.teamEdit');
    };

    var template = "<ion-popover-view class='popup popup_team'>"
            + "<a class='item item-icon-left' ng-click='show()'><i class='icon ion-ios-eye-outline'></i>Visualizar equipe</a>"
            + "<a class='item item-icon-left' ng-click='edit()'><i class='icon ion-ios-compose-outline'></i>Editar equipe</a>"
            + "<a class='item item-icon-left' ng-click='delete()'><i class='icon ion-ios-trash-outline'></i>Deletar equipe</a>"
            + "</ion-popover-view>";

    $scope.popover = $ionicPopover.fromTemplate(template, {
        scope: $scope
    });

    $scope.openPopover = function ($event, item) {
        $scope.popover.show($event);
        $scope.teamSelected = item;
    };

    $scope.closePopover = function () {
        $scope.popover.hide();
    };

    $scope.show = function () {
        TeamEditService.setTeamSelected($scope.teamSelected);
        TeamEditService.setAction('show');
        $scope.popover.hide();
        TeamEditService.findUsersTeam().then(function () {
            $state.go('page.teamEdit');
        });
    };

    $scope.show_team = function (team) {
        TeamEditService.setTeamSelected(team);
        TeamEditService.setAction('show');
        TeamEditService.findUsersTeam().then(function () {
            $state.go('page.teamEdit');
        });
    };

    $scope.edit = function () {
        TeamEditService.setTeamSelected($scope.teamSelected);
        TeamEditService.setAction('edit');
        $scope.popover.hide();
        TeamEditService.findUsersTeam().then(function () {
            $state.go('page.teamEdit');
        });
    };

    $scope.delete = function () {
        $scope.popover.hide();
        $scope.showLoading();
        TeamsListService.delete($scope.teamSelected.id).then(function () {
            if (TeamsListService.status === 200) {
                $ionicPopup.alert({
                    title: 'Sucesso',
                    template: 'Equipe deletada com sucesso !'
                });
                $scope.hideLoading();
                $scope.listTeams();
                $state.go("page.teamsList", {}, {reload: true, notify: true});
            } else {
                $ionicPopup.alert({
                    title: 'Erro',
                    template: 'Erro ao deletada a equipe, tente novamente mais tarde !'
                });
            }
        }).then(function () {
            $scope.hideLoading();
        });
    };

});
