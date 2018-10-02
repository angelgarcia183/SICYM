angular.module("planeacion")
.controller("ListaMaestrosCtrl", ListaMaestrosCtrl);
function ListaMaestrosCtrl($scope, $meteor, $reactive, $state, toastr) {

let rc = $reactive(this).attach($scope);

rc.buscar = {};
rc.buscar.nombre = "";


//Se comenta debido a un funcionamiento EXTREMADAMENTE RARO 
// this.subscribe('buscarUsuarios', () => {
//   return [{
//     options: { limit: 10 },
//     where: { username: this.getReactively("buscar.nombre") }
//   }]
// });


// this.helpers({
//   maestros: () => {
//     return Meteor.users.find({
//       "username": { '$regex': '.' + this.getReactively("buscar.nombre") || '' + '.', '$options': 'i' }
//     });
//   }
// });


this.subscribe('listaUsuarios', () => {
  return [];
});

this.subscribe('departamentos',()=>{
return [{
    
}]
});

this.helpers({
  maestros: () => {
    return Meteor.users.find({ "roles": "Maestro" });
  },
  
  departamentos: () => {
    return Departamentos.find().fetch();
}
});



this.obtenerNombreDepartamento = function(id)  {
nombreDepa = Departamentos.findOne({_id: id});
return nombreDepa.nombreDepartamento;
}



}