angular.module("planeacion")
.controller("MaestrosCtrl", MaestrosCtrl);
function MaestrosCtrl($scope, $meteor, $reactive, $state, toastr, $stateParams) {

let rc = $reactive(this).attach($scope);
let usuario = [];
rc.accion = true;
rc.buscar = {};
rc.buscar.nombre = "";
let rolesAccesibles = [];







this.subscribe('buscarMAestros', () => {
    return [{
        options: { limit: 10 },
        where: { profile: { nombreCompleto: this.getReactively("buscar.nombre") }}
    }]

});


this.subscribe('departamentos',()=>{
    return [{
        
    }]
 });

if ($stateParams.id != undefined) {
    this.subscribe('usuarios', () => {
        return [{ _id: $stateParams.id }] 
    });
    rc.accion = false;
}




this.helpers({
    usuario: () => {
        rc.objeto = Meteor.users.findOne($stateParams.id);
        if (rc.objeto != undefined)
            return rc.objeto;
    },
    departamentos: () => {
        return Departamentos.find().fetch();
    }

});

this.guardar = (usuario, form) => {
    if (form.$invalid) {
        toastr.error("ERROR");
        return;
    }
    usuario.profile.nombreCompleto = (`${usuario.profile.nombres} ${usuario.profile.apellidoPaterno} ${usuario.profile.apellidoMaterno}`);
    usuario.profile.estatus = true;
    if(usuario.password === usuario.repetirContra) {
    Meteor.call('createUsuario', usuario, "Maestro", function (error, result) {
        if (error) {
            toastr.error("ERROR");
        } else {
            toastr.success("Se guardo corretamente el usuario");
        }
    });
    $state.go("root.listamaestros");
}

};  

    this.actualizar = (usuario, form) => {
        if (form.$invalid) {
            toastr.error("Error, verificar los datos");
            return;
        }
        if(usuario.password != undefined) {
            if(usuario.password != usuario.repetirContra) {
                toastr.error("Las contraseñas no coinciden");
                return;
            }
        }
            usuario.usuarioActualizo = Meteor.userId();
            usuario.profile.nombreCompleto = (`${usuario.profile.nombres} ${usuario.profile.apellidoPaterno} ${usuario.profile.apellidoMaterno}`);
            Meteor.call('updateUsuario', usuario, "Maestro", function (error, result) {
                if (error) {
                    toastr.error("Error");
                } else {
                    toastr.success("Se Actualizo correctamente el usuario")
                }
               
                if($stateParams.pantallaAnterior != "Perfil")
                $state.go("root.listaMaestros");
                else {
                    $state.go("root.home");
                }
            });
    }

    this.obtenerNombreDepartamento = (departamentoId) => {
        return departamentos.findOne(departamentoId).nombreDepartamento;
    }

    this.VerSiEsPerfil = () => {
        if($stateParams.pantallaAnterior != "Perfil")
            return "Registrar Maestro";
        else {
            return "Actualizar Perfil";
        }
    }
}