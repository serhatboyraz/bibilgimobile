/**
 * Created by Serhat Boyraz on 5.05.2017.
 */

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
