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
    $scope.ViewData = {
        sendfreq: 60,
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
        }
        ApiService.Send('Device', 'edit', {
            deviceId: localStorage.getItem('deviceId'),
            sendfreq: $scope.ViewData.sendfreq,
            manufacturer: ionic.Platform.device().manufacturer,
            model: ionic.Platform.device().model,
            serial: ionic.Platform.device().serial,
            version: ionic.Platform.device().version,
            phone: $scope.ViewData.phoneNumber
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
biBilgi.controller('NowInfoController', function ($scope, ApiService, $state) {
    $scope.Info = {
        title: '',
        content: '',
        username: '',
        usermail: '',
        userimage: 'img/no-image.png',
        image: '',
        id: 0,
        isSetFav: false,
        categories: []
    };

    var CheckFav = function () {
        DATABASE.transaction(function (transaction) {
            transaction.executeSql('SELECT count(*) AS CheckFav FROM infos WHERE id=?', [$scope.Info.id], function (transaction, data) {
                if (data.rows !== undefined && data.rows.length > 0) {
                    if (parseInt(data.rows.item(0)['CheckFav']) > 0) {
                        $scope.Info.isSetFav = true;
                    }
                }
            });
        });
    };
    $scope.AddFav = function () {
        if (ApiService.RequestActive)
            return;
        if ($scope.Info.isSetFav) {
            ApiService.Send('Device', 'setFav', {
                deviceId: localStorage.getItem('deviceId'),
                infoid: $scope.Info.id,
                type: ''
            }, function (e) {
                $scope.Info.isSetFav = false;
                DATABASE.transaction(function (transaction) {
                    transaction.executeSql('DELETE FROM infos WHERE id=?', [$scope.Info.id]);
                });
            });

        } else {
            ApiService.Send('Device', 'setFav', {
                deviceId: localStorage.getItem('deviceId'),
                infoid: $scope.Info.id,
                type: 'X'
            }, function (e) {
                $scope.Info.isSetFav = true;
                DATABASE.transaction(function (transaction) {
                    transaction.executeSql('INSERT INTO infos (id,title,content,image,username,usermail,userimage,categories) VALUES (?,?,?,?,?,?,?,?) ',
                        [$scope.Info.id, $scope.Info.title, $scope.Info.content, $scope.Info.image,
                            $scope.Info.username, $scope.Info.usermail, $scope.Info.userimage, JSON.stringify($scope.Info.categories)]
                    );
                });
            });
        }
    };
    var setInfo = function (nowInfoData) {
        $scope.Info.title = nowInfoData.info.title;
        $scope.Info.content = nowInfoData.info.content;
        $scope.Info.id = nowInfoData.info.id;
        $scope.Info.username = nowInfoData.crusr.name;
        $scope.Info.usermail = nowInfoData.crusr.mail;
        $scope.Info.image = nowInfoData.info.image;
        if (nowInfoData.crusr.avatar !== null)
            $scope.Info.userimage = nowInfoData.crusr.avatar;

        nowInfoData.categories.forEach(function (category) {
            $scope.Info.categories.push(category);
        });

        CheckFav();
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
        } else {
            if (e.DATA === '0x0002') {
                localStorage.clear();
                $state.go('error');
            }
        }
    });
});
biBilgi.controller('FavoritesController', function ($scope, ApiService) {
    $scope.Favorites = [];
    DATABASE.transaction(function (transaction) {
        transaction.executeSql('SELECT id,title,content FROM infos ORDER BY id DESC', [], function (transaction, data) {
            if (data.rows !== undefined && data.rows.length > 0) {
                for (var i = 0; i < data.rows.length; i++) {
                    $scope.Favorites.push(data.rows.item(i));
                }
            }
        });
    });

    $scope.Remove = function (id) {

        ApiService.Send('Device', 'setFav', {
            deviceId: localStorage.getItem('deviceId'),
            infoid: id,
            type: ''
        }, function (e) {

        });

        DATABASE.transaction(function (transaction) {
            transaction.executeSql('DELETE FROM infos WHERE id=?', [id]);
        });

        for (var i = 0; i < $scope.Favorites.length; i++) {
            if ($scope.Favorites[i].id === id) {
                $scope.Favorites.splice(i, 1);
                break;
            }
        }
    };


});
biBilgi.controller('FavoritesDetailsController', function ($scope, $state, $stateParams, $ionicNavBarDelegate) {
    $ionicNavBarDelegate.showBackButton(true);
    $scope.Info = {
        title: '',
        content: '',
        username: '',
        usermail: '',
        userimage: 'img/no-image.png',
        image: '',
        id: 0,
        isSetFav: false,
        categories: []
    };

    DATABASE.transaction(function (transaction) {
        transaction.executeSql('SELECT * FROM infos WHERE id=?', [$stateParams.infoId], function (transaction, data) {
            if (data.rows !== undefined && data.rows.length > 0) {

                $scope.Info.title = data.rows.item(0)['title'];
                $scope.Info.content = data.rows.item(0)['content'];
                $scope.Info.id = data.rows.item(0)['id'];
                $scope.Info.username = data.rows.item(0)['username'];
                $scope.Info.usermail = data.rows.item(0)['usermail'];
                $scope.Info.image = data.rows.item(0)['image'];
                $scope.Info.userimage = data.rows.item(0)['userimage'];

                JSON.parse(data.rows.item(0)['categories']).forEach(function (category) {
                    $scope.Info.categories.push(category);
                });

            } else {
                $state.go('tab.favorites')
            }
        });
    });
});
biBilgi.controller('SettingsController', function ($scope) {
    $scope.Settings = {
        EnablePush: true,
        PushFrequency: 15
    }
});