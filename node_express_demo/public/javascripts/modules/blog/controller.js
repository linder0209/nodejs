(function () {
  angular.module('blogApp').factory('blogService', ['blogHttpService', function (blogHttpService) {
    return {
      getBlogList: function (data, success) {
        var url = '/blog/list';
        blogHttpService.get(url, data).then(success);
      },
      save: function (data, success) {
        var url = '/blog/save';
        blogHttpService.post(url, data).then(success);
      }
    };
  }]);

  angular.module('blogApp').controller('BlogCtrl', ['$scope', 'blogService', function ($scope, blogService) {

    $scope.blogCategory = [
      {id: 1, name: '博客'},
      {id: 2, name: '微博'}
    ];

    $scope.blog = {
      id: undefined,
      title: '',
      category: 0,
      author: '',
      body: ''
    };

    // original blog model
    $scope.originaBlog = angular.copy($scope.blog);

    blogService.getBlogList(null, function (data) {
      $scope.blogList = data.addresses || [];
    });

    $scope.saveBlog = function () {
      blogService.save($scope.blog, function (data) {
        if (data.status == 'success') {
          $scope.blog = $scope.originaBlog;
        } else {

        }
      });
    }

  }]);
})();

