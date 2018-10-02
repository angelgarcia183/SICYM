angular.module("planeacion")
    .controller("CoordinadoresCtrl", CoordinadoresCtrl);
function CoordinadoresCtrl($scope, $meteor, $reactive, $state, toastr, $stateParams) {

    let rc = $reactive(this).attach($scope);
    let usuario = [];
    rc.accion = true;
    rc.buscar = {};
    rc.buscar.nombre = "";


    this.subscribe('buscarUsuarios', () => {
        return [{
            options: { limit: 10 },
            where: { profile: { nombreCompleto: this.getReactively("buscar.nombre") } }
        }]

    });
    
    this.subscribe('listaCoordinadores', () => {
    return [];
  });

    this.subscribe('unidades', () => {
        return [{

        }]
    });


    this.subscribe('departamentos', () => {
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


    this.guardar = (usuario, form) => {
        const existeUsarioEnUnidad = Meteor.users.find( {
                "profile.unidad" : usuario.profile.unidad,
                "profile.estatus" : true,
                "profile.departamento" : usuario.profile.departamento}).count();
       
       
        if(existeUsarioEnUnidad > 0) {
            toastr.info("Ya existe un coordinador asignado a esa unidad y ese departamento");
            return;
        }
        if (form.$invalid) {
            toastr.error("ERROR");
            return;
        }

        usuario.profile.nombreCompleto = (`${usuario.profile.nombres} ${usuario.profile.apellidoPaterno} ${usuario.profile.apellidoMaterno}`);
        usuario.profile.estatus = true;
        usuario.profile.unidad = Meteor.user().profile.unidad;

        if (usuario.password === usuario.repetirContra) {
            Meteor.call('createUsuario', usuario, 'Coordinador', function (error, result) {
                if (error) {
                    toastr.error("ERROR");
                } else {
                    toastr.success("Se guardo corretamente el usuario");
                }
            });
            $state.go("root.listacoordinadores");
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
            Meteor.call('updateUsuario', usuario, "Coordinador", function (error, result) {
                if (error) {
                    toastr.error("Error");
                } else {
                    toastr.success("Se Actualizo correctamente el usuario")
                }
                if($stateParams.pantallaAnterior != "Perfil")
                $state.go("root.listacoordinadores");
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

}