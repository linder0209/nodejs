/**
 * 定义ajax请求 module
 */
angular.module('blogAppAjax', []).config(['$httpProvider', function ($httpProvider) {
    //
  }]).factory('blogHttpService', ['$http', '$q', function ($http, $q) {
    return {
      get: function (url, data) {
        var defer = $q.defer();
        data = data || {};
        var h = $http({
          method: 'GET',
          url: url,
          data: $.param(data),
          headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        });
        h.success(function (data) {
          defer.resolve(data);
        });
        return defer.promise;
      },
      post: function (url, data) {
        var defer = $q.defer();
        data = data || {};
        var h = $http({
          method: 'POST',
          url: url,
          data: $.param(data),
          headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        });
        h.success(function (data) {
          defer.resolve(data);
        });
        return defer.promise;
      }
    };
  }]);
