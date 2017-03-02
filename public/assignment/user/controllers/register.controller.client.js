(function () {
    angular
        .module("WebAppMaker")
        .controller("RegisterController", RegisterController);
    
    function RegisterController($location, UserService) {
        var vm = this;

        // event handlers
        vm.register = register;

        function init() {
        }
        init();

        function register(user) {
            if(user==null) {
                vm.error = "Please enter a valid username";
                return;
            }
            if(user.password == null){
                vm.error = "Please enter a valid password";
                return;
            }
            if(user.password != user.password2){
                vm.error = "Please check the password entered";
                return;
            }

            var promise = UserService
                .findUserByUsername(user.username);
            promise
                .success(function (u) {
                    vm.error = "Username already taken";
                })
                .error(function (u) {
                    UserService
                        .createUser(user)
                        .success(function (u) {
                            if (u){
                                vm.message = "Registered Successfully";
                                $location.url("/user/"+u._id);
                            } else{
                                vm.error = "Unable to Register";
                            }
                        });
                });
        }
    }
})();