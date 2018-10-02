angular.module("planeacion").run(function ($rootScope, $state, toastr) {
  $rootScope.$on('$stateChangeError', function (event, toState, toParams, fromState, fromParams, error) {
    switch(error) {
      case "AUTH_REQUIRED":
        $state.go('anon.login');
        break;
      case "FORBIDDEN":
        //$state.go('root.home');
        break;
      case "UNAUTHORIZED":
      	toastr.error("Acceso Denegado");
				toastr.error("No tiene permiso para ver esta opción");
        break;
      default:
        $state.go('internal-client-error');
    }
  });
});

angular.module('planeacion').config(['$injector', function ($injector) {
  var $stateProvider = $injector.get('$stateProvider');
  var $urlRouterProvider = $injector.get('$urlRouterProvider');
  var $locationProvider = $injector.get('$locationProvider');

  $locationProvider.html5Mode(true);
  $urlRouterProvider.otherwise('/');

  /***************************
   * Anonymous Routes
   ***************************/
  $stateProvider
    .state('anon', {
      url: '',
      abstract: true,
      template: '<ui-view/>'
    })
    .state('anon.login', {
      url: '/login',
      templateUrl: 'client/login/login.ng.html',
      controller: 'LoginCtrl',
      controllerAs: 'lc'
    })
    .state('anon.logout', {
      url: '/logout',
      resolve: {
        'logout': ['$meteor', '$state', 'toastr', function ($meteor, $state, toastr) {
          return $meteor.logout().then(
            function () {
	            toastr.info("Sesión finalizada.");
              $state.go('anon.login');
            },
            function (error) {
              toastr.error(error.reason);
            }
          );
        }]
      }
    });

  /***************************
   * Login Users Routes
   ***************************/
  $stateProvider
    .state('root', {
      url: '',
      abstract: true,
      templateUrl: 'client/layouts/root.ng.html',
      controller: 'RootCtrl as ro',
      resolve: {
	      "currentUser": ["$meteor", function($meteor){
	        return $meteor.requireUser();
	      }]
	    }
    })
    .state('root.home', {
      url: '/',
      templateUrl: 'client/home/home.ng.html',      
      controller: 'HomeCtrl as ho',
      ncyBreadcrumb: {
		    label: "Home"
		  },
      resolve: {
	      "currentUser": ["$meteor", function($meteor){
	        return $meteor.requireUser();
	      }]
	    },
    })
    .state('root.materias', {
			url: '/materias',
			templateUrl: 'client/materias/materias.ng.html',
			controller: 'MateriasCtrl as mat',
			resolve: {
				"currentUser": ["$meteor", function($meteor){
          return $meteor.requireUser();
          }]
			}
    })
    
    .state('root.unidades', {
      url: '/unidades',
      templateUrl: 'client/unidades/unidades.ng.html',
      controller: 'UnidadesCtrl as unid',
      resolve: {
	      "currentUser": ["$meteor", function($meteor){
	        return $meteor.requireUser();
	      }]
	    }
    })
    .state('root.departamentos', {
      url: '/departamentos',
      templateUrl: 'client/departamentos/departamentos.ng.html',
      controller: 'DepartamentosCtrl as depa',
      resolve: {
	      "currentUser": ["$meteor", function($meteor){
	        return $meteor.requireUser();
	      }]
	    }
    })
    .state('root.programasEducativos', {
      url: '/programasEducativos',
      templateUrl: 'client/programasEducativos/programasEducativos.ng.html',
      controller: 'ProgramasEducativosCtrl as proe',
      resolve: {
	      "currentUser": ["$meteor", function($meteor){
	        return $meteor.requireUser();
	      }]
	    }
    })
    .state('root.planEstudio', {
      url: '/planEstudio',
      templateUrl: 'client/planEstudio/planEstudio.html',
      controller: 'PlanesdeEstudioCtrl as plae',
      resolve: {
        "currentUser": ["$meteor", function($meteor){
          return $meteor.requireUser();
          }]
      }
    })
    
    .state('root.listamaestros', {
      url: '/listamaestros',
      templateUrl: 'client/listamaestros/listamaestros.html',      
      controller: 'ListaMaestrosCtrl as lmc',
      ncyBreadcrumb: {
		    label: "Maestros"
		  },
      resolve: {
	      "currentUser": ["$meteor", function($meteor){
	        return $meteor.requireUser();
	      }]
	    },
    })
   
    .state('root.maestros', {
      url: '/maestros',
      templateUrl: 'client/maestros/maestros.html',      
      controller: 'MaestrosCtrl as mc',
      ncyBreadcrumb: {
		    label: "Maestros"
		  },
      resolve: {
	      "currentUser": ["$meteor", function($meteor){
	        return $meteor.requireUser();
	      }]
	    },
    })
    .state('root.editarMaestro', {
      url: '/editarMaestro/:id,:pantallaAnterior',
      templateUrl: 'client/maestros/maestros.html',      
      controller: 'MaestrosCtrl as mc',
      ncyBreadcrumb: {
        label: "Maestros"
      },
      resolve: {
        "currentUser": ["$meteor", function($meteor){
          return $meteor.requireUser();
        }]
      },
    })

    
    .state('root.listacoordinadores', {
      url: '/listacoordinadores',
      templateUrl: 'client/coordinadores/listacoordinadores.html',      
      controller: 'ListaCoordinadoresCtrl as lcc',
      ncyBreadcrumb: {
		    label: "Coordinadores"
		  },
      resolve: {
	      "currentUser": ["$meteor", function($meteor){
	        return $meteor.requireUser();
	      }]
	    },
    }) 
    .state('root.coordinadores', {
      url: '/coordinadores',
      templateUrl: 'client/coordinadores/coordinadores.html',      
      controller: 'CoordinadoresCtrl as cc',
      resolve: {
        "currentUser": ["$meteor", function($meteor){
          return $meteor.requireUser();
        }]
      },
    })

    .state('root.editarCoordinador', {
      url: '/coordinadores/:id,:pantallaAnterior',
      templateUrl: 'client/coordinadores/coordinadores.html',      
      controller: 'CoordinadoresCtrl as cc',
      ncyBreadcrumb: {
        label: "Coordinadores"
      },
      resolve: {
        "currentUser": ["$meteor", function($meteor){
          return $meteor.requireUser();
        }]
      },
    })

    .state('root.listaAdministradores', {
      url: '/listaAdministradores',
      templateUrl: 'client/administradores/listaAdministradores.html',      
      controller: 'ListaAdministradoresCtrl as lam',
      ncyBreadcrumb: {
		    label: "Admins"
		  },
      resolve: {
	      "currentUser": ["$meteor", function($meteor){
	        return $meteor.requireUser();
	      }]
	    },
    }) 

    .state('root.admins', {
      url: '/admins',
      templateUrl: 'client/administradores/admins.html',      
      controller: 'AdministradoresCtrl as am',
      resolve: {
        "currentUser": ["$meteor", function($meteor){
          return $meteor.requireUser();
        }]
      },
    })

    .state('root.editarAdministrador', {
      url: '/admins/:id,:pantallaAnterior',
      templateUrl: 'client/administradores/admins.html',      
      controller: 'AdministradoresCtrl as am',
      ncyBreadcrumb: {
        label: "Admins"
      },
      resolve: {
        "currentUser": ["$meteor", function($meteor){
          return $meteor.requireUser();
        }]
      },
    })
    
}])