Meteor.publish("materias",function(params){
  	return Materias.find(params);
});

Meteor.publish("listaMaterias", () => {
	return Materias.find();
});