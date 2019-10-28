'use strict';
angular.module('manage-tasks').factory('TasksListServiceAdm',
        [
            '$http', 'Api', '$auth',
            function TasksListServiceAdm($http, Api, $auth) {

                var taskSelected;
                var users;
                var tags;

                TasksListServiceAdm.findTasks = function (userId) {
                    return $http(
                            {
                                method: 'GET',
                                url: Api.url('task/filter'),
                                params: {
                                    userId: userId
                                },
                                contentType: 'application/json; charset=uft-8'
                            })
                            .success(function (data, status) {
                                TasksListServiceAdm.tasksList = data;
                                TasksListServiceAdm.status = status;
                            })
                            .error(function (data, status) {
                                TasksListServiceAdm.errors = data;
                                TasksListServiceAdm.status = status;
                            });
                };
                TasksListServiceAdm.getAllUsersOfTeams = function (userId) {
                    return $http({
                        method: 'GET',
                        url: Api.url('user/findAllUsersOfTeams/' + userId),
                        contentType: 'application/json; charset=uft-8'
                    })
                            .success(function (data, status) {
                                TasksListServiceAdm.usersList = data;
                                TasksListServiceAdm.status = status;
                            })
                            .error(function (data, status) {
                                TasksListServiceAdm.errors = data;
                                TasksListServiceAdm.status = status;
                            });
                };

                TasksListServiceAdm.findUsers = function () {
                    return $http(
                            {
                                method: 'GET',
                                url: Api.url('user/findAll'),
                                contentType: 'application/json; charset=utf-8'
                            })
                            .success(function (data, status) {
                                TasksListServiceAdm.users = data;
                                TasksListServiceAdm.status = status;
                            })
                            .error(function (data, status) {
                                TasksListServiceAdm.errors = data;
                                TasksListServiceAdm.status = status;
                            });
                };

                TasksListServiceAdm.findTags = function () {
                    return $http(
                            {
                                method: 'GET',
                                url: Api.url('tag/findAll'),
                                contentType: 'application/json; charset=utf-8'
                            })
                            .success(function (data, status) {
                                tags = data;
                                TasksListServiceAdm.status = status;
                            })
                            .error(function (data, status) {
                                TasksListServiceAdm.errors = data;
                                TasksListServiceAdm.status = status;
                            });
                };

                TasksListServiceAdm.setUsers = function (value) {
                    users = value;
                };

                TasksListServiceAdm.getUsers = function () {
                    return users;
                };

                TasksListServiceAdm.setTaskSelected = function (task) {
                    taskSelected = task;
                };

                TasksListServiceAdm.getTaskSelected = function () {
                    return taskSelected;
                };

                TasksListServiceAdm.setTags = function (value) {
                    tags = value;
                };

                TasksListServiceAdm.getTags = function () {
                    return tags;
                };

                return TasksListServiceAdm;
            }]);
