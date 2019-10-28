/* global cordova, StatusBar */

var app = angular.module('app', ['ionic', 'app.routes', 'onezone-datepicker', 'login', 'tasks', 'register', 'teams', 'ng-token-auth', 'ngCordova', 'manage-tasks', 'principal'])
app.run(function ($ionicPlatform, $rootScope, $location, $state, $ionicPopup, $ionicSideMenuDelegate, $window) {

    $ionicPlatform.ready(function () {
        if (window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        }
        if (window.StatusBar) {
            StatusBar.styleDefault();
        }
    });

    var el = document.querySelector('body');
    var handleStart = function () {
        var myEl = angular.element(document.querySelector('#floating-li'));
        myEl.toggleClass('myClass');
    };
    var handleEnd = function () {
        var myEl = angular.element(document.querySelector('#floating-li'));
        myEl.removeClass('myClass');
    };
    el.addEventListener("touchstart", handleStart, false);
    el.addEventListener("touchend", handleEnd, false);

});

app.run(['$state', '$window', 'RegisterService', 'Api',
    function ($state, $window, RegisterService, Api) {
        $window.addEventListener('LaunchUrl', function (event) {
            // gets page name from url
            var page = /.*:[/]{2}([^?]*)[?]?(.*)/.exec(event.detail.url)[1];
            // redirects to page specified in url
            $state.go('password');
        });
    }
]);

function handleOpenURL(url) {
    setTimeout(function () {
        var event = new CustomEvent('LaunchUrl', {detail: {'url': url}});
        window.dispatchEvent(event);
    }, 3);
}
