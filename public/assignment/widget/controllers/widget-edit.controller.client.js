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
            WidgetService.findWidgetsByPageId(vm.pageId)
                .success(function (widgets) {
                    vm.widgets = widgets;
                });
            WidgetService.findWidgetById(vm.wgId)
                .success(function (widget) {
                    vm.widget = widget;
                    if (vm.widget.width) {
                        vm.widget.width = parseInt(vm.widget.width.substring(-1));
                    }
                })
                .error(function (error) {
                    vm.widget = null;
                });
        }

        init();

        //event handlers
        vm.deleteWidget = deleteWidget;
        vm.updateWidget = updateWidget;
        vm.backButtonHandler = backButtonHandler;

        function doYouTrustUrl(url) {
            var baseUrl = "https://www.youtube.com/embed/";
            var urlParts = url.split('/');
            var id = urlParts[urlParts.length - 1];
            baseUrl += id;
            return $sce.trustAsResourceUrl(baseUrl);
        }

        function deleteWidget() {
            var promise = WidgetService.deleteWidget(vm.wgId);
            promise
                .success(function (success) {
                    $location.url('/user/' + vm.userId + '/website/' + vm.websiteId + '/page/' + vm.pageId + '/widget');
                })
                .error(function (error) {
                    vm.error = "Unable to delete widget";
                });
        }

        function updateWidget() {
            if (vm.widget.type == 'HEADING' && (!vm.widget.text || !vm.widget.size)) {
                vm.error = "Text or Size cannot be empty";
                return;
            } else if ((vm.widget.type == 'IMAGE' || vm.widget.widgetType == 'YOUTUBE')) {
                if (!vm.widget.url) {
                    vm.error = "URL cannot be empty";
                    return;
                }
                else if (!vm.widget.width)
                    vm.widget.width = 100;
            } else if(vm.widget.type == 'TEXT' && !vm.widget.rows) {
                vm.error = "Rows can not be empty";
                return;
            } else if (vm.widget.type == 'HTML' && vm.widget.text.trim() == "") {
                vm.error = "Field can not be empty";
                return;
            }
            vm.widget.deletable = false;
            var promise = WidgetService.updateWidget(vm.wgId, vm.widget);
            promise
                .success(function (success) {
                    vm.error = null;
                    vm.message = "Updated Successfully";
                })
                .error(function (error) {
                    vm.error = "Unable to update the widget";
                });
        }
        function backButtonHandler() {
            if(vm.widget.deletable){
                deleteWidget();
            } else {
                $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page/"+vm.pageId+"/widget");
            }
        }
    }
})();