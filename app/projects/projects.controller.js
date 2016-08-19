(function() {
'use strict';

    angular
        .module('app')
        .controller('ProjectsController', ProjectsController);

    ProjectsController.$inject = [];
    function ProjectsController() {
        var vm = this;
        
        activate();

        ////////////////

        function activate() { }
    }
})();