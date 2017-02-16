(function(){
    angular
        .module("WebAppMaker")
        .controller("WebsiteEditController", WebsiteEditController);
    
    function WebsiteEditController($routeParams, WebsiteService, $location) {
        var vm = this;

        function init() {
            var userId = $routeParams.uid;
            var websiteId = $routeParams.wid;
            var websites = WebsiteService.findWebsitesByUser(userId);

            vm.websites = websites;
            vm.userId = userId;
            vm.website = WebsiteService.findWebsiteById(websiteId);
        }
        init();

        // event handlers
        vm.updateWebsite = updateWebsite;
        vm.deleteWebsite = deleteWebsite;

        // delete method
        function deleteWebsite() {
            var success = WebsiteService.deleteWebsite(vm.website._id);
            if (success) {
                $location.url("/user/"+vm.userId+"/website");
            } else {
                vm.error = "Unable to delete the website";
            }
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
