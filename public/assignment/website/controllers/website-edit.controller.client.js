(function(){
    angular
        .module("WebAppMaker")
        .controller("WebsiteEditController", WebsiteEditController);
    
    function WebsiteEditController($routeParams, WebsiteService, $location) {
        var vm = this;

        function init() {
            var userId = $routeParams.uid;
            var websiteId = $routeParams.wid;
            WebsiteService.findWebsitesByUser(userId)
                .success(function (sites) {
                    console.log(sites);
                    vm.websites = sites;
                });

            vm.userId = userId;
            WebsiteService.findWebsiteById(websiteId)
                .success(function (site) {
                    vm.website =  site;
                })
                .error(function (error) {
                    vm.website = null;
                });
        }
        init();

        // event handlers
        vm.updateWebsite = updateWebsite;
        vm.deleteWebsite = deleteWebsite;

        // delete method
        function deleteWebsite() {
            var promise = WebsiteService.deleteWebsite(vm.website._id);
            promise
                .success(function (success) {
                    $location.url("/user/"+vm.userId+"/website");
                })
                .error(function (error) {
                    vm.error = "Unable to delete the website";
                });
        }

        // update website method
        function updateWebsite(website) {
            var success = WebsiteService.updateWebsite(vm.website._id, vm.website);
            if (success) {
                vm.message = "Update Successful"
            } else {
                vm.error = "Unable to delete the website, try again!";
            }
        }
    }
})();
