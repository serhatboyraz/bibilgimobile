/**
 * Created by Serhat Boyraz on 5.05.2017.
 */
biBilgi.controller('SetupController', function ($scope, ApiService, $ionicNavBarDelegate, $state, $ionicPopup) {
    $ionicNavBarDelegate.showBackButton(false);
    $scope.ViewData = {
        sendfreq: 6,
        phoneNumber: ''
    };
    $scope.AllSelect = false;
    ApiService.Send('Device', 'getCategoryList', {
        deviceId: localStorage.getItem('deviceId')
    }, function (e) {
        if (e.RESULT) {
            $scope.categoryList = e.DATA;
        }
    });

    $scope.SelectAllToggle = function () {
        if ($scope.AllSelect) {
            $scope.categoryList.forEach(function (e) {
                e.selected = false;
            });
            $scope.AllSelect = false;
        } else {
            $scope.AllSelect = true;
            $scope.categoryList.forEach(function (e) {
                e.selected = true;
            });
        }

    };
    $scope.Save = function () {
        var categoryIds = '';
        $scope.categoryList.forEach(function (e) {
            if (e.selected) {
                categoryIds += e.id + ',';
            }
        });
        categoryIds = trim(categoryIds, ',');
        if (categoryIds.length === 0) {
            $ionicPopup.alert({
                title: 'Hata',
                template: 'En az bir kategori seçin.'
            });
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
                        PushFrequency: $scope.ViewData.sendfreq
                    }));
                localStorage.setItem('setup', 'X');
                $state.go('tab.now');
            }
        });
    };
});