(function () {
    angular
        .module("WebAppMaker")
        .controller("WidgetListController", WidgetListController);
    
    function WidgetListController($sce, $location, $routeParams, WidgetService) {
        var vm = this;

        function init() {
            vm.doYouTrustUrl = doYouTrustUrl;
            vm.userId = $routeParams.uid;
            vm.websiteId = $routeParams.wid;
            vm.pageId = $routeParams.pid;

            vm.widgets = WidgetService.findWidgetsByPageId(vm.pageId);

        }
        init();

        // event handlers
        // vm.editWidget = editWidget;

        function doYouTrustUrl(url) {
            var baseUrl = "https://www.youtube.com/embed/";
            var urlParts = url.split('/');
            var id = urlParts[urlParts.length - 1];
            baseUrl += id;
            return $sce.trustAsResourceUrl(baseUrl);
        }

        /*function editWidget(widget) {
            // var id = WidgetService.createWidget(widgetType, vm.pageId);
            $location.url('/user/'+vm.userId+'/website/'+vm.websiteId+'/page/'+vm.pageId+'/widget/'+widget._id);
        }*/
    }
})();