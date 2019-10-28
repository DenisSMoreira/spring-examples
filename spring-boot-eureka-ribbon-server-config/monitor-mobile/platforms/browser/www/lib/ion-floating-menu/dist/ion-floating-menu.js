/*!
 * Copyright 2016 PREGIOTEK
 * http://pregiotek.com/
 *
 * ion-floating-menu
 * Material UI-like Floating Action Button and Menu for Ionic applications.
 *
 * By @ennedigi
 *
 * Licensed under the MIT license. Please see LICENSE for more information.
 *
 */


angular.module('ion-floating-menu', [])
        .directive('ionFloatingButton', function () {

            return {
                restrict: 'E',
                scope: {
                    click: '&?',
                    buttonColor: '@?',
                    buttonClass: '@?',
                    icon: '@?',
                    iconOpen: '@?',
                    iconColor: '@?',
                    isDisabled: '@?',
                    isActive: '@?',
                    hasFooter: '=?'
                },
                template: '<ul id="floating-button" ng-style="{\'bottom\' : \'{{bottomValue}}\' }" ng-class="{\'active\' : isOpen}" >' +
                        '<li id="floating-li" ng-class="buttonClass" ng-style="{\'background-color\': buttonColor }">' +
                        '<a ng-click="open();click();"><i class="icon menu-icon" ng-class="icon" ng-style="{\'color\': iconColor }"></i></a>' +
                        '</li>' +
                        '</ul>',
                replace: true,
                controller: function ($scope) {
                    $scope.isDisabled = $scope.isDisabled || 'false';
                    $scope.buttonClass = $scope.buttonClass || '';
                    $scope.buttonColor = $scope.buttonColor || '#2AC9AA';

                    if ($scope.isDisabled == 'true') {
                        $scope.buttonClass = "disabled";
                    }

                    $scope.$watch('isDisabled', function () {
                        if ($scope.isDisabled == 'true') {
                            $scope.buttonClass = "disabled";
                        } else {
                            $scope.buttonClass = "";
                        }
                    }, true);


                    $scope.isOpen = true;
                    $scope.icon = $scope.icon || 'ion-plus';
                    var icon = $scope.icon;
                    var iconOpen = $scope.iconOpen || 'ion-plus';

                    $scope.$watch('isActive', function () {
                        if ($scope.isActive == 'START' || $scope.isActive == 'RESTART') {
                            $scope.icon = iconOpen || $scope.icon;

                        } else if ($scope.isActive == 'STOP') {
                            $scope.icon = icon;
                        } else {
                            $scope.icon = icon;
                        }
                    });

                    $scope.open = function () {

                        if ($scope.isActive == 'START' || $scope.isActive == 'RESTART') {
                            $scope.isOpen = $scope.isOpen;
                            if ($scope.isOpen) {
                                $scope.setOpen();
                            } else if ($scope.isActive == 'STOP') {
                                $scope.setClose();
                            } else {
                                $scope.setClose();
                            }
                        } else {
                            $scope.isOpen = !$scope.isOpen;
                            if ($scope.isOpen) {
                                $scope.setOpen();
                            } else {
                                $scope.setClose();
                            }
                        }
                    };
                    $scope.setOpen = function () {
                        $scope.icon = icon;
                    };
                    $scope.setClose = function () {
                        $scope.icon = iconOpen || $scope.icon;
                    };

                    $scope.iconColor = $scope.iconColor || '#fff';
                    $scope.hasFooter = $scope.hasFooter || false;

                    if ($scope.hasFooter) {
                        $scope.bottomValue = '60px';
                    } else {
                        $scope.bottomValue = '20px';
                    }
                }
            };
        })
        .directive('ionFloatingMenu', function () {

            return {
                restrict: 'E',
                scope: {
                    menuOpenColor: '@?',
                    menuOpenIcon: '@?',
                    menuOpenIconColor: '@?',
                    menuColor: '@?',
                    menuIcon: '@?',
                    menuIconColor: '@?',
                    hasFooter: '=?'
                },
                template: '<ul id="floating-menu"  \n\
                            ng-style="{\'bottom\' : \'{{bottomValue}}\'}" \n\
                            ng-class="{\'active\' : isOpen}" \n\
                            ng-click="open()">' +
                        '<div ng-transclude></div>' +
                        '<span><li class="menu-button icon menu-icon" ng-class="icon" ng-style="{\'background-color\' : buttonColor, \'color\': iconColor}"></li></span>' +
                        '</ul>',
                replace: true,
                transclude: true,
                link: function (scope, element, attrs, ctrl, transclude)
                {
                    element.find('div').replaceWith(transclude());
                },
                controller: function ($scope) {
                    $scope.isOpen = false;
                    $scope.open = function () {
                        $scope.isOpen = !$scope.isOpen;
                        if ($scope.isOpen) {
                            $scope.setOpen();
                        } else {
                            $scope.setClose();
                        }
                    };
                    $scope.setOpen = function () {
                        $scope.buttonColor = menuOpenColor;
                        $scope.icon = menuOpenIcon;
                        $scope.iconColor = menuOpenIconColor;
                    };
                    $scope.setClose = function () {
                        $scope.buttonColor = menuColor;
                        $scope.icon = menuIcon;
                        $scope.iconColor = menuIconColor;
                    };
                    var menuColor = $scope.menuColor || '#2AC9AA';
                    var menuIcon = $scope.menuIcon || 'ion-plus';
                    var menuIconColor = $scope.menuIconColor || '#fff';
                    var menuOpenColor = $scope.menuOpenColor || '#2AC9AA';
                    var menuOpenIcon = $scope.menuOpenIcon || 'ion-minus';
                    var menuOpenIconColor = $scope.menuOpenIconColor || '#fff';
                    $scope.setClose();
                    //Has a footer
                    $scope.hasFooter = $scope.hasFooter || false;
                    if ($scope.hasFooter) {
                        $scope.bottomValue = '60px';
                    } else {
                        $scope.bottomValue = '20px';
                    }
                }
            };
        })
        .directive('ionFloatingItem', function () {

            return {
                restrict: 'E',
                require: ['^ionFloatingMenu'],
                scope: {
                    click: '&?',
                    icon: '@',
                    buttonColor: '@?',
                    buttonClass: '@?',
                    iconColor: '@?',
                    text: '@?',
                    textClass: '@?'},
                template:
                        '<li ng-click="click()" ng-class="buttonClass" ng-style="{\'background-color\': buttonColor }">' +
                        '<span ng-if="text" class="label-container"><span class="label" ng-class="textClass" ng-bind="text"></span></span><i class="icon menu-icon" ng-class="{ \'{{icon}}\' : true}" ng-style="{\'color\': iconColor }"></i>' +
                        '</li>',
                replace: true,
                controller: function ($scope) {
                    $scope.buttonColor = $scope.buttonColor || '#2AC9AA';
                    $scope.iconColor = $scope.iconColor || '#fff';
                }
            };
        });
