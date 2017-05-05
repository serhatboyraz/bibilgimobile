/**
 * Created by Serhat Boyraz on 5.05.2017.
 */
biBilgi.controller('RouterController', function ($scope, $state, LoadingService, $timeout) {
    if (localStorage.getItem('setup') === 'X') {
        $state.go('tab.now');
    } else {
        var timeOutExpired = true;

        $timeout(function () {
            if (timeOutExpired) {
                LoadingService.Hide();
                $state.go('error')
            }
        }, 50000);

        LoadingService.Show();
        $scope.$on('deviceIdReceived', function () {
            if (localStorage.getItem('setup-ready') === 'X') {
                timeOutExpired = false;
                $state.go('setup');
            }
            LoadingService.Hide();
        });
    }
});