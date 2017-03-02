(function () {
    console.log("sortable loaded");
    angular
        .module('directives', [])
        .directive('sortable', sortableDir);

    function sortableDir() {
        console.log("in sortable");
        function linkFunc(scope, element) {
            console.log("Sortable Dir");
            element
                .sortable({
                    axis: 'y',
                    handle: ".glyphicon-align-justify"
                })
                .disableSelection();
        }
        return {
            link: linkFunc
        };
    }
})();