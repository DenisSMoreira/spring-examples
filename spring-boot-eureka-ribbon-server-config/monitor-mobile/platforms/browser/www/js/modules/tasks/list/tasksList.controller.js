/* global DATE_FORMAT, MONTHS, DAYS_OF_THE_WEEK */

'use strict';
angular.module('tasks').controller('TasksListController', function ($scope, $http, $ionicPopup, PrincipalService, $state, $ionicLoading, $filter, TasksListService, TasksSellerDetails, $timeout, $rootScope) {

    //get user
    $scope.user = {};
    $scope.taskOldLenght = 0;
    $scope.tasksTodayLenght = 0;

    $scope.backDate = function () {
        $scope.onezoneDatepicker.date.setDate($scope.onezoneDatepicker.date.getDate() - 1);
        $scope.filterTasks($scope.onezoneDatepicker.date);
    };

    $scope.forwardDate = function () {
        $scope.onezoneDatepicker.date.setDate($scope.onezoneDatepicker.date.getDate() + 1);
        $scope.filterTasks($scope.onezoneDatepicker.date);
    };

    $scope.filterTasks = function (date) {
        $scope.tasksFilter = [];
        angular.forEach($scope.tasksAll, function (value, key) {
            var dateValue = $filter('date')(value.expires, DATE_FORMAT);
            var filter = $filter('date')(date, DATE_FORMAT);
            if (filter === dateValue) {
                $scope.tasksFilter.push(value);
            }
        });
    };

    $scope.loadTags = function (task_id) {
        TasksSellerDetails.tagTasksList(task_id).then(function () {
            var list = TasksSellerDetails.tags;
            if (list.length > 0) {
                angular.forEach(list, function (value, key) {
                    TasksSellerDetails.getTag(value.tag_id).then(function () {
                        $scope.tags.push(TasksSellerDetails.tag);
                    });
                    ;
                });
                $scope.item.tags = $scope.tags;
            }
        });
    };

    $scope.todayLabel = function () {
        if ($scope.today()) {
            return 'Hoje, ' + $filter('date')($scope.onezoneDatepicker.date, 'dd') + ' de ' + $scope.getMonth($scope.onezoneDatepicker.date.getMonth());
        } else {
            return $filter('date')($scope.onezoneDatepicker.date, 'dd') + ' de ' + $scope.getMonth($scope.onezoneDatepicker.date.getMonth());
        }
    };

    $scope.today = function () {
        var today = new Date();
        if ($scope.onezoneDatepicker.date.getDate() === today.getDate()) {
            return true;
        } else {
            return false;
        }
    };

    $scope.getMonth = function (month_number) {
        return MONTHS[month_number];
    };

    $scope.showLoading = function () {
        $ionicLoading.show({
            template: '<ion-spinner icon="lines"></ion-spinner>'
        });
    };
    $scope.hideLoading = function () {
        $ionicLoading.hide();
    };

    $scope.showTimer = false;

    $scope.startTask = function (item) {

        //changeStatusTask = function(item, status, active, doneTime, timeStatus)

        //start
        if (item.time_status === "NEW") {
            $scope.changeStatusTask(item, false, true, new Date(0), 'START');

            //pause
        } else if (item.time_status === "START") {

            //first time
            if (new Date(item.done).getTime() === 0) {
                $scope.startTimeTask = new Date(new Date() - new Date(item.updated));
                $scope.changeStatusTask(item, false, true, $scope.startTimeTask, 'STOP');

                //case negative
            } else if (new Date(item.done).getTime() < 0) {
                var startTimeTask = new Date(item.updated).getTime() + new Date(item.done).getTime();
                startTimeTask = new Date().getTime() - startTimeTask;
                $scope.changeStatusTask(item, false, true, new Date(startTimeTask), 'STOP');

            } else {
                var startTimeTask = new Date(item.updated).getTime() - new Date(item.done).getTime();
                startTimeTask = new Date().getTime() - startTimeTask;
                $scope.changeStatusTask(item, false, true, new Date(startTimeTask), 'STOP');
            }

            //continue
        } else if (item.time_status === "STOP") {
            $scope.startTimeTask = new Date(new Date() - new Date(item.done));
            $scope.changeStatusTask(item, false, true, new Date(item.done), 'START');

        } else if (item.time_status === "FINISH") {
            TasksListService.setTaskSelected(item);
            $state.go('page.tasksSellerDetails', {"item": item.id});
        }

    };

    $scope.showPopuptoStart = function (item) {
        if (item.time_status === "FINISH") {
            TasksListService.setTaskSelected(item);
            $state.go('page.tasksSellerDetails', {"item": item.id});

        } else {
            if (item.active === null || item.active === false) {
                $ionicPopup.show({
                    title: '<img src="img/icone-play-janela-confirmacao.svg" class="popup-confirmation"> <div class="popup-title" > Iniciar Tarefa</div>',
                    subTitle: 'Você tem certeza que deseja iniciar esta tarefa?',
                    scope: $scope,
                    buttons: [
                        {
                            text: '<b style="border-radius: 0px !important;" >Iniciar</b>',
                            type: 'badge badge-salemonitor',
                            onTap: function (e) {
                                $scope.startTask(item);
                            }
                        },
                        {text: '<b>Cancelar</b>',
                            type: 'button popup-button-cancel'
                        }
                    ]
                });
            } else if (item.time_status === 'START') {
                $ionicPopup.alert({
                    title: 'Tarefa pausada ',
                    template: 'Para marcar a subtarefa como resolvida, é preciso dar play nesta tarefa.',
                    buttons: [
                        {
                            text: 'OK, entendi', type: 'button button-entrar-salemonitor'
                        }
                    ]
                });
                $scope.startTask(item);
            } else {
                $scope.startTask(item);
            }
        }

    };

    $scope.changeStatusTask = function (item, status, active, doneTime, timeStatus) {
        var change = true;
        if (doneTime === null) {
            TasksSellerDetails.changeStatusTaskPrincipalNotTime(item.id, change, status, active, timeStatus).then(function () {
                $scope.findTasks();
            });

        } else {
            TasksSellerDetails.changeStatusTaskPrincipal(item.id, change, status, active, doneTime, timeStatus).then(function () {
                $scope.findTasks();
            });
        }
    };

    $scope.findTasks = function () {
        $scope.user = PrincipalService.getUserLogged();

        $scope.showLoading();
        //reset vars
        $scope.tasksOld = [];
        $scope.tasksToday = [];
        $scope.taskOldLenght = 0;
        $scope.tasksTodayLenght = 0;

        TasksListService.findTasks($scope.user.id).then(
                function () {
                    $scope.tasksAll = TasksListService.tasksList;
                    if ($scope.tasksAll !== null && $scope.tasksAll.length > 0) {

                        angular.forEach($scope.tasksAll, function (value, key) {
                            dateValue = $filter('date')(value.expires, DATE_FORMAT);
                            var today = $filter('date')(new Date(), DATE_FORMAT);

                            if (today === dateValue) {
                                $scope.tasksToday.push(value);
                                if (!value.status) {
                                    $scope.tasksTodayLenght = $scope.tasksTodayLenght + 1;
                                }
                            } else if (today > dateValue) {
                                if (!value.status) {
                                    $scope.tasksOld.push(value);
                                    $scope.taskOldLenght = $scope.taskOldLenght + 1;
                                }
                            }
                        });
                    }
                    $scope.hideLoading();
                    $scope.$broadcast('scroll.refreshComplete');
                }).catch(function () {
            $scope.hideLoading();
            $scope.$broadcast('scroll.refreshComplete');
        });
    };

    $scope.goDetailTask = function (item) {
        TasksListService.setTaskSelected(item);
        $state.go('page.tasksSellerDetails', {"item": item.id});
    };

    //start vars
    var dateValue;
    $scope.tasksAll = [];
    $scope.tasksToday = [];
    $scope.tasksOld = [];
    $scope.tasksFilter = [];

    //config date pick
    $scope.onezoneDatepicker = {
        date: new Date(),
        months: MONTHS,
        daysOfTheWeek: DAYS_OF_THE_WEEK,
        mondayFirst: false,
        disablePastDays: false,
        disableSwipe: false,
        disableWeekend: false,
        showDatepicker: false,
        showTodayButton: true,
        calendarMode: false,
        hideCancelButton: false,
        hideSetButton: false,
        callback: function (date) {
            $scope.filterTasks(date);
        }
    };

    $rootScope.$on('$stateChangeSuccess',
            function (event, toState, toParams, fromState, fromParams) {
                if (fromState.controller === "TasksSellerDetailsController") {
                    $scope.findTasks();
                }
            });

    $scope.findTasks();
});
