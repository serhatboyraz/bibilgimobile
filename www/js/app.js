var biBilgi = angular.module('biBilgi', ['ionic']);

biBilgi.run(function ($ionicPlatform, ApiService, $rootScope) {
    $ionicPlatform.ready(function () {
        if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            cordova.plugins.Keyboard.disableScroll(true);
        }
        if (window.StatusBar) {
            StatusBar.styleDefault();
        }
        if (window.cordova) {
            var push = PushNotification.init({
                android: {
                    senderID: "449102847730"
                },
                browser: {
                    pushServiceURL: 'http://push.api.phonegap.com/v1/push'
                },
                ios: {
                    alert: "true",
                    badge: true,
                    sound: 'false'
                },
                windows: {}
            });

            PushNotification.hasPermission(function (data) {
                if (data.isEnabled) {

                }
            });

            push.on('registration', function (data) {
                if (localStorage.getItem('setup') != 'X') {
                    ApiService.Send('Device', 'save', {deviceId: data.registrationId, sendfreq: 60}, function (e) {
                        if (e.RESULT || e.DATA == "0x0004") {
                            localStorage.setItem('deviceId', data.registrationId);

                            localStorage.setItem('setup-ready', 'X');
                            $rootScope.$broadcast('deviceIdReceived');
                        }
                    });
                }
            });
            push.on('notification', function (data) {
                console.log(data);
            });
        } else {
            if (localStorage.getItem('setup') != 'X') {
                ApiService.Send('Device', 'save', {deviceId: 'WEB-WEB-WEB-WEB-WEB-WEB-WEB-WEB-WEB-WEB-WEB', sendfreq: 60}, function (e) {
                    if (e.RESULT || e.DATA == "0x0004") {
                        localStorage.setItem('deviceId', 'WEB-WEB-WEB-WEB-WEB-WEB-WEB-WEB-WEB-WEB-WEB');
                        localStorage.setItem('setup-ready', 'X');
                        $rootScope.$broadcast('deviceIdReceived');
                    }
                });
            }
        }

    });
});
biBilgi.config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('router', {
            url: '/router',
            controller: 'RouterController'
        })
        .state('setup', {
            url: '/setup',
            templateUrl: 'templates/setup.html',
            controller: 'SetupController'
        })
        .state('error', {
            url: '/error',
            templateUrl: 'templates/error.html',
            controller: function ($ionicNavBarDelegate, $scope) {
                $ionicNavBarDelegate.showBackButton(false);
                $scope.CloseApp = function () {
                    ionic.Platform.exitApp();
                    window.close();
                };
            }
        })
        .state('tab', {
            url: '/tab',
            abstract: true,
            templateUrl: 'templates/tabs.html'
        })
        .state('tab.now', {
            url: '/now',
            views: {
                'tab-now': {
                    templateUrl: 'templates/tab-now.html',
                    controller: 'NowInfoController'
                }
            }
        })
        .state('tab.favorites', {
            url: '/favorites',
            views: {
                'tab-favorites': {
                    templateUrl: 'templates/tab-favorites.html',
                    controller: 'FavoritesController'
                }
            }
        })
        .state('tab.fav-details', {
            url: '/favorites/:infoId',
            views: {
                'tab-favorites': {
                    templateUrl: 'templates/fav-detail.html',
                    controller: 'FavoritesDetailsController'
                }
            }
        })

        .state('tab.settings', {
            url: '/settings',
            views: {
                'tab-settings': {
                    templateUrl: 'templates/tab-settings.html',
                    controller: 'SettingsController'
                }
            }
        });

    $urlRouterProvider.otherwise('/router');

});
