angular
  .module('planeacion')
  .controller('LoginCtrl', LoginCtrl);
 
function LoginCtrl($scope, $meteor, $reactive, $state, toastr) {
	let rc = $reactive(this).attach($scope);
	
	var myCanvas = document.getElementById("myCanvas");

  this.credentials = {
    username: '',
    password: ''
  };

  this.login = function () {
	  	  
    $meteor.loginWithPassword(this.credentials.username, this.credentials.password).then(
	    
      
      function () {
         if(Meteor.user().roles[0] === "Administrador" && Meteor.user().profile.estatus === false ) {
          toastr.error('El administrador se encuentra desactivado', "Informacion");
          Meteor.logout();
          $state.go('anon.logout');
          return;
         }
	      toastr.info("Bienvenido al sistema");
        $state.go('root.home');        
      },
      function (error) {

	      if(error.reason == "Match failed"){
		      toastr.error("Escriba su usuario y contraseña para iniciar");
	      }else if(error.reason == "User not found"){
		      toastr.error("Usuario no encontrado");
	      }else if(error.reason == "Incorrect password"){
		      toastr.error("Contraseña incorrecta");
	      }        
      }
    )
  }
  

	
}