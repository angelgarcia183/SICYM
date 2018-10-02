angular.module("planeacion")
    .controller("AdministradoresCtrl", AdministradoresCtrl);
function AdministradoresCtrl($scope, $meteor, $reactive, $state, toastr, $stateParams) {

    let rc = $reactive(this).attach($scope);
    let usuario = [];
    rc.accion = true;
    rc.buscar = {};
    rc.buscar.nombre = "";


//#Region Main Suubscripciones
    this.subscribe('buscarUsuarios', () => {
        return [{
            options: { limit: 10 },
            where: { profile: { nombreCompleto: this.getReactively("buscar.nombre") } }
        }]

    });

    this.subscribe('unidades', () => {
        return [{

        }]
    });

    this.subscribe('listaAdministradores', () => {
        return [{}]
    })


    if ($stateParams.id != undefined) {
        this.subscribe('usuarios', () => {
            return [{ _id: $stateParams.id }]
        });
        rc.accion = false;
    }

    

//#endregion

//#Region Helpers
    this.helpers({
        usuario: () => {
            rc.objeto = Meteor.users.findOne($stateParams.id);
            if (rc.objeto != undefined)
                return rc.objeto;
        },
        administradores: () => {
            return Meteor.users.find({ "roles": "Administrador" });
        },
        unidades: () => {
            return Unidades.find().fetch();
        }
    });

//#endregion

//#Region Metodos
    this.guardar = (usuario, form) => {
        const existeUsarioEnUnidad = Meteor.users.find( {
                "roles" : "Administrador",
                "profile.unidad" : usuario.profile.unidad,
                "profile.estatus" : true }).count();
       
       
        if(existeUsarioEnUnidad > 0) {
            toastr.info("Ya existe un Administrador Activo asignado a esa unidad");
            return;
        }
        if (form.$invalid) {
            toastr.error("ERROR");
            return;
        }

        usuario.profile.nombreCompleto = (`${usuario.profile.nombres} ${usuario.profile.apellidoPaterno} ${usuario.profile.apellidoMaterno}`);
        usuario.profile.estatus = true;

        if (usuario.password === usuario.repetirContra) {
            Meteor.call('createUsuario', usuario, 'Administrador', function (error, result) {
                if (error) {
                    toastr.error("ERROR");
                } else {
                    toastr.success("Se guardo corretamente el usuario");
                }
            });
            $state.go("root.listaAdministradores");
        }
        else {
            toastr.error("Las contraseñas no coinciden");
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
            Meteor.call('updateUsuario', usuario, "Administrador", function (error, result) {
                if (error) {
                    toastr.error("Error");
                } else {
                    toastr.success("Se Actualizo correctamente el usuario")
                }

                if($stateParams.pantallaAnterior != "Perfil")
                $state.go("root.listaAdministradores");
                else {
                    $state.go("root.home");
                }
            });
        

    }

    this.VerSiEsPerfil = () => {
        if($stateParams.pantallaAnterior != "Perfil")
            return "Registrar Administrador";
        else {
            return "Actualizar Perfil";
        }
    }
//#endregion

}