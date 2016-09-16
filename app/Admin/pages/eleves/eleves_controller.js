
angular.module('NotePairApp')
    .controller('ElevesController',['$scope','$state','$stateParams', 'alerteService', 'ElevesService','LocalElevesService', function ($scope,$state,$stateParams, alerteService, ElevesService,LocalElevesService) {
var ok=false;
    if(!localStorage.getItem('ElevesList')) {
        ElevesService.query().$promise.then(function (data) {
            localStorage.setItem('ElevesList', JSON.stringify(data));
            console.log(data);
            ok = true;
        })
    }else{(ok=true)};


   if(ok){
       $scope.ElevesList = JSON.parse(localStorage.getItem('ElevesList'));
       console.log($scope.ElevesList)
    }

        $scope.newEleve={
        'Nom':'',
        'Prenom':'',
        'email':'',
        'username':''
        };

//--- Methode add pour ajouter un Eleve à la liste ---//
        $scope.addEleve = function () {

            LocalElevesService.save($scope.newEleve,$scope.ElevesList);
            $scope.ElevesList.push($scope.newEleve);

            $state.go('admin.students')
        };




//--- Methode get pour afficher un Eleve à partir de son id ---//
    $scope.getEleve=function(){
        $scope.Eleve=ElevesService.query({id:$stateParams.id});
    };

//--- Methode delete pour supprimer un Eleve à partir de son id ---//
    $scope.deleteEleve=function() {
        $scope.Eleve = ElevesService.query({id: $stateParams.id});
        if(alerteService.showPopup('Voulez-vous vraiment supprimer cet Eleve ?')){
            Eleve.$delete();
        }
    };

 //---- Control de la page

        $scope.goToAdd=function () {
            $state.go('admin.students.add')
        }

        $scope.goToUpdate=function (id) {
            $state.go('admin.students.update',{id:id})
        };

        //----------- fonctions utiles de recherche ( démo/localstorage)


}]);