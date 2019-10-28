'use strict';
angular.module('manage-tasks').controller('ManageTasksDetailsController', function ($scope, $ionicPopover, $http, $ionicPopup, $state, $ionicLoading, $filter, $stateParams, TasksManagerDetails, $timeout, $q, PrincipalService) {
    $scope.item = TasksManagerDetails.getTaskSelected();

    $scope.user = {};
    $scope.tags = [];
    $scope.user_task = {};
    $scope.sub_tasks = [];
    $scope.disableFloatingButton = false;

    var click = false;
    var conditionClick = true;
    var currentTimeTask = new Date(0);

    //start time for plugin
    if ($scope.item.done !== undefined) {
        $scope.startTimeTask = new Date().getTime() - new Date($scope.item.done).getTime();
    }

    var template = "<ion-popover-view class='popup_task'>"
            + "<a class='item item-icon-left' ng-click='taskEdit();popover.remove();'><i class='icon ion-ios-compose-outline'></i>Editar Tarefa</a>"
            + "<a class='item item-icon-left' ng-click='delete();popover.remove();'><i class='icon ion-ios-trash-outline'></i>Deletar Tarefa</a>"
            + "</ion-popover-view>";

    $scope.popover = $ionicPopover.fromTemplate(template, {
        scope: $scope
    });

    $scope.taskEdit = function () {
        if ($scope.item.status === true) {
            alert("Não é possível alterar uma tarefa finalizada!")
        } else {
            TasksManagerDetails.setTaskSelectedEdit($scope.item, $scope.sub_tasks);
            $state.go('page.manageCreateTask', {"edit": 'true'});
        }
    }

    $scope.delete = function () {
        angular.forEach($scope.sub_tasks, function (value, key) {
            TasksManagerDetails.deleteSubTask(value.id);
        })
        TasksManagerDetails.deleteTask($scope.item.id).then(function () {
            $state.go("page.manageTasksList");
        })
    };

    $scope.openPopover = function ($event, item) {
        $scope.popover.show($event);
        $scope.teamSelected = item;
    };

    $scope.forwardCreateTask = function () {
        $state.go('page.manageCreateTask');
    }

    $scope.loadTags = function (task_id) {
        TasksManagerDetails.tagTasksList(task_id).then(function () {
            var list = TasksManagerDetails.tags;
            if (list.length > 0) {
                angular.forEach(list, function (value, key) {
//                    TasksManagerDetails.getTag(value.tag_id).then(function () {
//                        $scope.tags.push(value);
                    });
//                });
                $scope.item.tags = $scope.tags;
            }
        });
    };

    $scope.taskDetails = function (task_id) {
        $scope.showLoading();
        $scope.user = PrincipalService.getUserLogged();

        TasksManagerDetails.findSubTasksList(task_id).then(function () {
            $scope.sub_tasks = TasksManagerDetails.subTasksList;
        })
        $scope.getUserTask($scope.item.user_id);
        $scope.tags = [];
        $scope.loadTags($scope.item.id);
        $scope.hideLoading();
    }

    //Redirect to the task list screen
    $scope.tarefasVendedor = function () {
        $state.go("page.manageTasksList");
    }

    $scope.today = function () {
        $scope.item = TasksManagerDetails.getTaskSelected();
        if ($scope.item != undefined) {
            var today = $filter('date')(new Date(), DATE_FORMAT);
            var data = $filter('date')($scope.item.expires, DATE_FORMAT);
            if (today == data) {
                return true;
            } else {
                return false;
            }
        }
    }

    $scope.isTomorrow = function () {
        $scope.item = TasksManagerDetails.getTaskSelected();
        if ($scope.item != undefined) {
            var today = $filter('date')(new Date(), DATE_FORMAT);
            var data = $filter('date')($scope.item.expires, DATE_FORMAT);
            if (today < data) {
                return true;
            } else {
                return false;
            }
        }
    }

    $scope.showLoading = function () {
        $ionicLoading.show({
            template: '<ion-spinner icon="lines"></ion-spinner>'
        });
    };

    $scope.getUserTask = function (user_id) {
        TasksManagerDetails.getUser(user_id).then(function () {
            $scope.user_task = TasksManagerDetails.user;
        })
    }

    $scope.hideLoading = function () {
        $ionicLoading.hide();
    };

    $scope.taskDetails(JSON.parse($stateParams.item));
});
