/**
 * Created by Serhat Boyraz on 5.05.2017.
 */
biBilgi.controller('SettingsController', function ($scope, ApiService, $ionicPopup) {
    $scope.Settings = {
        EnablePush: true,
        PushFrequency: 6
    };
    $scope.AllSelect = false;

    if (localStorage.getItem('settings') !== null) {
        var settings = JSON.parse(localStorage.getItem('settings'));
        console.log(settings);
        $scope.Settings.PushFrequency = settings.PushFrequency;
        $scope.Settings.EnablePush = settings.EnablePush;
    }
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
            sendfreq: parseInt($scope.Settings.PushFrequency) * 60,
            manufacturer: ionic.Platform.device().manufacturer,
            model: ionic.Platform.device().model,
            serial: ionic.Platform.device().serial,
            version: ionic.Platform.device().version,
            phone: '',
            notificationactive: $scope.Settings.EnablePush ? 1 : 0
        }, function (e) {

        });
        ApiService.Send('Device', 'setCategories', {
            deviceId: localStorage.getItem('deviceId'),
            catids: categoryIds
        }, function (e) {
            if (e.RESULT) {
                localStorage.setItem('settings', JSON.stringify(
                    {
                        EnablePush: $scope.Settings.EnablePush,
                        PushFrequency: $scope.Settings.PushFrequency
                    }));
                $ionicPopup.alert({
                    title: 'Tamamdır',
                    template: 'İşlem tamamlandı.'
                });
            }
        });
    };

    ApiService.Send('Device', 'getCategoryList', {
        deviceId: localStorage.getItem('deviceId')
    }, function (e) {
        if (e.RESULT) {
            $scope.categoryList = e.DATA;
        }
    });
})
;