angular.module('app').factory('Api', function () {
    return {
        url: function (path) {
            return this.base() + path;
        },
        base: function () {
            if (this.isTestMode()) {
                return "http://172.16.50.108:8080/";
            } else if (this.isLocalhost()) {
                return "http://172.16.50.108:8080/";
            } else {
                return "http://172.16.50.108:8080/";
            }
        },
        isLocalhost: function () {
            return ionic.Platform.platform() === "macintel" && !this.isHttps();
        },
        isTestMode: function () {
            return location.port && location.port === "8100";
        },
        isHttps: function () {
            return window.location.origin.split(':')[2] === "https";
        }
    };
});
