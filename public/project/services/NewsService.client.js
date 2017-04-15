/**
 * Created by vicky on 4/12/2017.
 */
(function () {
    angular
        .module("NewsApp")
        .factory("NewsService", NewsService);

    var init_url = "https://newsapi.org/v1/articles?source=";
    var end_url = "&apiKey=58b8583ba91b4e2a8be2ecef45fdcc3f";

    function NewsService($http) {

        var api = {
            findNewsBySource: findNewsBySource,
            findTopHeadlines:findTopHeadlines
        };

        return api;


        function findNewsBySource(source) {
            var url = init_url+source+end_url;
            return $http.get(url);
        }

        function findTopHeadlines(source) {
            var url = init_url + source +"&sortBy=top" + end_url
            return $http.get(url);
        }

    }

})();