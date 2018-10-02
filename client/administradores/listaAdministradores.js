angular.module("planeacion")
.controller("ListaAdministradoresCtrl", ListaAdministradoresCtrl);
function ListaAdministradoresCtrl($scope, $meteor, $reactive, $state, toastr) {

let rc = $reactive(this).attach($scope);

this.buscar = {};
this.buscar.nombre = "";



this.subscribe('unidades', () => {
  return [{

  }]
});
  this.subscribe('listaAdministradoresPorUnidad', () => {
    return [{"roles" : "Administrador", "profile.unidad" : this.getReactively("buscar.unidad"), "profile.estatus" : this.getReactively("buscar.estatus") }];
  });
  
  this.helpers({
    administradores: () => {
      return Meteor.users.find({ "roles": "Administrador" });
    },
    departamentos: () => {
        return Departamentos.find().fetch();
    },
    unidades: () => {
      return Unidades.find().fetch();
    }
  });

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



this.obtenerNombreUnidad = function(id)  {
    nombreUnidades = Unidades.findOne({_id: id});
    return nombreUnidades.nombreUnidad;
}


this.cambiarEstatus = function(id) {
    const Usuario = Meteor.users.findOne(id); 
    console.log(Usuario);
    const existeUsuarioActivo = Meteor.users.find({
                "roles" : "Administrador",
                "profile.unidad" : Usuario.profile.unidad,
                "profile.estatus" : true }).count();

    if(existeUsuarioActivo > 0 && Usuario.profile.estatus === false ) {
        toastr.info('Ya existe un usario activo para esa unidad', 'Informacion');
        return;
    }
    if(Usuario.profile.estatus == true)
				Usuario.profile.estatus = false;
			else
				Usuario.profile.estatus = true;
	 Meteor.call('updateUsuario', Usuario, "Administrador", function (error, result) {
                if (error) {
                    toastr.error("Error");
                }
                else {
                    console.log('si se cambio esta cosa wey');
                }
        });
}



}