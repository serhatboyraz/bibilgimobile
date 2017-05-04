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
        }, 5000);

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
biBilgi.controller('SetupController', function ($scope, ApiService, $ionicNavBarDelegate, $state) {
    $ionicNavBarDelegate.showBackButton(false);
    $scope.sendfreq = 60;
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
        }
        ApiService.Send('Device', 'edit', {
            deviceId: localStorage.getItem('deviceId'),
            sendfreq: $scope.sendfreq
        }, function (e) {

        });
        ApiService.Send('Device', 'setCategories', {
            deviceId: localStorage.getItem('deviceId'),
            catids: categoryIds
        }, function (e) {
            if (e.RESULT) {
                localStorage.setItem('setup', 'X');
                $state.go('tab.now');
            }
        });
    };
});
biBilgi.controller('NowInfoController', function ($scope, ApiService) {
    $scope.Info = {
        title: '',
        content: '',
        username: '',
        usermail: '',
        userimage: 'img/no-image.png',
        id: 0
    };
    var setInfo = function (nowInfoData) {
        console.log(nowInfoData);
        $scope.Info.title = nowInfoData.info.title;
        $scope.Info.content = nowInfoData.info.content;
        $scope.Info.id = nowInfoData.info.id;
        $scope.Info.username = nowInfoData.crusr.name;
        $scope.Info.usermail= nowInfoData.crusr.mail;
        if (nowInfoData.crusr.avatar !== null)
            $scope.Info.userimage = nowInfoData.crusr.avatar;
    };
    if (localStorage.getItem('nowInfoSet') === 'X') {
        setInfo(JSON.parse(localStorage.getItem('nowInfo')));
    }

    ApiService.Send('Device', 'getLastInfo', {deviceId: localStorage.getItem('deviceId')}, function (e) {
        if (e.RESULT) {
            if (localStorage.getItem('nowInfoId') === e.DATA.info.id) {
            } else {

                localStorage.setItem('nowInfoId', e.DATA.info.id);
                localStorage.setItem('nowInfo', JSON.stringify(e.DATA));
                localStorage.setItem('nowInfoSet', 'X');
                setInfo(e.DATA);
            }
        }
    });


});
biBilgi.controller('FavoritesController', function ($scope) {
    $scope.Favorites = [{title: 'test', content: 'icerik', id: 1}]
});
biBilgi.controller('FavoritesDetailsController', function ($scope) {
    $scope.Favorite = {title: 'test', content: 'icerik', id: 1}
});
biBilgi.controller('SettingsController', function ($scope) {
    $scope.Settings = {
        EnablePush: true,
        PushFrequency: 15
    }
});