(function () {
    'use strict';

    angular
        .module('app')
        .controller('DialogOpcionController', DialogOpcionController);

    DialogOpcionController.$inject = ['$mdDialog', '$mdEditDialog', 'FirebaseService'];
    function DialogOpcionController($mdDialog, $mdEditDialog, FirebaseService) {

        //CONTROLER DO DIALOGO DA TABELA DE OPCOES
        
        var vm = this;

        vm.hide = hide;
        vm.cancel = cancel;
        vm.save = save;

        var totalnegativo = 0;
        var totalpositivo = 0;

        vm.addPositiveItem = addPositiveItem;
        vm.addNegativeItem = addNegativeItem;
        vm.editComment = editComment;


        activate();

        function activate() { }


        //CONTROLADOR DO EDITAR TITULO DA OPCAO
        function editComment(event, item) {
            event.stopPropagation(); // in case autoselect is enabled

            var editDialog = {
                modelValue: item.titulo,
                placeholder: 'Adicione um titulo',
                save: function (input) {

                    item.titulo = input.$modelValue;
                },
                targetEvent: event,
                title: 'Adicione um titulo',
                validators: {
                    'md-maxlength': 40
                },
                clickOutsideToClose: true
            };

            var promise;

            promise = $mdEditDialog.small(editDialog);

            promise.then(function (ctrl) {
                var input = ctrl.getInput();

                input.$viewChangeListeners.push(function () {
                    input.$setValidity('test', input.$modelValue !== 'test');
                });
            });
        }

        //iNICIALIZA UM OBJETO OPCAO
        vm.opcao = {
            titulo: '',
            pontuacaoTotal: 5,
            negativeList: [],
            positiveList: []
        }

        //item positivo ou negativo
        vm.itemList = {
            titulo: '',
            pontuacao: 0,
            descricao: '',
            tipo: true
        };

        //SOMA A PONTUACAO DE CADA LISTA
        function somaPontuacao(opcao) {
            var somaPositive = 0;
            var somaNegative = 0;

            for (var i = 0; i < opcao.positiveList.length; i++) {
                somaPositive += opcao.positiveList[i].pontuacao;
            }
            for (var i = 0; i < opcao.negativeList.length; i++) {
                somaNegative += opcao.negativeList[i].pontuacao;
            }

            var total = somaPositive - somaNegative;

            return opcao.pontuacaoTotal = total;

        }
        function addPositiveItem() {

            var aux = {
                titulo: '',
                pontuacao: 0,
            }

            vm.opcao.itemList = {
                titulo: '',
                pontuacao: 0,
            };

            return vm.opcao.positiveList.push(aux);
        }
        function addNegativeItem() {

            var aux = {
                titulo: '',
                pontuacao: 0,
            }

            vm.opcao.itemList = {
                titulo: '',
                pontuacao: 0,
            };

            return vm.opcao.negativeList.push(aux);
        }
        function hide() {
            $mdDialog.hide();
        }
        function cancel() {
            $mdDialog.cancel();
        }
        function save(opcao) {
            somaPontuacao(opcao);
            $mdDialog.hide(opcao);
        }

    }
})();