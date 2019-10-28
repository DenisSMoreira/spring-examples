/* global Storage */

'use strict';
angular.module('principal').factory('PrincipalService',
        [
            '$http', '$timeout', '$q', '$rootScope',
            function PrincipalService($http, $timeout, $q, $rootScope) {
                var userSeleted = null;
                var isTaskTomorrow = null;
                var actionRd = null;
                var user = null;

                PrincipalService.setUserSelected = function (user) {
                    userSeleted = user;
                };

                PrincipalService.setAction = function (action) {
                    actionRd = action;
                };

                PrincipalService.getUserLogged = function () {
                    if (user === null) {
                        if (typeof (Storage) !== undefined) {
                            if ($rootScope.user.email !== undefined) {
                                user = $rootScope.user;
                                return user;
                            } else {
                                var data = localStorage.getItem('user');
                                user = JSON.parse(data);
                                return user;
//                                getData().then(function (data) {
//                                    user = JSON.parse(data);
//                                    return user;
//                                });
                            }
                        } else {
                            alert("Sorry! No Web Storage support..");
                        }
                    } else {
                        return user;
                    }
                };

//                function getData() {
//                    var deferred = $q.defer();
//                    setTimeout(function () {
//                        var data = localStorage.getItem('user');
//                        deferred.resolve(data);
//                    }, 10);
//                    return deferred.promise;
//                }

                PrincipalService.setUserLogged = function (userLogged) {
                    user = userLogged;
                };

                PrincipalService.getAction = function () {
                    return actionRd;
                };

                PrincipalService.setTaskTomorrow = function (isTomorrow) {
                    isTaskTomorrow = isTomorrow;
                };

                PrincipalService.isTaskTomorrow = function (isTomorrow) {
                    return isTaskTomorrow;
                };

                PrincipalService.getUserSelected = function () {
                    return userSeleted;
                };

                return PrincipalService;
            }]);
