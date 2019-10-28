/* global PROFILE_TYPE_SELLER, PROFILE_TYPE_MANAGER, PROFILE_TYPE_ADMIN, DATE_FORMAT */

'use strict';
angular.module('principal').controller('PrincipalController', function ($scope, $http, $ionicPopup, PrincipalService, $state, $filter, $ionicLoading, Api, $ionicSideMenuDelegate, $ionicSlideBoxDelegate, $rootScope, TasksListServiceAdm, TeamsListService, LoginService) {
    $scope.users;
    $scope.user = {};
    $scope.vendedorSelected = PrincipalService.getUserSelected() === null ? 'all' : PrincipalService.getUserSelected();
    $scope.vendedor = PrincipalService.getUserSelected() === null ? {} : PrincipalService.getUserSelected();

    $scope.getProfile = function (profile_id) {
        if (profile_id === PROFILE_TYPE_SELLER) {
            return 'Vendedor';
        } else if (profile_id === PROFILE_TYPE_MANAGER) {
            return 'Gerente';
        } else if (profile_id === PROFILE_TYPE_ADMIN) {
            return 'Administrador';
        }
    };

    $scope.showLoading = function () {
        $ionicLoading.show({
            template: '<ion-spinner icon="lines"></ion-spinner>'
        });
    };

    $scope.hideLoading = function () {
        $ionicLoading.hide();
    };

    $scope.nextSlide = function () {
        $ionicSlideBoxDelegate.next();
    };

    $scope.init = function () {
        $scope.user = PrincipalService.getUserLogged();

        if ($scope.user !== null && $scope.user.id) {
            $scope.showLoading();
            $scope.teams_user = [];
//TODO:            TeamsListService.team_users($scope.user.id).then(function () {
//                $scope.teams_user = [];
//                angular.forEach(TeamsListService.list_team, function (value, key) {
//                    if (value.visualized === false) {
//                        $scope.teams_user.push(value);
//                    }
//                });
            $scope.initIndicators();
            $scope.hideLoading();
//            });
        }
    };

    $scope.iniciar = function () {
        var userLogged = PrincipalService.getUserLogged();
        if (userLogged !== null && userLogged !== undefined) {
            var principal = {tutorial: true, id: userLogged.id};
            localStorage.setItem('FirstTimeHere' + userLogged.id, JSON.stringify(principal));
        }
        localStorage.setItem('welcome', false);
        $ionicSideMenuDelegate.canDragContent(true);
        $state.go('page.principal', {}, {reload: true, notify: true, inherit: false});
    };

    $scope.initIndicators = function () {
        if ($scope.user.profile === PROFILE_TYPE_SELLER) {
            $scope.findTasksIndicators($scope.user.id);

        } else if ($scope.user.profile === PROFILE_TYPE_MANAGER || $scope.user.profile === PROFILE_TYPE_ADMIN) {
            TasksListServiceAdm.findUsers().then(function () {
                $scope.users = TasksListServiceAdm.users;
                $scope.findTasksIndicators($scope.vendedorSelected !== "all" ? $scope.vendedorSelected.id : $scope.vendedorSelected);
            }).catch(function () {
            });
        }
        ;
    };

    $scope.getUsersOfTeams = function () {
        $scope.showLoading();

        TasksListServiceAdm.getAllUsersOfTeams($scope.user.id).then(function () {
            $scope.allUsersOfTeams = TasksListServiceAdm.usersList;
        });
        $scope.hideLoading();
    };

    $scope.tasksOld = [];
    $scope.tasksToday = [];
    $scope.tasksTomorrow = [];
    $scope.tasksTodayDone = [];
    $scope.myTasks = [];
    $scope.taskOldCompletedToday = [];

    $scope.filterTask = function (vendedorSelected) {
        if (vendedorSelected === "all") {
            $scope.findTasksIndicators(vendedorSelected);
        } else {
            var user = JSON.parse(vendedorSelected);
            $scope.vendedor = user;
            $scope.findTasksIndicators(user.id);
        }
    };

    $scope.redirector = function (action, vendedorSelected, tomorrow) {
        PrincipalService.setAction(action);
        PrincipalService.setTaskTomorrow(tomorrow);
        if (vendedorSelected === "all") {
            PrincipalService.setUserSelected(vendedorSelected);
        } else {
            try {
                PrincipalService.setUserSelected(JSON.parse(vendedorSelected));
            } catch (ex) {
                PrincipalService.setUserSelected(vendedorSelected);
            }
        }
        if ($scope.user.profile === PROFILE_TYPE_MANAGER || $scope.user.profile === PROFILE_TYPE_ADMIN) {
            $state.go('page.manageTasksList');
        } else {
            $state.go('page.tasksList');
        }
    };

    $scope.findTasksIndicators = function (userId) {
        $scope.showLoading();

        if (userId === undefined) {
            $scope.user = PrincipalService.getUserLogged();
            userId = $scope.user.id;
        }
        //reset vars
        $scope.tasksOld = [];
        $scope.tasksToday = [];
        $scope.tasksTodayDone = [];
        $scope.tasksTomorrow = [];
        $scope.taskOldCompletedToday = [];

        TasksListServiceAdm.findTasks(userId).then(
                function () {
                    $scope.tasksAll = TasksListServiceAdm.tasksList;

                    if ($scope.tasksAll !== null && $scope.tasksAll.length > 0) {

                        angular.forEach($scope.tasksAll, function (value, key) {
                            var dateValue = $filter('date')(value.expires, DATE_FORMAT);
                            var today = $filter('date')(new Date(), DATE_FORMAT);

                            var dateUpdate = $filter('date')(value.updated, DATE_FORMAT);

                            //tasks today
                            if (today === dateValue) {
                                if (!value.status) {
                                    $scope.tasksToday.push(value);
                                } else {
                                    $scope.tasksTodayDone.push(value);
                                }

                                //tasks delayed
                            } else if (today > dateValue) {
                                //It is only delayed and has not been made
                                if (!value.status) {
                                    $scope.tasksOld.push(value);

                                    //it is delayed however was completed today
                                } else if (dateUpdate === today) {
                                    $scope.taskOldCompletedToday.push(value);
                                }

                                //tasks for tomorrow
                            } else if (today < dateValue) {
                                $scope.tasksTomorrow.push(value);
                            }
                        });
                        
                        TasksListServiceAdm.findTasks($scope.user.id).then(function (response) {
                             $scope.myTasks = response.data;
                        });
                    } else {
                        $scope.tasksAll = [];
                        $scope.tasksToday = [];
                        $scope.tasksOld = [];
                        $scope.tasksFilter = [];
                        $scope.tasksTomorrow = [];
                        $scope.taskOldCompletedToday = [];
                        $scope.tasksTodayDone = [];
                    }
                    $scope.hideLoading();
                }).catch(function () {
            $scope.hideLoading();
        });

        $scope.$broadcast('scroll.refreshComplete');
    };

    $scope.logout = function () {
        $scope.showLoading();
//        LoginService.logout();
        $state.go('login');
        $scope.hideLoading();
    };

    $scope.init();
});
