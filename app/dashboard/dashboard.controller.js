(function () {
    'use strict';

    DashboardController.$inject = ['$scope', '$http', '$rootScope', '$q', '$mdDialog', '$mdEditDialog', '$timeout', 'FirebaseService'];
    app.controller('DashboardController', DashboardController);

    function DashboardController($scope, $http, $rootScope, $q, $mdDialog, $mdEditDialog, $timeout, FirebaseService) {

        var vm = this;

        vm.total = 0;                           //OBJECT: PONTUACAO TOTAL
        vm.descricao = 'Adicionar uma opção';
        vm.opcoes = [];                         //OBJECT: GUARDA AS OPCOES DE CADA CARD
        vm.dialogOpcion = dialogOpcion;         //FUNCTION: DIALOGO DA OPÇAO
        vm.state = false;                       //OBJECT:   INICIA O ESTADO DO MENU
        vm.user = "";

        activate();

        //PRIMEIRA FUNCAO DA TELA, QUE CHAMA AS OUTRAS EMCAPSULANDO
        function activate() {
            var promise = init();
            promise.then(function (response) {
                vm.user = firebase.auth().currentUser;
                if (vm.user) {
                    toastr.success(response, 'logado como:' + vm.user.email +'');
                } else {
                    // No user is signed in.
                }
                
            }, function (response) {
                toastr.error(response, 'Dashboard');
            });
        }

        //EXEMPLO DE FUNCAO QUE RETORNA A PROMESSA, E ESTA SENDO CHAMADA PELO ACTIVE
        function init() {
            var deferred = $q.defer();
            if (name !== null) {
                deferred.resolve("Dashboard Activate");
            }
            else {
                deferred.reject('Error in Dashboard');
            }
            return deferred.promise;
        }

        //DIALOG OPCION
        function dialogOpcion(ev) {
            $mdDialog.show({
                controller: 'DialogOpcionController',
                controllerAs: 'vm',
                templateUrl: 'app/dashboard/dialog_opcion.tmpl.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                locals: {
                    //personaId: vm.personaId
                }
            })
                .then(function (opcao) {

                    var aux = {
                        author: vm.user.email,
                        //uid: uid,
                        titulo: opcao.titulo,
                        descricao: opcao.descricao,
                        pontuacaoTotal: opcao.pontuacaoTotal,
                        //negativeList: opcao.negativeList,
                        //positiveList: opcao.positiveList
                    }
                    debugger;
                    //FirebaseService.addOption({ title: 'Europa', pontuacao: 5 });
                    FirebaseService.addProject(aux);
                    vm.total = aux.pontuacaoTotal;
                    vm.descricao = aux.descricao;
                    return vm.opcoes.push(aux);
                });
        }
    }

    

})();