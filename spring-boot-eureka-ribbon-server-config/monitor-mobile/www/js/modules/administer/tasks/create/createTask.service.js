'use strict';
angular.module('manage-tasks').factory('CreateTaskService',
        [
            '$http', 'Api',
            function CreateTaskService($http, Api) {

                CreateTaskService.getAllUsersOfTeams = function (userId) {
                    return $http({
                        method: 'GET',
                        url: Api.url('user/findAllUsersOfTeams/' + userId),
                        contentType: 'application/json; charset=uft-8'
                    })
                            .success(function (data, status) {
                                CreateTaskService.usersList = data;
                                CreateTaskService.status = status;
                            })
                            .error(function (data, status) {
                                CreateTaskService.errors = data;
                                CreateTaskService.status = status;
                            });
                };

                /** data: {
                 description: task.description,
                 expires_at: task.expires_at,
                 time_status: task.time_status,
                 check_in: task.check_in,
                 start: task.start,
                 stop: task.stop,
                 all_day: task.all_day
                 }, **/
                CreateTaskService.create = function (task) {

                    return $http({
                        method: 'POST',
                        url: Api.url('task/create'),
                        data: task,
                        contentType: 'application/json; charset=uft-8'
                    })
                            .success(function (data, status) {
                                CreateTaskService.task = data;
                                CreateTaskService.status = status;
                            })
                            .error(function (data, status) {
                                CreateTaskService.errors = data;
                                CreateTaskService.status = status;
                            });
                };

                CreateTaskService.update = function (task) {

                    return $http({
                        method: 'PUT',
                        url: Api.url('task'),
                        data: task,
                        contentType: 'application/json; charset=uft-8'
                    })
                    .success(function (data, status) {
                        CreateTaskService.task = data;
                        CreateTaskService.status = status;
                    })
                    .error(function (data, status) {
                        CreateTaskService.errors = data;
                        CreateTaskService.status = status;
                    });
                };

                CreateTaskService.createSubTask = function (taskId, sub_task) {
                    return $http({
                        method: 'POST',
                        url: Api.url('subTasks/create'),
                        params: {
                            task_id: taskId
                        },
                        data: {
                            task_id: taskId,
                            description: sub_task.description
                        },
                        contentType: 'application/json; charset=uft-8'
                    })
                            .success(function (data, status) {
                                CreateTaskService.task = data;
                                CreateTaskService.status = status;
                            })
                            .error(function (data, status) {
                                CreateTaskService.errors = data;
                                CreateTaskService.status = status;
                            });
                };

                CreateTaskService.updateSubTask = function (taskId, sub_task) {
                    return $http({
                        method: 'PUT',
                        url: Api.url('subTasks/update'),
                        data: {
                            description: sub_task.description
                        },
                        contentType: 'application/json; charset=uft-8'
                    })
                            .success(function (data, status) {
                                CreateTaskService.task = data;
                                CreateTaskService.status = status;
                            })
                            .error(function (data, status) {
                                CreateTaskService.errors = data;
                                CreateTaskService.status = status;
                            });
                };

                CreateTaskService.deleteSubTask = function (sub_task) {
                    return $http.delete(Api.url('subTasks/delete/id=' + sub_task.id))
                            .success(function (data, status, config) {
                                CreateTaskService.status = status;
                            })
                            .error(function (data, status, header, config) {
                                CreateTaskService.status = status;
                            });
                };

                CreateTaskService.createTagTask = function (taskId, tag_task) {
                    return $http({
                        method: 'POST',
                        url: Api.url('tag/create'),
                        params: {
                            task_id: taskId
                        },
                        data: {
                            task_id: taskId,
                            tag_id: tag_task.id
                        },
                        contentType: 'application/json; charset=uft-8'
                    })
                            .success(function (data, status) {
                                CreateTaskService.task = data;
                                CreateTaskService.status = status;
                            })
                            .error(function (data, status) {
                                CreateTaskService.errors = data;
                                CreateTaskService.status = status;
                            });
                };

                CreateTaskService.upadteTagsTask = function (taskId) {
                    return $http({
                        method: 'PUT',
                        url: Api.url('tag/update'),
                        params: {
                            task_id: taskId
                        },
                        contentType: 'application/json; charset=uft-8'
                    })
                            .success(function (data, status) {
                                CreateTaskService.task = data;
                                CreateTaskService.status = status;
                            })
                            .error(function (data, status) {
                                CreateTaskService.errors = data;
                                CreateTaskService.status = status;
                            });
                };

                return CreateTaskService;
            }]);
