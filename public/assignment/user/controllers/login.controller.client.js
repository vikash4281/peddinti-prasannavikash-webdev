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
                vm.error = "Enter a valid Username";
                return;
            }
            if(user.password == null){
                vm.error = "Please enter a valid password";
                return;
            }
            var promise = UserService
                .findUserByCredentials(user.username, user.password);
            console.log(promise);
            promise.success(function (user) {
                    if(user) {
                        $location.url("/user/"+user._id);
                    } else {
                        vm.error = "check username and try again";
                }
            });
        }
    }
})();