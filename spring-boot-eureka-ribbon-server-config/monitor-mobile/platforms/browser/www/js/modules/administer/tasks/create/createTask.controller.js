/* global DELETE */

'use strict';
angular.module('manage-tasks').controller('ManageCreateTasksController', function ($scope, $q, $state, $filter, CreateTaskService, $http, TasksSellerDetails, $stateParams, TasksListServiceAdm, TasksManagerDetails, $ionicLoading, PrincipalService) {

    $scope.user = {};
    $scope.task = {
        timeStatus: 'NEW'
    };

    $scope.tags = TasksListServiceAdm.getTags();

    //remove sub task in array
    $scope.removeSubTask = function (index) {
        $scope.task.subtasks.splice(index, DELETE);
    };

    $scope.loadTags = function (query) {
        var deferred = $q.defer();
        deferred.resolve($scope.tags);
        return deferred.promise;
    };

    //Redirect to the task list screen
    $scope.goTasksList = function () {
        $state.go("page.manageTasksList");
    };

    $scope.init = function (clear) {
        //init value time
        var date = new Date();
        var minute = date.getMinutes();
        var hour = date.getHours();
        //user logged
        $scope.user = PrincipalService.getUserLogged();

        //get all users to filter
        CreateTaskService.getAllUsersOfTeams($scope.user.id).then(function () {
            $scope.allUsersOfTeams = CreateTaskService.usersList;
        });

        //is edit?
        $scope.isEdit = $stateParams.edit === '' ? false : true;
        if ($scope.isEdit && !clear) {
            $scope.itemSelected = TasksManagerDetails.getTaskSelectedEdit();
            $scope.setValuesTaskToBeEdited($scope.itemSelected);
        } else {
            //reset and values default
            $scope.task.expires = date;
            $scope.task.start = new Date(0, 0, 0, hour, minute, 0, 0);
            $scope.task.stop = new Date(0, 0, 0, hour, minute + 15, 0, 0);
            $scope.task.subtasks = [{description: ''}];
            $scope.originRequest = null;
            $scope.task.description = "";
            $scope.task.userId = "all";
            $scope.task.allDay = false;
            $scope.task.tags = [];
        }
    };

    //check to all day (value default)
    $scope.allDay = function () {
        $scope.task.start = new Date(0, 0, 0, 8, 0, 0, 0);
        $scope.task.stop = new Date(0, 0, 0, 20, 0, 0, 0);
    };

    $scope.setValuesTaskToBeEdited = function (item) {

        if (item !== null) {
            $scope.task.userId = "" + item.userId;
            $scope.task.description = item.description;
            $scope.task.id = item.id;
            $scope.task.start = new Date(item.start);
            $scope.task.stop = new Date(item.stop);
            $scope.task.expires = new Date(item.expires);
            $scope.task.timeStatus = item.timeStatus;
            $scope.task.tags = item.tags;

            $scope.sub_task_edt = TasksManagerDetails.getSubTaskSelectedEdit();
            if ($scope.sub_task_edt.length >= 1) {
                $scope.task.subtasks = [];
                angular.forEach($scope.sub_task_edt, function (value, key) {
                    $scope.task.subtasks.push({description: value.description, id: value.id});
                });
            }
        }
    };

    $scope.submit = function () {
        $scope.showLoading();

        var taskValidated = $scope.task;

        if ($scope.isEdit) {
            CreateTaskService.update(taskValidated).then(function (data) {
                var taskId = CreateTaskService.task.id;
                var taskInDataBase = TasksManagerDetails.getSubTaskSelectedEdit();
                var listAdd = [];
                var listEdit = [];
                var listRemove = [];

                //verify if task is edited or removed
                angular.forEach(taskInDataBase, function (subTask, keyVerify) {
                    var itemFound = $filter('filter')($scope.task.subtasks, {id: subTask.id})[0];
                    if (itemFound !== null && subTask.id === itemFound.id) {
                        listEdit.push(subTask);
                    } else {
                        listRemove.push(subTask);
                    }
                });

                //verify if sub-task it was removed
                angular.forEach($scope.task.subtasks, function (subTask, keyVerify) {
                    var found = false;
                    angular.forEach(listRemove, function (value, key) {
                        if (value.id === subTask.id) {
                            found = true;
                        }
                    });
                    //verify if sub-task it was edited
                    angular.forEach(listEdit, function (value, key) {
                        if (value.id === subTask.id) {
                            found = true;
                        }
                    });
                    //verify if sub-task is new
                    if (!found) {
                        if (subTask.description !== "") {
                            listAdd.push(subTask);
                        }
                    }
                });

                //edit sub tasks
                angular.forEach(listEdit, function (value, key) {
                    CreateTaskService.updateSubTask(taskId, value);
                });

                //delete sub tasks
                angular.forEach(listRemove, function (value, key) {
                    CreateTaskService.deleteSubTask(value);
                });

                //add sub tasks
                angular.forEach(listAdd, function (value, key) {
                    CreateTaskService.createSubTask(taskId, value);
                });

                CreateTaskService.upadteTagsTask(taskId);

                angular.forEach($scope.task.tags, function (value, key) {
                    CreateTaskService.createTagTask(taskId, value);
                });
                $scope.hideLoading();
                $state.go("page.manageTasksList");
            }).catch(function () {
                $scope.hideLoading();
            });
        } else {
            CreateTaskService.create(taskValidated).then(function (data) {
                var taskId = CreateTaskService.task.id;

                angular.forEach($scope.task.subtasks, function (value, key) {
                    if (value.description !== '') {
                        CreateTaskService.createSubTask(taskId, value);
                    }
                });

                angular.forEach($scope.task.tags, function (value, key) {
                    CreateTaskService.createTagTask(taskId, value);
                });

                $scope.hideLoading();
                $state.go("page.manageTasksList");
            }).catch(function () {
                $scope.hideLoading();
            });
        }
    };

    $scope.addSubTask = function () {
        $scope.task.subtasks.push({description: ''});
    };

    $scope.showLoading = function () {
        $ionicLoading.show({
            template: '<ion-spinner icon="lines"></ion-spinner>'
        });
    };

    $scope.hideLoading = function () {
        $ionicLoading.hide();
    };

    $scope.init();
});
