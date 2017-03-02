(function(){
    angular
        .module("WebAppMaker")
        .controller("WebsiteNewController", WebsiteNewController);
    
    function WebsiteNewController($routeParams, WebsiteService, $location) {
        var vm = this;
        var userId = $routeParams.uid;
        var websiteId = $routeParams.wid;

        function init() {
            WebsiteService.findWebsitesByUser(userId)
                .success(function (sites) {
                    vm.websites = sites;
                });


            vm.userId = userId;
        }
        init();

        // event handlers
        vm.addWebsite = addWebsite;

        // add method
        function addWebsite(website) {
            console.log(website);
            if (website == null || website.name == null){
                vm.error="Enter valid website name";
                return;
            }
            var promise = WebsiteService.createWebsite(vm.userId, website);
            promise
                .success(function (site) {
                    if (site) {
                        vm.message = "Successfully added website";
                        //init();
                        $location.url("/user/" + userId + "/website/");
                    }
                    else
                        vm.error = "adding website failed try again!";
                });
        }
    }
})();
