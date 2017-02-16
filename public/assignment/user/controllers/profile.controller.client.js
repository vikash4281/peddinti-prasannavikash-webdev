(function () {
    angular
        .module("WebAppMaker")
        .controller("ProfileController", ProfileController);
    
    function ProfileController($routeParams, $location, UserService) {
        var vm = this;

        // event handlers
        vm.updateUser = updateUser;
        vm.deleteUser = deleteUser;

        var userId = $routeParams['uid'];

        function init() {
            var user = UserService.findUserById(userId);
            vm.user = user;
        }
        init();

        function updateUser(newUser) {
            var user = UserService.updateUser(userId, newUser);
            if(user != null) {
                vm.message = "User information updated succesfully!"
            } else {
                vm.error = "User updation failed!";
            }
        }
        
        function deleteUser() {
            var success = UserService.deleteUser(userId);
            if (success)
                $location.url("/login");
            else
                vm.error = "User deletion failed!";
        }
    }
})();