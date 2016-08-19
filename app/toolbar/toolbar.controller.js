(function () {
    'use strict';

    angular.module('app')
        .controller('ToolbarController', ToolbarController);

    ToolbarController.$inject = ['$window','$mdDialog', '$q'];
    function ToolbarController($window, $mdDialog, $q) {

        var vm = this;
        vm.logout = logout;
        vm.openMenu = openMenu;

        var originatorEv;

        function openMenu($mdOpenMenu, ev) {
            originatorEv = ev;
            $mdOpenMenu(ev);
        }

        this.notificationsEnabled = true;
        this.toggleNotifications = function () {
            this.notificationsEnabled = !this.notificationsEnabled;
        };
        this.redial = function () {
            $mdDialog.show(
                $mdDialog.alert()
                    .targetEvent(originatorEv)
                    .clickOutsideToClose(true)
                    .parent('body')
                    .title('Suddenly, a redial')
                    .textContent('You just called a friend; who told you the most amazing story. Have a cookie!')
                    .ok('That was easy')
            );
            originatorEv = null;
        };
        this.checkVoicemail = function () {
            // This never happens.
        };

        activate();
        function activate() {
            var promise = getUser();
            promise.then(function (response) {
                vm.user = response;
                if (vm.user) {
                    toastr.success(response, 'logado como:' + vm.user.email +'');
                } else {
                    // No user is signed in.
                }
                
            }, function (response) {
                debugger;
                toastr.error(response, 'Dashboard');
            });
        }

        function getUser() {
            debugger;
            var deferred = $q.defer();
            var user = firebase.auth().currentUser;
            if (user) {
                deferred.resolve(user);
            }
            else {
                debugger;
                deferred.reject('Error in Dashboard');
            }
            return deferred.promise;
        }

        function logout() {
            firebase.auth().signOut().then(function () {
                $window.location.reload();
                toastr.success('Deslogado');
            }, function (error) {
                // An error happened.
            });
        }


    }
})();