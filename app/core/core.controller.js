(function () {
    'use strict';

    angular
        .module('app')
        .controller('CoreController', CoreController);

    CoreController.$inject = ['$scope', '$mdSidenav'];
    function CoreController($scope, $mdSidenav) {

        var vm = this;
        // Initialize Firebase
        var config = {
            apiKey: "AIzaSyC5A5z-CX_SYDIQELW192z2ncjzRk-fUkA",
            authDomain: "decisionhelper-98fb9.firebaseapp.com",
            databaseURL: "https://decisionhelper-98fb9.firebaseio.com",
            storageBucket: "decisionhelper-98fb9.appspot.com",
        };
        firebase.initializeApp(config);
        //Variaveis de controle do login
        $scope.logado = false;
        $scope.register = 0;
        //Metodos
        $scope.login = login;                               //function: loga um usuario
        $scope.logout = logout;                             //function: desloga um usuario
        $scope.newUser = newUser;                           //function: adiciona um novo usuario
        $scope.loginFacebook = loginFacebook;               //function: loga com o facebook

        activate();

        function activate() {
            //executa as funcoes de carregamento da pagina
        }

        function newUser(user) {
            if (user.email && user.password) {
                firebase.auth().createUserWithEmailAndPassword(user.email, user.password).then(_success, _fail);

                function _success(response) {
                    login(user);
                }

                function _fail(error) {
                    // Handle Errors here.
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    toastr.error(errorMessage);
                    // ...
                }

            } else {
                toastr.error('Campos não preenchidos');
            }
        }

        function login(user) {
            if (user.email && user.password) {
                firebase.auth().signInWithEmailAndPassword(user.email, user.password).catch(function (error) {
                    // Handle Errors here.
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    toastr.error(errorMessage);
                    // ...
                });
                $scope.logado = true;
            } else {
                toastr.error('Campos não preenchidos');
            }
        }

        function loginFacebook() {

            var provider = new firebase.auth.FacebookAuthProvider();
            provider.addScope('public_profile');

            firebase.auth().signInWithPopup(provider).then(function (result) {
                // This gives you a Facebook Access Token. You can use it to access the Facebook API.
                var token = result.credential.accessToken;
                // The signed-in user info.
                var user = result.user;
                // ...

            }).catch(function (error) {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                // The email of the user's account used.
                var email = error.email;
                // The firebase.auth.AuthCredential type that was used.
                var credential = error.credential;
                // ...
            });

            firebase.auth().signInWithRedirect(provider);

            firebase.auth().getRedirectResult().then(function (result) {
                if (result.credential) {
                    // This gives you a Facebook Access Token. You can use it to access the Facebook API.
                    var token = result.credential.accessToken;
                    // ...
                    debugger;
                }
                // The signed-in user info.
                var user = result.user;
            }).catch(function (error) {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                // The email of the user's account used.
                var email = error.email;
                // The firebase.auth.AuthCredential type that was used.
                var credential = error.credential;
                // ...
            });

            $scope.logado = true;




        }

        function logout() {
            firebase.auth().signOut().then(function () {
                $scope.logado = false;
            }, function (error) {
                toastr.error(error);
            });
        }


    }
})();