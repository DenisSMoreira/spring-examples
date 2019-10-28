'use strict';
angular.module('tasks').factory('TasksListService',
        [
            '$http', 'Api',
            function TasksListService($http, Api) {

                var taskSelected;

                TasksListService.findTasks = function (userId) {
                    return $http(
                            {
                                method: 'GET',
                                url: Api.url('task/filter'),
                                params: {
                                    userId: userId
                                },
                                contentType: 'application/json; charset=utf-8'
                            })
                            .success(function (data, status) {
                                TasksListService.tasksList = data;
                                TasksListService.status = status;
                            })
                            .error(function (data, status) {
                                TasksListService.tasksList = {};
                                TasksListService.errors = data;
                                TasksListService.status = status;
                            });
                };

                TasksListService.setTaskSelected = function (task) {
                    taskSelected = task;
                };

                TasksListService.getTaskSelected = function () {
                    return taskSelected;
                };

                return TasksListService;
            }]);
