angular
.module("planeacion")
.controller("UnidadesCtrl", UnidadesCtrl);
 function UnidadesCtrl($scope, $meteor, $reactive, $state, toastr){
 	
 	$reactive(this).attach($scope);
  this.action = true;
  this.nuevo = true;	 
  this.unidad = {}; 
  
	this.subscribe('unidades',()=>{
		return [{
			
		}]
	 });
	 
	this.helpers({
	  unidades : () => {
		  return Unidades.find();
	  }
  }); 
  
  this.Nuevo = function()
  {
    this.action = true;
    this.nuevo = !this.nuevo;
    this.unidad = {};		
  };

  this.guardar = function(unidad,form)
	{
			if(form.$invalid){
		        toastr.error('Error al guardar los datos.');
		        return;
		  }
			console.log(unidad);
			unidad.estatus = true;
			unidad.usuarioInserto = Meteor.userId();
			Unidades.insert(unidad);
			toastr.success('Guardado correctamente.');
			this.unidad = {}; 
			$('.collapse').collapse('hide');
			this.nuevo = true;
			form.$setPristine();
	    form.$setUntouched();
		
	};

	this.editar = function(id)
	{
	    this.unidad = Unidades.findOne({_id:id});
	    this.action = false;
	    $('.collapse').collapse('show');
	    this.nuevo = false;
	};
	
	this.actualizar = function(unidad,form)
	{
			if(form.$invalid){
		        toastr.error('Error al actualizar los datos.');
		        return;
		  }
			var idTemp = unidad._id;
			delete unidad._id;		
			unidad.usuarioActualizo = Meteor.userId(); 
			Unidades.update({_id:idTemp},{$set : unidad});
			toastr.success('Actualizado correctamente.');
			$('.collapse').collapse('hide');
			this.nuevo = true;
			form.$setPristine();
      form.$setUntouched();
	};

	this.cambiarEstatus = function(id)
	{
			var unidad = Unidades.findOne({_id:id});
			if(unidad.estatus == true)
				unidad.estatus = false;
			else
				unidad.estatus = true;
			
			Unidades.update({_id: id},{$set :  {estatus : unidad.estatus}});
  };	
};