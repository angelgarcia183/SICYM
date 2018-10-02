angular
  .module('planeacion')
  .controller('HomeCtrl', HomeCtrl);
 
function HomeCtrl($scope, $meteor, $reactive, $state, toastr, $stateParams) {
	let rc = $reactive(this).attach($scope);

  window = rc;
  
  this.subscribe('listaUsuarios', () => {
    return [];
  });

  this.subscribe('unidades',()=>{
		return [{
			
		}]
	 });

  this.helpers({
    usuario: () => {
      return Meteor.users.findOne(Meteor.user()._id);
    },
    unidad: () => {
      return Unidades.findOne(Meteor.user().profile.unidad);
    }
  
  });
   
  this.nigga = () => {
      console.log("Niggas");
  };

}

