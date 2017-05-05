/**
 * Created by Serhat Boyraz on 5.05.2017.
 */

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
