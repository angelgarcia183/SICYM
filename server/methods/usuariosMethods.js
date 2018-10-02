Meteor.methods({
  createUsuario: function (usuario, rol) {
	 			var usuario_id = Accounts.createUser({
					username: usuario.username,
					password: usuario.password,			
					profile: usuario.profile
		});
		
		Roles.addUsersToRoles(usuario_id, rol);
		return usuario_id;
	},
	userIsInRole: function(usuario, rol, grupo, vista){
		if (!Roles.userIsInRole(usuario, rol, grupo)) {
	    throw new Meteor.Error(403, "Usted no tiene permiso para entrar a " + vista);
	  }
	},
	updateUsuario: function (usuario, rol) {
	  var user = Meteor.users.findOne({"username" : usuario.username});
	  Meteor.users.update({_id: user._id}, {$set:{
			username: usuario.username,
			roles: [rol],
			profile: usuario.profile
		}});
		if(usuario.password != undefined) {
		Accounts.setPassword(user._id, usuario.password, {logout: false});
		}
	},
		
  
});