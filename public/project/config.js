/**
 * Created by vicky on 4/12/2017.
 */
(function(){
    angular
        .module("NewsApp")
        .config(configuration);

    function configuration($routeProvider) {
        $routeProvider
            .when("/home", {
                templateUrl: "home/views/home.page.view.client.html",
                controller: "HomePageController",
                controllerAs: "model"
            })

    }
})();