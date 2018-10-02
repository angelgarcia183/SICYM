angular.module("planeacion")
.controller("ListaCoordinadoresCtrl", ListaCoordinadoresCtrl);
function ListaCoordinadoresCtrl($scope, $meteor, $reactive, $state, toastr) {

let rc = $reactive(this).attach($scope);

this.buscar = {};
this.buscar.nombre = "";



this.subscribe('departamentos',()=>{
    return [{
        
    }]
 });

this.subscribe('unidades', () => {
  return [{

  }]
});
  this.subscribe('listaCoordinadoresPorUnidad', () => {
    return [{"roles" : "Coordinador", "profile.unidad" : Meteor.user().profile.unidad }];
  });
  
  this.helpers({
    coordinadores: () => {
      return Meteor.users.find({ "roles": "Coordinador" });
    },
    departamentos: () => {
        return Departamentos.find().fetch();
    },
    unidades: () => {
      return Unidades.find().fetch();
    }
  });

//Se comenta debido a un funcionamiento EXTREMADAMENTE RARO 
/*
 this.subscribe('buscarUsuarios', () => {
   return [{
     options: { limit: 10 },
     where: { username: this.getReactively("buscar.nombre") }
   }]
 });


 this.helpers({
   maestros: () => {
     return Meteor.users.find({
       "username": { '$regex': '.' + this.getReactively("buscar.nombre") || '' + '.', '$options': 'i' }
     });
   }
 });
*/



this.obtenerNombreDepartamento = function(id)  {
    nombreDepa = Departamentos.findOne({_id: id});
    return nombreDepa.nombreDepartamento;
}





}