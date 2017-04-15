/**
 * Created by vicky on 4/12/2017.
 */
(function () {
    angular
        .module("NewsApp")
        .controller("HomePageController", HomePageController);
    
    function HomePageController(NewsService) {
        var vm = this;
        vm.slides= [];
        vm.latestarticles=[];



        function init() {
            NewsService.findNewsBySource("bbc-news")
                .then(
                    function (response) {
                        vm.articles = response.data.articles;
                        for(var article in vm.articles){
                            vm.slides.push(vm.articles[article].urlToImage);
                        }
                        console.log(vm.slides);
                    }
                );


        }
        init()
        NewsService.findTopHeadlines("daily-mail")
            .then(
                function (response) {
                    vm.latestarticles = response.data.articles;

                }
            )
    }
})();