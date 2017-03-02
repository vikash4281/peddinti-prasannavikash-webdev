(function () {

    angular
        .module('directives', [])
        .directive('sortable', sortableDir);

    function sortableDir() {

        function linkFunc(scope, element) {
    
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