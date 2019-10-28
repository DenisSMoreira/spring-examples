'use strict';
angular.module('teams').factory('TeamEditService',
        [
            '$http', '$auth', 'Api',
            function TeamEditService($http, $auth, Api) {

                var teamSelected;
                var action;
                var users;
                var usersTeam;

                TeamEditService.create = function (user_id, team) {
                    return $http.post(Api.url('team/create?userId=' + user_id), team)
                            .success(function (data, status, config) {
                                TeamEditService.status = status;
                            })
                            .error(function (data, status, header, config) {
                                TeamEditService.status = status;
                            });
                };

                TeamEditService.edit = function (team) {
                    return $http.put(Api.url('team/update?id=' + team.id), team)
                            .success(function (data, status, config) {
                                TeamEditService.status = status;
                            })
                            .error(function (data, status, header, config) {
                                TeamEditService.status = status;
                            });
                };

                TeamEditService.delete = function (team_id) {
                    return $http.delete(Api.url('team/delete?id=' + team_id))
                            .success(function (data, status, config) {
                                TeamEditService.status = status;
                            })
                            .error(function (data, status, header, config) {
                                TeamEditService.status = status;
                            });
                };

                TeamEditService.findUsers = function () {
                    return $http.get(Api.url('user/findAll?allUsers=true'))
                            .success(function (data, status, config) {
                                TeamEditService.setUsers(data);
                            })
                            .error(function (data, status, header, config) {
                                TeamEditService.status = status;
                            });
                };

                TeamEditService.findUsersTeam = function () {
                    return $http.get(Api.url('team/find?id=' + teamSelected.id))
                            .success(function (data, status, config) {
                                TeamEditService.setUsersTeam(data);
                            })
                            .error(function (data, status, header, config) {
                                TeamEditService.status = status;
                            });
                };

                TeamEditService.team_user_delete = function (team_id, user_id) {
                    return $http.delete(Api.url('team/deleteUserOfTeam?teamId=' + team_id + '&userId=' + user_id))
                            .success(function (data, status, config) {
                                TeamEditService.status = status;
                            })
                            .error(function (data, status, header, config) {
                                TeamEditService.status = status;
                            });
                };

                TeamEditService.setAction = function (value) {
                    action = value;
                };

                TeamEditService.getAction = function () {
                    return action;
                };

                TeamEditService.setTeamSelected = function (team) {
                    teamSelected = team;
                };

                TeamEditService.getTeamSelected = function () {
                    return teamSelected;
                };

                TeamEditService.setUsers = function (value) {
                    users = value;
                };

                TeamEditService.getUsers = function () {
                    var listUsers = new Array();
                    angular.copy(users, listUsers);
                    angular.forEach(listUsers, function (value, key) {
                        value.name = listUsers[key].name + " " + listUsers[key].lastname;
                    });

                    return listUsers;
                };

                TeamEditService.setUsersTeam = function (value) {
                    usersTeam = value;
                };

                TeamEditService.getUsersTeam = function () {
                    return usersTeam;
                };

                return TeamEditService;
            }]);
