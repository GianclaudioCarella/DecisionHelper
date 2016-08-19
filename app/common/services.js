(function () {
    'use strict';

    angular.module('app')
        .service('FirebaseService', FirebaseService);

    FirebaseService.$inject = ['$firebaseArray', '$firebaseObject'];
    function FirebaseService($firebaseArray, $firebaseObject) {

        var vm = this;

        vm.ref = new Firebase("https://decisionhelper-98fb9.firebaseio.com/");
        vm.project = new Firebase("https://decisionhelper-98fb9.firebaseio.com/Project");
        vm.option = new Firebase("https://decisionhelper-98fb9.firebaseio.com/Project/Option");
        vm.syncObject = $firebaseObject(vm.ref);

        vm.addProject = addProject;                     //function: adiciona um projeto
        vm.addOption = addOption;                       //function: adiciona uma opcao

        function addProject(project) {
            vm.project.push(project);
        }

        function addOption(option) {
            vm.option.push(option);
        }

        function writeNewPost(uid, username, title, body) {
            // A post entry.
            var postData = {
                author: username,
                uid: uid,
                body: body,
                title: title,
                starCount: 0
            };

            // Get a key for a new Post.
            var newPostKey = firebase.database().ref().child('posts').push().key;

            // Write the new post's data simultaneously in the posts list and the user's post list.
            var updates = {};
            updates['/posts/' + newPostKey] = postData;
            updates['/user-posts/' + uid + '/' + newPostKey] = postData;

            return firebase.database().ref().update(updates);
        }

    }
})();