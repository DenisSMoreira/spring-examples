'use strict';
angular.module('register').factory('RegisterService',
        [
            '$http', '$auth', 'Api',
            function RegisterService($http, $auth, Api) {

                var urlChangePass;

                RegisterService.register = function (data) {

                    return $http({
                        method: 'POST',
                        url: Api.url('user/create'),
                        data: data,
                        contentType: 'application/json; charset=uft-8'
                    })
                    .success(function (data, status) {
                        console.log(JSON.stringify(data));
                        RegisterService.status = status;
                    })
                    .error(function (error, status) {
                        RegisterService.errors = error.cause;
                        RegisterService.status = status;
                    });
                };

                RegisterService.update = function (dados) {
                    var config = {headers: $auth.retrieveData('auth_headers')};
                    $http.post(Api.url('users'), dados, config);
                };

                RegisterService.password_reset = function (data) {
                    return $auth.requestPasswordReset(data)
                            .then(function (resp) {
                                RegisterService.data = resp;
                                console.log(resp);
                            })
                            .catch(function (resp) {
                                RegisterService.data = resp;
                                console.log(resp);
                            });
                };

                RegisterService.updatePassword = function (data) {
                    var data = {
                        password: data.password,
                        password_confirmation: data.password_confirmation
                    };
                    return $auth.updatePassword(data)
                            .then(function (resp) {
                                RegisterService.data = resp;
                                console.log(resp);
                            })
                            .catch(function (resp) {
                                RegisterService.data = resp;
                                console.log(resp);
                            });
                };

                RegisterService.setUrlChangePass = function (value) {
                    urlChangePass = value;
                };

                RegisterService.getUrlChangePass = function () {
                    return urlChangePass;
                };

                return RegisterService;
            }]);
