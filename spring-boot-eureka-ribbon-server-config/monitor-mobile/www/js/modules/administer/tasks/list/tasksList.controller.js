/* global DATE_FORMAT, MONTHS, DAYS_OF_THE_WEEK */

'use strict';
angular.module('manage-tasks').controller('ManageTasksListController', function ($scope, $ionicPopup, $state, PrincipalService, $ionicLoading, $filter, TasksListServiceAdm, $timeout, $rootScope) {

    //get user
    $scope.user = PrincipalService.getUserLogged();
    $scope.usersList = (PrincipalService.getUserSelected() === "all" || PrincipalService.getUserSelected() === null) ? '' : PrincipalService.getUserSelected().id;
    $scope.statusList = PrincipalService.getAction() === null ? 'false' : PrincipalService.getAction();

    $scope.vendedorSelected = {};
    $scope.users = [];
    $scope.users.push($scope.user);
    TasksListServiceAdm.findTags();

    $scope.backDate = function () {
        PrincipalService.setTaskTomorrow("false");
        $scope.onezoneDatepicker.date.setDate($scope.onezoneDatepicker.date.getDate() - 1);
        $scope.filterTasks($scope.onezoneDatepicker.date);
    };

    $scope.forwardDate = function () {
        $scope.onezoneDatepicker.date.setDate($scope.onezoneDatepicker.date.getDate() + 1);
        $scope.filterTasks($scope.onezoneDatepicker.date);
    };

    $scope.filterTasks = function (date) {
        $scope.tasksFilter = [];
        $scope.tasksFilterCompletedWithin = [];
        $scope.tasksFilterDoneDelayed = [];
        $scope.tasksFilterFuture = [];
        var today = $filter('date')(new Date(), DATE_FORMAT);

        angular.forEach($scope.tasksAll, function (value, key) {
            var expires = $filter('date')(value.expires, DATE_FORMAT);
            var updated = $filter('date')(value.updated, DATE_FORMAT);
            var filter = $filter('date')(date, DATE_FORMAT);

            //date filter = task due date
            if (filter === expires) {

                //task completed
                if (value.status) {
                    if (filter > today) {
                        $scope.tasksFilterFuture.push(value);
                    } else {
                        //and it was completed on the same day
                        if (updated === expires) {
                            $scope.tasksFilterCompletedWithin.push(value);
                        } else {
                            //with a delay
                            $scope.tasksFilterDoneDelayed.push(value);
                        }
                    }
                } else {
                    //task delayed to
                    $scope.tasksFilter.push(value);
                }
            }
        });
    };

    $scope.getUserName = function (id) {
        var name;
        angular.forEach($scope.allUsersOfTeams, function (value, key) {
            if (value.id === id) {
                name = value.name + ' ' + value.lastname;
            }
        });
        return name;
    };

    $scope.todayLabel = function () {
        if ($scope.today()) {
            return 'Hoje, ' + $filter('date')($scope.onezoneDatepicker.date, 'dd') + ' de ' + $scope.getMonth($scope.onezoneDatepicker.date.getMonth());
        } else {
            return $filter('date')($scope.onezoneDatepicker.date, 'dd') + ' de ' + $scope.getMonth($scope.onezoneDatepicker.date.getMonth());
        }
    };

    $scope.today = function () {
        var today = $filter('date')(new Date(), DATE_FORMAT);
        var datePicker = $filter('date')($scope.onezoneDatepicker.date, DATE_FORMAT)
        if (datePicker === today) {
            return true;
        } else {
            return false;
        }
    };

    $scope.isTaskTomorrowFilter = function () {
        var today = new Date();
        if ($scope.onezoneDatepicker.date.getDate() > today.getDate()) {
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

    $scope.findTasks = function (userId) {
        $scope.showLoading();

        if (userId === undefined || userId === null || userId === '') {
            userId = 'all';
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
                            dateValue = $filter('date')(value.expires, DATE_FORMAT);
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
                    } else {
                        $scope.tasksAll = [];
                        $scope.tasksToday = [];
                        $scope.tasksOld = [];
                    }

                    if (PrincipalService.isTaskTomorrow() === 'true') {
                        $scope.forwardDate();
                    }
                    $scope.hideLoading();
                })
                        
        .catch(function () {
           $scope.hideLoading();
        });

        TasksListServiceAdm.getAllUsersOfTeams($scope.user.id).then(function () {
            $scope.showLoading();
            $scope.allUsersOfTeams = TasksListServiceAdm.usersList;
            $scope.hideLoading();
        }).catch(function () {
            $scope.hideLoading();
        });

        $scope.$broadcast('scroll.refreshComplete');
    };

    $scope.forwardCreateTask = function () {
        $state.go('page.manageCreateTask');
    };

    $scope.goDetailTask = function (item) {
        TasksListServiceAdm.setTaskSelected(item);
        $state.go('page.manageTaskDetails', {"item": item.id});
    };

    //start vars
    var dateValue;
    $scope.tasksAll = [];
    $scope.tasksToday = [];
    $scope.tasksOld = [];
    $scope.tasksFilter = [];
    $scope.tasksFilterCompletedWithin = [];
    $scope.tasksFilterFuture = [];
    $scope.tasksFilterDoneDelayed = [];

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

    $scope.findTasks($scope.usersList);

    $scope.filterTask = function (vendedorSelected) {
        var user = JSON.parse(vendedorSelected);
        $scope.findTasks(user.id);
    };

});
