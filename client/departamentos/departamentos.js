angular
.module("planeacion")
.controller("DepartamentosCtrl", DepartamentosCtrl);
 function DepartamentosCtrl($scope, $meteor, $reactive, $state, toastr){
 	
 	$reactive(this).attach($scope);
  this.action = true;
  this.nuevo = true;	 
  this.departamento = {}; 
  
	this.subscribe('departamentos',()=>{
		return [{}]
	 });

	 this.subscribe('unidades',()=>{
		return [{estatus: true}]
	 });
	 
	this.helpers({
		unidades: () => {
			return Unidades.find().fetch();
		},
		departamentos : () => {
			var deptos = Departamentos.find().fetch();
			
			_.each(deptos, function(departamento){
					Meteor.call('getUnidad', departamento.unidad_id, function(error, result){
				  	if (result)
				  	{
				  		departamento.unidad = result.nombreUnidad;
				  		$scope.$apply();
				  	}
			  	});
			});
			//console.log(deptos);
			
		  return deptos;
		},

});
  
  this.Nuevo = function()
  {
    this.action = true;
    this.nuevo = !this.nuevo;
    this.departamento = {};		
  };

  this.guardar = function(departamento,form)
	{
			if(form.$invalid){
		        toastr.error('Error al guardar los datos.');
		        return;
		  }
			console.log(departamento);
			departamento.estatus = true;
			departamento.usuarioInserto = Meteor.userId();
			Departamentos.insert(departamento);
			toastr.success('Guardado correctamente.');
			this.departamento = {}; 
			$('.collapse').collapse('hide');
			this.nuevo = true;
			form.$setPristine();
	    form.$setUntouched();
		
	};

	this.editar = function(id)
	{
	    this.departamento = Departamentos.findOne({_id:id});
	    this.action = false;
	    $('.collapse').collapse('show');
	    this.nuevo = false;
	};
	
	this.actualizar = function(departamento,form)
	{
			if(form.$invalid){
		        toastr.error('Error al actualizar los datos.');
		        return;
		  }
			var idTemp = departamento._id;
			delete departamento._id;		
			departamento.usuarioActualizo = Meteor.userId(); 
			Departamentos.update({_id:idTemp},{$set : departamento});
			toastr.success('Actualizado correctamente.');
			$('.collapse').collapse('hide');
			this.nuevo = true;
			form.$setPristine();
      form.$setUntouched();
	};

	this.cambiarEstatus = function(id)
	{
			var departamento = Departamentos.findOne({_id:id});
			if(departamento.estatus == true)
				departamento.estatus = false;
			else
				departamento.estatus = true;
			
			Departamentos.update({_id: id},{$set :  {estatus : departamento.estatus}});
  };	
};