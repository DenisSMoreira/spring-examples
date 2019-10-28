/* global DATE_FORMAT */

'use strict';
angular.module('tasks').controller('TasksSellerDetailsController', function ($scope, $http, $ionicPopup, $state, PrincipalService, $ionicLoading, $filter, $stateParams, TasksSellerDetails, $timeout) {
    $scope.item = TasksSellerDetails.getTaskSelected();

    $scope.user = {};
    $scope.tags = [];
    var click = false;

    $scope.sub_tasks = [];
    $scope.showTimer = false;
    $scope.disableFloatingButton = false;
    $scope.taskStarted = false;

    var currentTimeTask = new Date(0);

    //first click start
    if ($scope.item.done !== null) {
        $scope.startTimeTask = new Date().getTime() - new Date($scope.item.done).getTime();
    }

    $scope.initTime = function () {
        $scope.user = PrincipalService.getUserLogged();
        $scope.loadTags($scope.item.id);

        if ($scope.item.time_status === "FINISH") {
            $scope.showTimer = true;
            $scope.taskStarted = false;

            //ongoing task
        } else if ($scope.item.time_status === "START") {
            $scope.startTimeTask = new Date($scope.item.updated).getTime() - new Date($scope.item.done).getTime();
            $scope.$broadcast('timer-resume');
            $scope.taskStarted = true;
            $scope.showTimer = true;
            click = true;

        } else if ($scope.item.time_status === "STOP") {
            $scope.startTimeTask = new Date($scope.item.updated).getTime() + new Date($scope.item.done).getTime();
            $scope.taskStarted = false;
            $scope.showTimer = true;
            click = false;

        }
    };

    $scope.startTask = function () {
        $scope.showTimer = true;

        //primeiro click
        if (!click) {
            if ($scope.item.time_status === null) {
                $scope.startTimeTask = new Date().getTime();
                $scope.$broadcast('timer-start');

            } else {
                $scope.startTimeTask = new Date().getTime() - new Date($scope.item.done).getTime();
                $scope.$broadcast('timer-resume');
            }

            $scope.changeStatusTask(false, true, currentTimeTask, 'START');
            $scope.taskStarted = true;
            click = true;
        } else {
            $scope.$broadcast('timer-stop');
            $scope.changeStatusTask(false, true, currentTimeTask, 'STOP');
            $scope.taskStarted = false;
            click = false;
        }
    };

    $scope.loadTags = function (task_id) {
        TasksSellerDetails.tagTasksList(task_id).then(function () {
            var list = TasksSellerDetails.tags;
            if (list.length > 0) {
                angular.forEach(list, function (value, key) {
//                    TasksSellerDetails.getTag(value.tag_id).then(function () {
                        $scope.tags.push(value);
//                    });
                });
                $scope.item.tags = $scope.tags;
            }
        });
    };

    $scope.taskDetails = function (task_id) {
        $scope.showLoading();

        TasksSellerDetails.findSubTasksList(task_id).then(function () {
            $scope.sub_tasks = TasksSellerDetails.subTasksList;
        });

        $scope.hideLoading();
    };

    //user function to store the task of the current time
    $scope.$on('timer-tick', function (event, data) {
        currentTimeTask = new Date(data.millis);
    });

    $scope.changeStatusSubTask = function (sub_task) {
        var count = 0;
        var change = true;

        if ($scope.item.status === true) {
            $scope.showPopuptoReOpenTask(sub_task);
        } else {

            TasksSellerDetails.changeStatusSubTask(sub_task, change, currentTimeTask).then(function () {
                angular.forEach($scope.sub_tasks, function (value, key) {
                    if (value.status) {
                        count++;
                    }
                });

                if (count === $scope.sub_tasks.length) {
                    $scope.showPopuptoCloseTask(sub_task);

                } else {
                    $scope.changeStatusTask(false, true, currentTimeTask, "START");
                }
            });
        }
    };

    $scope.closeTaskPrincipal = function (task) {
        var count = 0;
        var change = true;

        if (!$scope.item.done) {
            var popup = $ionicPopup.show({
                title: '<div class="popup-title" > Iniciar Tarefa</div>',
                subTitle: 'Para marcar a tarefa como finalizada, é preciso dar play nesta tarefa',
                scope: $scope,
                buttons: [
                    {
                        text: '<b style="border-radius: 0px !important;" >Iniciar</b>',
                        type: 'badge badge-salemonitor',
                        onTap: function (e) {
                            $scope.startTask();
                        }
                    }
                ]
            });
        } else {
            if ($scope.item.status === true) {
                $scope.showPopuptoReOpenTask(task);
            } else {
                angular.forEach($scope.sub_tasks, function (value, key) {
                    if (value.status) {
                        count++;
                    }
                });

                if (count === $scope.sub_tasks.length) {
                    $scope.showPopuptoCloseTask(task);

                } else {
                    $scope.changeStatusTask(false, true, currentTimeTask, "START");
                }
            }
        }

    };

    $scope.changeStatusTask = function (status, active, doneTime, timeStatus) {
        var change = true;
        var idTaskPrincipal = $stateParams.item;
        $scope.item.updated = new Date().getTime();
        TasksSellerDetails.changeStatusTaskPrincipal(idTaskPrincipal, change, status, active, doneTime, timeStatus).then(function () {
            $scope.item.status = status;
            $scope.item.done = doneTime;
            $scope.item.active = active;
            $scope.item.time_status = timeStatus;
        });
    };

    //Redirect to the task list screen
    $scope.tarefasVendedor = function () {
        $state.go("page.tasksList");
    };

    $scope.today = function () {
        $scope.item = TasksSellerDetails.getTaskSelected();
        if ($scope.item !== undefined) {
            var today = $filter('date')(new Date(), DATE_FORMAT);
            var data = $filter('date')($scope.item.expires, DATE_FORMAT);
            if (today === data) {
                return true;
            } else {
                return false;
            }
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

    $scope.showPopuptoReOpenTask = function (sub_task) {

        var titleCustom = '<img src="img/icone-play-janela-confirmacao.svg" class="popup-confirmation"> <div class="popup-title" > Reiniciar Tarefa</div>';
        var buttonCondition = '<b style="border-radius: 0px !important;" >Reiniciar</b>'
        var msgSubTitle = 'Esta tarefa está marcada como finalizada. Tem certeza que deseja reiniciá-la?';

        $ionicPopup.show({
            title: titleCustom,
            subTitle: msgSubTitle,
            scope: $scope,
            buttons: [
                {
                    text: buttonCondition,
                    type: 'badge badge-salemonitor',
                    onTap: function (e) {
                        //TasksSellerDetails.changeStatusSubTask(sub_task, change);
                        $scope.changeStatusTask(false, true, $scope.startTimeTask, "START");
                        $scope.startTimeTask = new Date().getTime() - new Date($scope.item.done).getTime();
                        click = true;
                        currentTimeTask = new Date(0);
                        $scope.$broadcast('timer-resume');
                        $scope.taskStarted = true;
                        $scope.showTimer = true;

                    }
                },
                {text: '<b>Cancelar</b>',
                    type: 'button popup-button-cancel',
                    onTap: function (e) {
                        sub_task.status = true;

                    }
                }
            ]
        });
    };

    $scope.showPopuptoCloseTask = function (sub_task) {

        var titleCustom = '<img src="img/icone-play-janela-confirmacao.svg" class="popup-confirmation"> <div class="popup-title" > Concluir Tarefa</div>';
        var buttonCondition = '<b style="border-radius: 0px !important;" >Concluir</b>'
        var msgSubTitle = 'Você realmente deseja marcar esta tarefa como concluída?';

        $ionicPopup.show({
            title: titleCustom,
            subTitle: msgSubTitle,
            scope: $scope,
            buttons: [
                {
                    text: buttonCondition,
                    type: 'badge badge-salemonitor',
                    onTap: function (e) {
                        $scope.$broadcast('timer-stop');
                        $scope.taskStarted = false;
                        click = false;
                        $scope.changeStatusTask(true, false, currentTimeTask, "FINISH");

                    }
                },
                {text: '<b>Cancelar</b>',
                    type: 'button popup-button-cancel',
                    onTap: function (e) {
                        sub_task.status = false;
                        TasksSellerDetails.changeStatusSubTask(sub_task, true);
                    }
                }
            ]
        });
    };

    $scope.showPopuptoStart = function () {
        if ($scope.item.active === false) {
            $ionicPopup.show({
                title: '<img src="img/icone-play-janela-confirmacao.svg" class="popup-confirmation"> <div class="popup-title" > Iniciar Tarefa</div>',
                subTitle: 'Você tem certeza que deseja iniciar esta tarefa?',
                scope: $scope,
                buttons: [
                    {
                        text: '<b style="border-radius: 0px !important;" >Iniciar</b>',
                        type: 'badge badge-salemonitor',
                        onTap: function (e) {
                            $scope.startTask();
                        }
                    },
                    {text: '<b>Cancelar</b>',
                        type: 'button popup-button-cancel'
                    }
                ]
            });
        } else {
            $scope.startTask();
        }
    };

    $scope.taskDetails($stateParams.item);
});
