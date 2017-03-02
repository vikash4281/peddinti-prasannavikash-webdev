(function () {
    angular
        .module("WebAppMaker")
        .factory("UserService", userService);

    function userService($http) {
        var api = {
            "findUserByCredentials": findUserByCredentials,
            "findUserByUsername": findUserByUsername,
            "findUserById": findUserById,
            "updateUser": updateUser,
            "createUser": createUser,
            "deleteUser": deleteUser
        };
        return api;

        function deleteUser(userId) {
         return $http.delete("/api/user/" + userId);
        }

        function findUserByUsername(username){
            return $http.get("/api/user?username=" + username);
        }

        function createUser(user) {
            return $http.post("/api/user",user);
        }
        function updateUser(userId, newUser) {
            return $http.put("/api/user/"+userId, newUser);
        }
        
        function findUserById(userId) {
            for(var u in users) {
                if( users[u]._id == userId ) {
                    return users[u];
                }
            }
            return null;
        }

        function findUserByCredentials(username, password) {
            for(var u in users) {
                if( users[u].username == username &&
                    users[u].password == password ) {
                    return users[u];
                }
            }
            return null;
        }
    }
})();