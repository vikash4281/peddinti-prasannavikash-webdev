(function () {
    angular
        .module("WebAppMaker")
        .controller("WidgetEditController", WidgetEditController);
    
    function WidgetEditController($sce, $routeParams, WidgetService, $location) {
        var vm = this;

        vm.doYouTrustUrl = doYouTrustUrl;
        vm.userId = $routeParams.uid;
        vm.websiteId = $routeParams.wid;
        vm.pageId = $routeParams.pid;
        vm.wgId = $routeParams.wgid;

        function init() {
            vm.widgets = WidgetService.findWidgetsByPageId(vm.pageId);

            vm.widget = WidgetService.findWidgetById(vm.wgId);
        }
        init();

        //event handlers
        vm.deleteWidget = deleteWidget;
        vm.updateWidget = updateWidget;

        function doYouTrustUrl(url) {
            var baseUrl = "https://www.youtube.com/embed/";
            var urlParts = url.split('/');
            var id = urlParts[urlParts.length - 1];
            baseUrl += id;
            return $sce.trustAsResourceUrl(baseUrl);
        }

        function deleteWidget() {
            var success = WidgetService.deleteWidget(vm.wgId);
            if(success){
                $location.url('/user/'+vm.userId+'/website/'+vm.websiteId+'/page/'+vm.pageId+'/widget');
            } else{
                vm.error = "Unable to delete widget";
            }
        }

        function updateWidget(){
            var success = WidgetService.updateWidget(vm.wgId, vm.widget);
            if (success){
                vm.message = "Updated Successfully";
            } else{
                vm.error = "Unable to update the widget";
            }
        }
    }
})();