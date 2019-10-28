angular.module('app.routes', ['ui.router', 'ng-token-auth'])
app.config(function ($stateProvider, $urlRouterProvider, $httpProvider) {
    $stateProvider
            .state('login', {
                url: '/login',
                templateUrl: 'js/modules/authentication/login.view.html',
                controller: 'LoginController'
            })

            .state('register', {
                url: '/register',
                templateUrl: 'js/modules/register/register.view.html',
                controller: 'RegisterController'
            })

            .state('password_reset', {
                url: '/password_reset',
                templateUrl: 'js/modules/register/register.password_reset.view.html',
                controller: 'RegisterController'
            })

            .state('password', {
                url: '/password',
                templateUrl: 'js/modules/register/register.password.view.html',
                controller: 'RegisterController'
            })

            .state('page', {
                url: '/page',
                abstract: true,
                template: '<ui-view/>',
//                resolve: {
//                    auth: function ($auth) {
//                        return $auth.validateUser();
//                    }
//                }
            })

            .state('page.principal', {
                url: '/principal',
                templateUrl: 'js/modules/principal/principal.view.html',
                controller: 'PrincipalController'
            })

            .state('page.welcome', {
                url: '/welcome',
                templateUrl: 'js/modules/welcome/welcome.view.html',
                controller: 'PrincipalController'
            })


            .state('page.welcome-gerente', {
                url: '/welcome-gerente',
                templateUrl: 'js/modules/welcome/welcome-gerente.view.html',
                controller: 'PrincipalController'
            })

            .state('page.step1', {
                url: '/step1',
                templateUrl: 'js/modules/welcome/step1.view.html',
            })

            .state('page.step1-gerente', {
                url: '/step1-gerente',
                templateUrl: 'js/modules/welcome/step1-gerente.view.html',
            })

            .state('page.step2', {
                url: '/step2',
                templateUrl: 'js/modules/welcome/step2.view.html',
            })

            .state('page.step2-gerente', {
                url: '/step2-gerente',
                templateUrl: 'js/modules/welcome/step2.view.html',
            })

            .state('page.step3', {
                url: '/step3',
                templateUrl: 'js/modules/welcome/step3.view.html',
            })

            .state('page.step3-gerente', {
                url: '/step3-gerente',
                templateUrl: 'js/modules/welcome/step3.view.html',
            })

            .state('page.tasksList', {
                url: '/tasksList',
                templateUrl: 'js/modules/tasks/list/tasksList.view.html',
                controller: 'TasksListController'
            })

            .state('page.tasksSellerDetails', {
                url: '/tasksSellerDetails/:item',
                templateUrl: 'js/modules/tasks/details/tasksSellerDetails.view.html',
                controller: 'TasksSellerDetailsController'
            })

            .state('page.manageTasksList', {
                url: '/manageTasksList',
                templateUrl: 'js/modules/administer/tasks/list/tasksList.view.html',
                controller: 'ManageTasksListController'
            })

            .state('page.manageCreateTask', {
                url: '/manageCreateTask/:edit',
                templateUrl: 'js/modules/administer/tasks/create/createTask.view.html',
                controller: 'ManageCreateTasksController'
            })

            .state('page.manageTaskDetails', {
                url: '/manageTaskDetails/:item',
                templateUrl: 'js/modules/administer/tasks/details/tasksSellerDetails.view.html',
                controller: 'ManageTasksDetailsController'
            })

            .state('page.teamsList', {
                url: '/teamsList',
                templateUrl: 'js/modules/teams/list/teamsList.view.html',
                controller: 'TeamsListController'
            })

            .state('page.teamEdit', {
                url: '/teamEdit',
                templateUrl: 'js/modules/teams/edit/teamEdit.view.html',
                controller: 'TeamEditController'
            })

            .state('page.alerts', {
                url: '/alerts',
                templateUrl: 'js/modules/alerts/alerts.view.html'
            })

    $urlRouterProvider.otherwise('/login');
});
