biBilgi.service('ApiService', function ($http) {
    var apiService = {};
    apiService.RequestActive = false;

    apiService.Send = function (controller, action, data, successCB) {

        var sendUrl = API_URL + '/' + controller + '/' + action;
        $http
        ({
            method: 'POST',
            url: sendUrl,
            data: data,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            transformRequest: function (obj) {
                var str = [];
                for (var p in obj)
                    str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                return str.join("&");
            }
        }).then(function successCallback(response) {
            apiService.RequestActive = false;
            successCB(response.data);
        }, function errorCallback(response) {
            apiService.RequestActive = false;
            successCB(response);
        });
    };

    return apiService;
});
biBilgi.service('LoadingService', function ($ionicLoading) {
    var loadingService = {};
    loadingService.isShow = false;

    loadingService.Show = function () {
        if (!loadingService.isShow) {
            loadingService.isShow = true;
            $ionicLoading.show({
                template: 'Yükleniyor...'
            }).then(function () {
                loadingService.isShow = false;
            });
        }
    };
    loadingService.Hide = function () {
        $ionicLoading.hide().then(function () {

        });


    };

    return loadingService;
});
