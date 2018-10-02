Meteor.methods({
		
	getUnidad: function (id) {
	  var objeto = Unidades.findOne({_id : id});	 
		return objeto;		
	},
	

});
