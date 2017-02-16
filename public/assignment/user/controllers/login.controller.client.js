(function () {
    angular
        .module("WebAppMaker")
        .controller("LoginController", loginController);
    
    function loginController($location, UserService) {
        var vm = this;

        // event handlers
        vm.login = login;

        function init() {
        }
        init();

        function login(user) {
            if(user==null) {
                vm.error = "Enter a valid Username"
                return;
            }
            if(user.password == null){
                vm.error = "Please enter a valid password"
                return;
            }
            var user = UserService
                .findUserByCredentials(user.username, user.password);
            if(user) {
                $location.url("/user/"+user._id);
            } else {
                vm.error = "User not found in our records, try again !";
            }
        }
    }
})();