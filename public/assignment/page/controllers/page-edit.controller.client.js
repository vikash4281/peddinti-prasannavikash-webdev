(function(){
    angular
        .module("WebAppMaker")
        .controller("PageEditController", PageEditController);
    
    function PageEditController($routeParams, PageService, $location) {
        var userId = $routeParams.uid;
        var websiteId = $routeParams.wid;
        var pageId = $routeParams.pid;
        var vm = this;

        // event handlers
        vm.updatePage = updatePage;
        vm.deletePage = deletePage;

        function init() {
            vm.pageId = pageId;
            vm.websiteId = websiteId;
            vm.userId = userId;

            vm.pages = PageService.findPageByWebsiteId(websiteId);
            vm.page = PageService.findPageById(pageId);
        }
        init();

        // delete method
        function deletePage() {
            var success = PageService.deletePage(pageId);
            if (success){
                $location.url('/user/'+userId+'/website/'+websiteId+'/page');
            } else {
                vm.error = "deletion failed";
            }
        }

        // update website method
        function updatePage(page) {
            var success = PageService.updatePage(pageId, page);
            if (success){
                vm.message = "Update Successfull";
            } else{
                vm.error = "Page update failed, try again!";
            }
        }
    }
})();
