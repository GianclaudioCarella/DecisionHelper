angular.module('app').directive('login', [function (datacontext) {
    return {
        templateUrl: '/app/common/login.html',
        //controller: 'LoginController',
    };

}]);;

angular.module('app').directive('toolbar', [function (datacontext) {
    return {
        templateUrl: '/app/toolbar/toolbar.html',
        controller: 'ToolbarController as vm',
    };

}]);;

angular.module('app').directive('dhSidebar', [function (datacontext) {
    return {
        templateUrl: '/app/sidebar/sidebar.html',
        controller: 'SidebarController',
    };

}]);;

//DIRECTIVA DO SIDEBAR
angular.module('app').directive('sidebarDirective', [function (datacontext) {
    return {
            link: function (scope, element, attr) {
                scope.$watch(attr.sidebarDirective, function (newVal) {
                    if (newVal) {
                        element.addClass('show');
                        return;
                    }
                    element.removeClass('show');
                });
            }
        };

}]);;