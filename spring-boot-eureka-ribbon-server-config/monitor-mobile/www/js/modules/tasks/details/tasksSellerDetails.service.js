'use strict';
angular.module('tasks').factory('TasksSellerDetails',
        [
            '$http', 'Api', 'TasksListService',
            function TasksSellerDetails($http, Api, TasksListService) {

                TasksSellerDetails.findSubTasksList = function (taskId) {
                    return $http(
                            {
                                method: 'GET',
                                url: Api.url('subTasks/findAll'),
                                params: {
                                    task_id: taskId
                                },
                                contentType: 'application/json; charset=utf-8'
                            })
                            .success(function (data, status) {
                                TasksSellerDetails.subTasksList = data;
                                TasksSellerDetails.status = status;
                            })
                            .error(function (data, status) {
                                TasksSellerDetails.errors = data;
                                TasksSellerDetails.status = status;
                            });
                };

                TasksSellerDetails.changeStatusSubTask = function (subTask, change, currentTimeTask) {
                    return $http(
                            {
                                method: 'PUT',
                                url: Api.url('sub_tasks/' + subTask.id),
                                data: {
                                    sub_task_id: subTask.id,
                                    change: change,
                                    status: subTask.status,
                                    done: currentTimeTask
                                },
                                contentType: 'application/json; charset=utf-8'
                            })
                            .success(function (data, status) {
                                TasksSellerDetails.status = status;
                            })
                            .error(function (data, status) {
                                TasksSellerDetails.errors = data;
                                TasksSellerDetails.status = status;
                            });
                };

                TasksSellerDetails.changeStatusTaskPrincipal = function (id, change, status, startActive, currentTimeTask, timeStatus) {
                    return $http(
                            {
                                method: 'PUT',
                                url: Api.url('task/' + id + '/change-status'),
                                data: {
                                    change: change,
                                    status: status,
                                    active: startActive,
                                    done: currentTimeTask,
                                    timeStatus: timeStatus
                                },
                                contentType: 'application/json; charset=utf-8'
                            })
                            .success(function (data, status) {
                                TasksSellerDetails.status = status;
                            })
                            .error(function (data, status) {
                                console.log(data, status);
                                TasksSellerDetails.errors = data;
                                TasksSellerDetails.status = status;
                            });
                };

                TasksSellerDetails.changeStatusTaskPrincipalNotTime = function (id, change, status, startActive, timeStatus) {
                    return $http(
                            {
                                method: 'PUT',
                                url: Api.url('tasks/' + id),
                                data: {
                                    task_id: id,
                                    change: change,
                                    status: status,
                                    active: startActive,
                                    time_status: timeStatus
                                },
                                contentType: 'application/json; charset=utf-8'
                            })
                            .success(function (data, status) {
                                TasksSellerDetails.status = status;
                            })
                            .error(function (data, status) {
                                console.log(data, status);
                                TasksSellerDetails.errors = data;
                                TasksSellerDetails.status = status;
                            });
                };

                TasksSellerDetails.tagTasksList = function (taskId) {
                    return $http(
                            {
                                method: 'GET',
                                url: Api.url('tag/findAll'),
                                params: {
                                    task_id: taskId
                                },
                                contentType: 'application/json; charset=utf-8'
                            })
                            .success(function (data, status) {
                                TasksSellerDetails.tags = data;
                                TasksSellerDetails.status = status;
                            })
                            .error(function (data, status) {
                                TasksSellerDetails.errors = data;
                                TasksSellerDetails.status = status;
                            });
                };

                TasksSellerDetails.getTag = function (tagId) {
                    return $http(
                            {
                                method: 'GET',
                                url: Api.url('tag/findAll' ),
                                contentType: 'application/json; charset=utf-8'
                            })
                            .success(function (data, status) {
                                TasksSellerDetails.tag = data;
                                TasksSellerDetails.status = status;
                            })
                            .error(function (data, status) {
                                TasksSellerDetails.errors = data;
                                TasksSellerDetails.status = status;
                            });
                };


                TasksSellerDetails.getTaskSelected = function () {
                    return TasksListService.getTaskSelected();
                };

                return TasksSellerDetails;
            }]);
