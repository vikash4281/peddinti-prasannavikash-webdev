(function(){
    angular
        .module("WebAppMaker")
        .controller("PageNewController", PageNewController);
    
    function PageNewController($routeParams, PageService) {
        // console.log("New Controller");
        var userId = $routeParams.uid;
        var websiteId = $routeParams.wid;
        var vm = this;

        // event handlers
        vm.addPage = addPage;

        function init() {
            vm.websiteId = websiteId;
            vm.userId = userId;

            vm.pages = PageService.findPageByWebsiteId(websiteId);
        }
        init();

        // add method
        function addPage(page) {
            if (page == null || page.name == null){
                vm.error = "Add page name";
                return;
            }
            var success = PageService.createPage(websiteId, page);
            if (success){
                vm.message = "Adding Successfull";
                init();
            } else{
                vm.error = "Adding page failed, try again!";
            }
        }
    }
})();
