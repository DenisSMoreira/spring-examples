'use strict';
angular.module('manage-tasks').factory('TasksManagerDetails',
        [
            '$http', 'Api', 'TasksListServiceAdm',
            function TasksManagerDetails($http, Api, TasksListServiceAdm) {
                var taskEdited;
                var subTasksEdited;

                TasksManagerDetails.findSubTasksList = function (taskId) {
                    return $http(
                            {
                                method: 'GET',
                                url: Api.url('sub_tasks.json'),
                                params: {
                                    task_id: taskId
                                },
                                contentType: 'application/json; charset=utf-8'
                            })
                            .success(function (data, status) {
                                TasksManagerDetails.subTasksList = data;
                                TasksManagerDetails.status = status;
                            })
                            .error(function (data, status) {
                                TasksManagerDetails.errors = data;
                                TasksManagerDetails.status = status;
                            });
                };

                TasksManagerDetails.delete = function (team_id) {
                    return $http.delete(Api.url('teams/' + team_id))
                            .success(function (data, status, config) {
                                TeamEditService.status = status;
                            })
                            .error(function (data, status, header, config) {
                                TeamEditService.status = status;
                            });
                };

                TasksManagerDetails.deleteTask = function (taskId) {
                    return $http.delete(Api.url('tasks/' + taskId))
                            .success(function (data, status) {
                                TasksManagerDetails.task = data;
                                TasksManagerDetails.status = status;
                            })
                            .error(function (data, status) {
                                TasksManagerDetails.errors = data;
                                TasksManagerDetails.status = status;
                            });
                };

                TasksManagerDetails.deleteSubTask = function (taskId) {
                    return $http.delete(Api.url('sub_tasks/' + taskId))
                            .success(function (data, status) {
                                TasksManagerDetails.task = data;
                                TasksManagerDetails.status = status;
                            })
                            .error(function (data, status) {
                                TasksManagerDetails.errors = data;
                                TasksManagerDetails.status = status;
                            });
                };

                TasksManagerDetails.tagTasksList = function (taskId) {
                    return $http(
                            {
                                method: 'GET',
                                url: Api.url('tag_tasks'),
                                params: {
                                    task_id: taskId
                                },
                                contentType: 'application/json; charset=utf-8'
                            })
                            .success(function (data, status) {
                                TasksManagerDetails.tags = data;
                                TasksManagerDetails.status = status;
                            })
                            .error(function (data, status) {
                                TasksManagerDetails.errors = data;
                                TasksManagerDetails.status = status;
                            });
                };

                TasksManagerDetails.getTag = function (tagId) {
                    return $http(
                            {
                                method: 'GET',
                                url: Api.url('tags/' + tagId),
                                contentType: 'application/json; charset=utf-8'
                            })
                            .success(function (data, status) {
                                TasksManagerDetails.tag = data;
                                TasksManagerDetails.status = status;
                            })
                            .error(function (data, status) {
                                TasksManagerDetails.errors = data;
                                TasksManagerDetails.status = status;
                            });
                };

                TasksManagerDetails.getUser = function (userId) {
                    return $http(
                            {
                                method: 'GET',
                                url: Api.url('users/' + userId),
                                params: {
                                    user_id: userId
                                },
                                contentType: 'application/json; charset=utf-8'
                            })
                            .success(function (data, status) {
                                TasksManagerDetails.user = data;
                                TasksManagerDetails.status = status;
                            })
                            .error(function (data, status) {
                                TasksManagerDetails.errors = data;
                                TasksManagerDetails.status = status;
                            });
                };

                TasksManagerDetails.getTaskSelected = function () {
                    return TasksListServiceAdm.getTaskSelected();
                };

                TasksManagerDetails.getTaskSelectedEdit = function () {
                    return taskEdited;
                };

                TasksManagerDetails.getSubTaskSelectedEdit = function () {
                    return subTasksEdited;
                };

                TasksManagerDetails.setTaskSelectedEdit = function (taskEdit, subTasksEdit) {
                    taskEdited = taskEdit;
                    subTasksEdited = subTasksEdit;
                };

                return TasksManagerDetails;
            }]);
