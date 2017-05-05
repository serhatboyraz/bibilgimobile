/**
 * Created by Serhat Boyraz on 5.05.2017.
 */
biBilgi.controller('SetupController', function ($scope, ApiService, $ionicNavBarDelegate, $state) {
    $ionicNavBarDelegate.showBackButton(false);
    $scope.ViewData = {
        sendfreq: 6,
        phoneNumber: ''
    };
    ApiService.Send('Device', 'getCategoryList', {
        deviceId: localStorage.getItem('deviceId')
    }, function (e) {
        if (e.RESULT) {
            $scope.categoryList = e.DATA;
        }
    });

    $scope.Save = function () {
        var categoryIds = '';
        $scope.categoryList.forEach(function (e) {
            if (e.selected) {
                categoryIds += e.id + ',';
            }
        });
        categoryIds = trim(categoryIds, ',');
        if (categoryIds.length === 0) {
            alert('en az bir kategori sec');
            return;
        }
        ApiService.Send('Device', 'edit', {
            deviceId: localStorage.getItem('deviceId'),
            sendfreq: parseInt($scope.ViewData.sendfreq) * 60,
            manufacturer: ionic.Platform.device().manufacturer,
            model: ionic.Platform.device().model,
            serial: ionic.Platform.device().serial,
            version: ionic.Platform.device().version,
            phone: $scope.ViewData.phoneNumber,
            notificationactive: 1
        }, function (e) {

        });
        ApiService.Send('Device', 'setCategories', {
            deviceId: localStorage.getItem('deviceId'),
            catids: categoryIds
        }, function (e) {
            if (e.RESULT) {
                localStorage.setItem('settings', JSON.stringify(
                    {
                        EnablePush: true,
                        PushFrequency: $socpe.ViewData.sendfreq
                    }));
                localStorage.setItem('setup', 'X');
                $state.go('tab.now');
            }
        });
    };
});