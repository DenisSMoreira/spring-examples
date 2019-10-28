'use strict';
angular.module('teams').factory('TeamsListService',
        [
            '$http', '$auth', 'Api',
            function TeamsListService($http, $auth, Api) {

                TeamsListService.list = function (user_id) {
                    return $http({
                        method: 'GET',
                        url: Api.url('team/findAllTeamOfUser?userId=' + user_id),
                        contentType: 'application/json; charset=utf-8'
                    })
                            .success(function (data, status) {
                                TeamsListService.teamsList = data;
                                TeamsListService.status = status;
                            })
                            .error(function (data, status) {
                                TeamsListService.status = status;
                            });
                };

                TeamsListService.listGerenteVendedor = function (user_id) {
                    return $http({
                        method: 'GET',
                        url: Api.url('team/findAllTeamOfUser?userId=' + user_id + '&gerenteVendedor=true'),
                        contentType: 'application/json; charset=utf-8'
                    })
                            .success(function (data, status) {
                                TeamsListService.teamsList = data;
                                TeamsListService.status = status;
                            })
                            .error(function (data, status) {
                                TeamsListService.status = status;
                            });
                };

                TeamsListService.team_users = function (user_id) {
                    return $http({
                        method: 'GET',
                        url: Api.url('team/findAllTeamOfUser?userId=' + user_id),
                        contentType: 'application/json; charset=utf-8'
                    })
                            .success(function (data, status) {
                                TeamsListService.list_team = data;
                                TeamsListService.status = status;
                            })
                            .error(function (data, status) {
                                TeamsListService.status = status;
                            });
                };

                TeamsListService.update_team_users = function (team_id) {
                    return $http({
                        method: 'put',
                        url: Api.url('team/vizualized?teamId=' + team_id),
                        contentType: 'application/json; charset=utf-8'
                    })
                            .success(function (data, status) {
                                TeamsListService.status = status;
                            })
                            .error(function (data, status) {
                                TeamsListService.status = status;
                            });
                };


                TeamsListService.delete = function (team_id) {

                    return $http.delete(Api.url('team/delete?id=' + team_id))
                            .success(function (data, status) {
                                TeamsListService.status = status;
                            })
                            .error(function (data, status) {
                                TeamsListService.status = status;
                            });
                };

                return TeamsListService;
            }]);
