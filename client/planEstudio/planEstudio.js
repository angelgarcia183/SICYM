angular
.module("planeacion")
.controller("PlanesdeEstudioCtrl", PlanesdeEstudioCtrl);
 function PlanesdeEstudioCtrl($scope, $meteor, $reactive, $state, toastr){
	 

 	$reactive(this).attach($scope);
  this.action = true;
  this.nuevo = true;	 
	this.planEstudio = {}; 
	this.materiasEnPlanesDeEstudio = {};
	this.MateriasMostrar = false;
	

	this.subscribe('planesEstudio',()=>{
		return [{	}]
	 });
	 
	 this.subscribe('materias', () => {
		 return [{}]
	 })

	this.helpers({
	  planesdeEstudio : () => {
		  return PlanesEstudio.find();
		},
		materias:() => {
			return Materias.find();
		}

});
  
  this.Nuevo = function()
  {
    this.action = true;
    this.nuevo = !this.nuevo;
    this.planEstudio = {};		
  };

  this.guardar = function(planEstudio,form)
	{
			if(form.$invalid){
		        toastr.error('Error al guardar los datos.');
		        return;
		  }
			console.log(planEstudio);
			planEstudio.estatus = true;
			planEstudio.usuarioInserto = Meteor.userId();
			PlanesEstudio.insert(planEstudio);
			toastr.success('Guardado correctamente.');
			this.planEstudio = {}; 
			$('.collapse').collapse('hide');
			this.nuevo = true;
			form.$setPristine();
	    form.$setUntouched();
		
	};

	this.editar = function(id)
	{
			this.plandeEstudio = PlanesEstudio.findOne({_id:id});
			// for(var i = 0, len = planEstudio.Materias.length; i < len; i++ ) {
			// 	var materia = Materias.findOne({_id: planEstudio.Materias[i]})	
			// 	this.Materias.push(materia)	
			// }
	    this.action = false;
	    $('.collapse').collapse('show');
	    this.nuevo = false;
	};
	

	this.ObtenerMaterias = function(materiasID) {
		if(materiasID !== undefined) {
			var materia;
			var NombreMaterias = [];
			var listaMaterias;
			for(var i = 0, len = materiasID.length; i < len; i++ ) {
				materia = Materias.findOne({_id : materiasID[i]});
				if(materia !== undefined) {
					NombreMaterias.push(materia.nombre);
				}
			}

			return NombreMaterias.join(", ");
		}
	}

	this.actualizar = function(planEstudio,form)
	{
			if(form.$invalid){
		        toastr.error('Error al actualizar los datos.');
		        return;
		  }
			var idTemp = planEstudio._id;
			delete planEstudio._id;		
			planEstudio.usuarioActualizo = Meteor.userId(); 
			PlanesEstudio.update({_id:idTemp},{$set : planEstudio});
			toastr.success('Actualizado correctamente.');
			$('.collapse').collapse('hide');
			this.nuevo = true;
			form.$setPristine();
      form.$setUntouched();
	};

	this.MostrarMaterias = function(mostrar) {
		console.log("Lol click");
		return !mostrar;
	
	}
	this.cambiarEstatus = function(id)
	{
			var planEstudio = PlanesEstudio.findOne({_id:id});
			if(planEstudio.estatus == true)
				planEstudio.estatus = false;
			else
				planEstudio.estatus = true;
			
				PlanesEstudio.update({_id: id},{$set :  {estatus : planEstudio.estatus}});
  };	
};