(function(){
    angular
        .module("WebAppMaker")
        .controller("WebsiteListController", WebSiteListController);
    
    function WebSiteListController($routeParams, WebsiteService) {
        var vm = this;

        function init() {
            var userId = $routeParams.uid;
            var websites = WebsiteService.findWebsitesByUser(userId);
            vm.websites = websites;
            vm.userId = userId;
        }
        init();

    }
})();
