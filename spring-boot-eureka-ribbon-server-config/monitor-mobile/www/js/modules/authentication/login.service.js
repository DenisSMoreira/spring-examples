'use strict';
angular.module('login').factory('LoginService',
        [
            '$http', 'Api',
            function LoginService($http, Api) {

                LoginService.authentication = function (data) {

                    return $http({
                        method: 'POST',
                        url: Api.url('user/authentication'),
                        data: data,
                        contentType: 'application/json; charset=uft-8'
                    })
                            .success(function (data, status) {
                                console.log(JSON.stringify(data));
                                localStorage.setItem('user', JSON.stringify(data));
                                LoginService.user = data;
                                LoginService.status = status;
                            })
                            .error(function (error, status) {
                                console.log(status);
                                LoginService.errors = error;
                                LoginService.status = status;
                            });
                };

                return LoginService;
            }]);
