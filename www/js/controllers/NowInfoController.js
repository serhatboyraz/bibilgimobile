/**
 * Created by Serhat Boyraz on 5.05.2017.
 */
biBilgi.controller('NowInfoController', function ($scope, ApiService, $state, $ionicViewService) {
    $ionicViewService.clearHistory()
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
            $scope.Info.isSetFav = false;
            DATABASE.transaction(function (transaction) {
                transaction.executeSql('DELETE FROM infos WHERE id=?', [$scope.Info.id]);
            });

            ApiService.Send('Device', 'setFav', {
                deviceId: localStorage.getItem('deviceId'),
                infoid: $scope.Info.id,
                type: ''
            }, function (e) {

            });

        } else {
            $scope.Info.isSetFav = true;
            DATABASE.transaction(function (transaction) {
                transaction.executeSql('INSERT INTO infos (id,title,content,image,username,usermail,userimage,categories) VALUES (?,?,?,?,?,?,?,?) ',
                    [$scope.Info.id, $scope.Info.title, $scope.Info.content, $scope.Info.image,
                        $scope.Info.username, $scope.Info.usermail, $scope.Info.userimage, JSON.stringify($scope.Info.categories)]
                );
            });

            ApiService.Send('Device', 'setFav', {
                deviceId: localStorage.getItem('deviceId'),
                infoid: $scope.Info.id,
                type: 'X'
            }, function (e) {
            });
        }
    };
    var setInfo = function (nowInfoData) {
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